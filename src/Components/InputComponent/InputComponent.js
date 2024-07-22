import SubmitButton from './SubmitButton'
import InputFileUpload from './FileUploadButton';
import { useEffect, useState } from 'react';

function InputComponent({theme}){

    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [fileData, setFileData] = useState(null)
    const [fileType, setFileType] = useState("")

    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(()=>{
        if(fileData !== null){
            // console.log(fileData)
        }
    },[fileData])

    return(
        <>
            <InputFileUpload theme={theme} setDisabled={setDisabled} setFileType={setFileType}  setFileData={setFileData}/>
            <span style={{padding: "0 1rem 0 1rem"}}></span>
            <SubmitButton theme={theme} loading={loading} setDisabled={setDisabled} setLoading={setLoading} disabled={disabled} fileType={fileType} uploadedFile={fileData} setErrorMessage={setErrorMessage}/>        
            <span><br/><br/>{errorMessage}</span>
        </>
    )
}

export default InputComponent


