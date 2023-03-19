import React from 'react';
import { Uploader } from 'uploader'

// init images var
var images;

const ImageUpload = () => {

    // API key for upload-io
    const uploader = Uploader({
    apiKey: 'public_FW25b2gBiUt9ZJeaMf76rGcekrMo',
  });
  
    uploader
      .open({
        maxFileCount: 10,
        layout: "inline",
        container: "#landingZone",
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        showFinishButton: true
      })
      .then((files) => {
        if (files.length === 0) {
          alert('No files selected.');
        } else {
          images = files.map((f) => f.fileUrl);
          console.log(images)
        }
      })
      .catch((err) => {
        console.error(err);
    });
  
  
  return (

     <div id="landingZone" />
    
  );
};

export default ImageUpload;
