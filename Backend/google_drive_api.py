import os
import logging
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants for configuration
SCOPES = ['https://www.googleapis.com/auth/drive.file']
TOKEN_PATH = 'token.json'
CREDENTIALS_PATH = 'credentials.json'


def get_drive_service():
    """Authenticates with Google Drive API and returns the service object."""
    creds = None

    # Load existing credentials if available
    if os.path.exists(TOKEN_PATH):
        try:
            creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
            logging.info(f"Loaded credentials from {TOKEN_PATH}")
        except Exception as e:
            logging.error(f"Error loading credentials: {e}")

    # If credentials are not valid, run the OAuth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
                logging.info("Refreshed credentials")
            except Exception as e:
                logging.error(f"Error refreshing credentials: {e}")
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            try:
                # Specify the port to match Flask's running port (5000)
                creds = flow.run_local_server(port=5000)
                logging.info("Authorization flow completed")
            except Exception as e:
                logging.error(f"Error during authorization flow: {e}")
                return None

        # Save the credentials for the next run
        if creds and creds.valid:
            try:
                with open(TOKEN_PATH, 'w') as token:
                    token.write(creds.to_json())
                logging.info(f"Saved credentials to {TOKEN_PATH}")
            except Exception as e:
                logging.error(f"Error saving credentials: {e}")
        else:
            logging.error("Failed to obtain valid credentials")
            return None

    return build('drive', 'v3', credentials=creds)


def upload_file_to_drive(service, file_path, file_name, mime_type):
    """Uploads a file to Google Drive."""
    try:
        file_metadata = {'name': file_name}
        media = MediaFileUpload(file_path, mimetype=mime_type)
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        file_id = file.get('id')
        logging.info(f'Uploaded file "{file_name}" (ID: {file_id})')
        return file_id
    except Exception as e:
        logging.error(f"Error uploading file: {e}")
        return None


def list_files_from_drive(service, page_size=10):
    """Lists files from Google Drive with pagination."""
    try:
        results = service.files().list(
            pageSize=page_size,
            fields="nextPageToken, files(id, name, mimeType, modifiedTime, size)",
        ).execute()
        items = results.get('files', [])
        logging.info(f"Listed {len(items)} files from Drive")
        return items
    except Exception as e:
        logging.error(f"Error listing files: {e}")
        return []


def rename_file_in_drive(service, file_id, new_name):
    """Renames a file in Google Drive."""
    try:
        file_metadata = {'name': new_name}
        updated_file = service.files().update(fileId=file_id, body=file_metadata).execute()
        logging.info(f"Renamed file (ID: {file_id}) to '{new_name}'")
        return updated_file
    except Exception as e:
        logging.error(f"Error renaming file: {e}")
        return None


def delete_file_from_drive(service, file_id):
    """Deletes a file from Google Drive."""
    try:
        service.files().delete(fileId=file_id).execute()
        logging.info(f'Deleted file with ID: "{file_id}"')
        return True
    except Exception as e:
        logging.error(f"Error deleting file: {e}")
        return False


if __name__ == '__main__':
    service = get_drive_service()
    if service:
        print("Google Drive service connected successfully.")
    else:
        print("Failed to connect to Google Drive service.")
