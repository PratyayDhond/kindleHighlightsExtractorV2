import SubmitButton from './SubmitButton'
import InputFileUpload from './FileUploadButton';
import { useEffect, useState } from 'react';
import { selectClasses } from '@mui/material';
import { lightTheme } from '../themeConstants';

function InputComponent({theme}){

    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [fileData, setFileData] = useState(null)

    useEffect(()=>{
        if(fileData !== null){
            // console.log(fileData)
        }
    },[fileData])

    return(
        <>
            <InputFileUpload theme={theme} setDisabled={setDisabled}  setFileData={setFileData}/>
            <span style={{padding: "0 1rem 0 1rem"}}></span>
            <SubmitButton theme={theme} loading={loading} setLoading={setLoading} disabled={disabled} uploadedFile={fileData} setLoading={setLoading}/>        
        </>
    )
}

export default InputComponent


