// utils/driveAPI.js

export const listDriveFiles = (accessToken) => {
    return new Promise((resolve, reject) => {
      const google = window.gapi;
  
      google.client.setApiKey('YOUR_GOOGLE_API_KEY'); // Replace with your API Key
      google.client.load('drive', 'v3', () => {
        google.client.setToken({ access_token: accessToken });
  
        const request = google.client.drive.files.list({
          q: "'root' in parents",
          fields: 'files(id, name, mimeType, size)',
        });
  
        request.execute((response) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.files);
          }
        });
      });
    });
  };
  
  export const uploadFileToDrive = (accessToken, file) => {
    return new Promise((resolve, reject) => {
      const google = window.gapi;
  
      google.client.setApiKey('YOUR_GOOGLE_API_KEY');
      google.client.load('drive', 'v3', () => {
        google.client.setToken({ access_token: accessToken });
  
        const metadata = {
          name: file.name,
          mimeType: file.type,
        };
  
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);
  
        const request = new Request('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: new Headers({
            Authorization: `Bearer ${accessToken}`,
          }),
          body: form,
        });
  
        fetch(request)
          .then((response) => response.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };
  