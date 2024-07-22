import { Button, CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { darkTheme } from '../Constants/themeConstants';
import getHighlightFilesZip from '../getHighlightFilesZip';
import { INCORRECT_FILE_TYPE } from '../Constants/errorConstants';
function SubmitButton({theme, loading, setLoading, setDisabled, disabled, fileType, uploadedFile, setErrorMessage}) {

  var submitButtonTheme = theme === darkTheme ? SubmitButtonDark : SubmitButtonLight
  useEffect(() => {
    if(uploadedFile !== null){
      // console.log(uploadedFile)
    }
  },[uploadedFile])

  return (
    <Button
      variant="contained"
      style={submitButtonTheme}
      disabled={disabled} // disable the button as long as no file is uploaded
      onClick={()=>{submitDataForParsing(setLoading,setDisabled,uploadedFile, fileType, setErrorMessage)}}
    >
     {
        loading 
        ? <CircularProgress size={24} style={submitButtonTheme} />
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


function submitDataForParsing(setLoading, setDisabled, file, fileType, setErrorMessage){
  setLoading(true);
  setDisabled(true);
  if(fileType !== "text/plain")
    setErrorMessage(INCORRECT_FILE_TYPE)
  else
    getHighlightFilesZip(file, setErrorMessage)
  setLoading(false);
  setDisabled(false);
}

export default SubmitButton