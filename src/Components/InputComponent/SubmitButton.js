import { Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { darkTheme } from '../themeConstants';

function SubmitButton({theme, loading, setLoading, disabled, uploadedFile}) {

  useEffect(() => {
    if(uploadedFile !== null){
      // console.log(uploadedFile)
    }
  },[uploadedFile])

  return (
    <Button
      variant="contained"
      style={theme === darkTheme ? SubmitButtonDark : SubmitButtonLight}
      disabled={disabled} // disable the button as long as no file is uploaded
      onClick={()=>{submitDataForParsing(setLoading,uploadedFile)}}
    >
     {
        loading 
        ? <CircularProgress size={24} color="primary" />
        : "Submit" // todo replace this with parsing and processing method
     }
    </Button>
  );
}

const SubmitButtonDark = {
    backgroundColor: "#3e3e3e",
    color: "#c0c0c0",
    '&:hover': {
        backgroundColor: "#3e3e3e",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
    }
};

const SubmitButtonLight = {
    backgroundColor: "#e2dada",
    color: "#1f1e1e",
}


function submitDataForParsing(setLoading, file){
  setLoading(true);
  console.log(file)
  setLoading(false)
}

export default SubmitButton