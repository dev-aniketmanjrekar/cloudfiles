// Initialize Firebase (make sure to replace with your own Firebase config)
const firebaseConfig = {
    // Your Firebase configuration from firebase-config.js
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function uploadFile() {
const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    console.log('Selected file:', file); // Add this line
    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    const storageRef = storage.ref('uploads/' + file.name);
    storageRef.put(file).then(() => {
        alert('File uploaded successfully!');
        loadFiles(); // Refresh file list
    }).catch(error => {
        console.error('Error uploading file:', error);
    });
}

function loadFiles() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear the list

    const storageRef = storage.ref('uploads/');
    storageRef.listAll().then(result => {
        result.items.forEach(fileRef => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${fileRef.fullPath}" target="_blank">${fileRef.name}</a>`;
            fileList.appendChild(li);
        });
    }).catch(error => {
        console.error('Error loading files:', error);
    });
}

// Load files on page load
window.onload = loadFiles;
