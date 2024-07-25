import React from "react";
import ReactMarkdown from 'react-markdown';
import DownloadPDFButton from "./DownloadPdfButton";

const MemoizedPreviewMarkdownAndDownloadButton = React.memo(
    ({ content, title }) => (
      <PreviewMarkdownAndDownloadButton content={content} title={title} />
    )
);
    
function PreviewMarkdownAndDownloadButton({theme, content, title}){
  const pdfRef = React.createRef();
  return(
    <>
      <DownloadPDFButton theme={theme} title={title} pdfRef={pdfRef}/>
      <div ref={pdfRef}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
}

  export default MemoizedPreviewMarkdownAndDownloadButton