import React, { useState } from 'react';
import { Button, Card, Container, Form, Toast } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const FirebaseFileUploader = () => {
  const [files, setFiles] = useState(new Array(4).fill(null));
  const [inputValues, setInputValues] = useState(new Array(4).fill(''));
  const [showToast, setShowToast] = useState(false);
  const [filePreviews, setFilePreviews] = useState(new Array(4).fill(null));

  const fileTypes = ['Aadhar Card', 'Pan Card', 'Driving license', 'Domicile Certificate'];

  const firebaseConfig = {
    // Your Firebase config here
    apiKey: 'AIzaSyD-_992h9vhAAftuEDnpulNrJnL47Bx5Ug',
    authDomain: 'sih23-7152f.firebaseapp.com',
    projectId: 'sih23-7152f',
    storageBucket: 'sih23-7152f.appspot.com',
    messagingSenderId: '340161944058',
    appId: '1:340161944058:web:9ae1fa12d3654bd36fec43'
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const storage = firebase.storage();

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const updatedFiles = [...files];
    updatedFiles[index] = selectedFile;
    setFiles(updatedFiles);
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = e.target.value;
    setInputValues(updatedInputValues);
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = event.target.result;
          const updatedPreviews = [...filePreviews];
          updatedPreviews[index] = preview;
          setFilePreviews(updatedPreviews);
        };
        reader.readAsDataURL(selectedFile);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedPreviews = [...filePreviews];
        updatedPreviews[index] = e.target.result;
        setFilePreviews(updatedPreviews);
      };
      reader.readAsDataURL(selectedFile);
  };
  const handlePreviewClick = (index) => {
    const file = files[index];
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = '';
    setInputValues(updatedInputValues);
  };

  const handleUpload = () => {
    const filesToUpload = files.filter(file => file !== null);

    if (filesToUpload.length === 0) {
      alert('Please choose at least one file to upload.');
      return;
    }

    const uploadPromises = filesToUpload.map((file, index) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      return fileRef.put(file)
        .then(() => {
          setShowToast(true);
        })
        .catch((error) => {
          console.error(`Error uploading File ${index + 1} (${file.name}):`, error);
        });
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully.');
        setFiles(new Array(4).fill(null));
        setInputValues(new Array(4).fill('')); // Clear chosen files
        setShowToast(false);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  return (
    <>
      <Container>
        <h2 className="mt-3 mb-3">Upload files</h2>
        {[...Array(4)].map((_, index) => (
          <Card key={index} className='mb-3'>
            <Card.Body>
              <Card.Title>{`Upload ${fileTypes[index]}`}</Card.Title>
              <Form>
                <Form.Group>
                  <div className="mb-3">
                    <label for="formFile" class="form-label text-muted"><small>File should be in '.pdf' '.docx' '.png' or  '.jpeg' format</small></label>
                    <input 
                    className="form-control" 
                    type="file" 
                    id={`formFile${index}`}
                    onChange={(e) => handleFileChange(e, index)} 
                    accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                    value={inputValues[index]} />
                  </div>
                </Form.Group>
              </Form>
              {files[index] && (
                <div className="mt-3">
                  <strong>Chosen File {index + 1}:</strong>
                  {filePreviews[index] && (
                    <div onClick={() => handlePreviewClick(index)}>
                      <img src={filePreviews[index]} alt={`Preview ${index + 1}`} style={{ cursor: 'pointer' }} />
                    </div>
                  )}
                  <Button variant='danger' onClick={() => handleRemoveFile(index)} className='ml-3'>Remove File</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
        <Button variant='primary' onClick={handleUpload} disabled={files.some(file => file === null)}>
          Upload Files
        </Button>
      </Container>
      <Toast bg='success' show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide style={{ position: 'absolute', top: 10, right: 10 }}>
        <Toast.Header>
          <strong className="mr-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>All files added successfully</Toast.Body>
      </Toast>
    </>
  );
};

export default FirebaseFileUploader;
