from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google_drive_api import get_drive_service, upload_file_to_drive, list_files_from_drive, rename_file_in_drive, delete_file_from_drive
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Initialize Google Drive service
drive_service = get_drive_service()

# Ensure the 'uploads' folder exists (though we might not use it long-term)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'error': 'No files part'}), 400

    files = request.files.getlist('files')
    uploaded_file_ids = []

    for file in files:
        if file.filename == '':
            return jsonify({'error': 'One or more files have no filename'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)  # Temporarily save locally

            mime_type = file.content_type
            drive_file_id = upload_file_to_drive(drive_service, file_path, filename, mime_type)
            uploaded_file_ids.append({'filename': filename, 'id': drive_file_id})

            os.remove(file_path)  # Remove local temporary file

    return jsonify({'message': 'Files uploaded to Google Drive successfully', 'files': uploaded_file_ids}), 200

@app.route('/api/files', methods=['GET'])
def list_files():
    drive_files = list_files_from_drive(drive_service)
    files_data = [{'file_name': f['name'], 'id': f['id'], 'mimeType': f['mimeType'], 'date_modified': f.get('modifiedTime')} for f in drive_files]
    return jsonify(files_data)

@app.route('/api/files/<file_id>', methods=['PUT'])
def rename_file(file_id):
    new_name = request.json.get('new_name')
    if not new_name:
        return jsonify({'error': 'New name is required'}), 400
    try:
        renamed_file = rename_file_in_drive(drive_service, file_id, new_name)
        return jsonify({'message': f'File renamed to {renamed_file.get("name")}', 'id': file_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/files/<file_id>', methods=['DELETE'])
def delete_file(file_id):
    try:
        delete_file_from_drive(drive_service, file_id)
        return jsonify({'message': f'File with ID {file_id} deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)