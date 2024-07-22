import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { darkTheme } from '../Constants/themeConstants';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({theme, setDisabled, setFileType, setFileData}) {
    const [fileName, setFileName] = useState('Upload file')
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    useEffect(()=>{
        if(selectedFile !== null){
            setFileName(selectedFile.name)
            setDisabled(false);
            setFileType(selectedFile.type)
            console.log(selectedFile)
            const reader = new FileReader();
            reader.onload = () => {
              setFileData(reader.result);    
            };
            reader.readAsText(selectedFile);
        }
    },[selectedFile])
  
    return (
        <Button style={theme === darkTheme ? uploadButtonDark : uploadButtonLight}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            {fileName}
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
}


const uploadButtonDark = {
    backgroundColor: "#3e3e3e",
    color: "#c0c0c0",
    '&:hover': {
        backgroundColor: "#3e3e3e",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
    }
};

const uploadButtonLight = {
    backgroundColor: "#e2dada",
    color: "#1f1e1e",
}