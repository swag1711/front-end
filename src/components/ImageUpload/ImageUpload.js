import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseSuccess,setResponseSuccess] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function sendImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    fetch('http://127.0.0.1:8000/preprocess-image/', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      return response.json(); // Or response.text() depending on the backend response
    })
    .then(data => {
      // Handle successful response (e.g., display preprocessed image)
      console.log('Success:', data.message);
      setResponseMsg(data.message)
      setResponseSuccess(true)
    })
    .catch(error => {
      // Handle errors 
      console.error('Error:', error);
    });
  }
  

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      const userInput = (event.target.files[0])
      
      sendImage(userInput)

    }
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Upload an Image
      </Typography>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Choose Image
        </Button>
      </label>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ width: '100px' }} />
        </div>
      )}

      {
        responseSuccess && 

        <div>
        <Button onClick={handleOpen}>check if you are dying</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            RESULT
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {responseMsg}
            </Typography>
          </Box>
        </Modal>
      </div>
      }
    </div>
  );
}

export default ImageUpload;
