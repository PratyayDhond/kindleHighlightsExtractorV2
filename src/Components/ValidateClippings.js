import { INCORRECT_FILE_FORMAT, NULL_CLIPPINGS_FILE } from "./Constants/errorConstants";
import keywords from "./Constants/ClippingsFileKeywords";

function validateClippings(highlightText, setErrorMessage){
    if(highlightText == null){
        setErrorMessage(NULL_CLIPPINGS_FILE)
        return false;
    }
    if(!highlightText.includes('==========')){
        setErrorMessage(INCORRECT_FILE_FORMAT)
        return false;
    }
    if(!highlightText.trim().endsWith('==========')){
        setErrorMessage(INCORRECT_FILE_FORMAT)
        return false;
    }

    for (const keyword of keywords) {
      if (!highlightText.includes(keyword)){
        setErrorMessage( INCORRECT_FILE_FORMAT + " | Missing Keyword : " + keyword)
        return false;  
      }
    }
    setErrorMessage("")
    return true;
}

export default validateClippings