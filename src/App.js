import './App.css';
import {useEffect, useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InputComponent from './Components/InputComponent/InputComponent';
// import generatePDF from 'react-to-pdf';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@material-ui/core';
import { ButtonDarkTheme, ButtonLightTheme } from './Components/InputComponent/SubmitButton';
import { darkTheme } from './Components/Constants/themeConstants';
import jsPDF from 'jspdf';

function App() {

  const [theme, setTheme] = useState({})
  const [markdownObjects, setMarkdownObjects] = useState([])
  const [pdfCount, setPdfCount] = useState(0)

  useEffect(()=>{
    setPdfCount(markdownObjects.length)
  },[markdownObjects])

  return (
    <div className="App" style={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <InputComponent theme={theme} setMarkdownObjects={setMarkdownObjects}/>    
      <PdfCarousel theme={theme} markdownObjects={markdownObjects} pdfCount={pdfCount}/>    
      <Footer theme={theme}/>
    </div>
  );
}

// function PdfCarousel({ markdownObjects, pdfCount }) {
//   if (pdfCount === 0) return <> Note to self: Preview Would Appear Here | Adding flex photo to flex this project here</>;
//   return (
//     <PreviewMarkdownAndDownloadButton content={markdownObjects[3].content} title={markdownObjects[3].title}/>
//   );
// }


function PdfCarousel({ markdownObjects, pdfCount }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if(currentIndex+1 === markdownObjects.length)
        setCurrentIndex(0)
    else
      setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if(currentIndex === 0)
        setCurrentIndex(markdownObjects.length-1)
    else
      setCurrentIndex(currentIndex - 1);
  };

  return (
    <div
      style={PdfCarouselStyle}>
      
      {currentIndex >= 0 && (
        <Button onClick={handlePrevious}>Previous</Button>
      )}
      {currentIndex < markdownObjects.length && (
        <Button onClick={handleNext}>Next</Button>
      )}
      {markdownObjects.length > 0 && (
        <PreviewMarkdownAndDownloadButton
          content={markdownObjects[currentIndex].content}
          title={markdownObjects[currentIndex].title}
        />
      )}

    </div>
  );
}

const PdfCarouselStyle = {
  borderTop: '1px solid #aaa',
  padding: '2rem',
}

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

const DownloadPDFButton = ({ theme, title, pdfRef }) => {
  // when clicking on submit
  // The Download PDF button is being reset to the opposite color of the current theme
  // check out why and rectify that error
  // Add another button to download All (place it on the left ideally)
  var downloadButtonTheme = theme === darkTheme ? ButtonDarkTheme : ButtonLightTheme

  return (
    <div style={buttonContainerCSS}>
      <Button variant="contained" style={downloadButtonTheme} onClick={ () => downloadHighlights(pdfRef)}>Download PDF</Button>
    </div>
  );
};

// function downloadHighlights(pdfRef){
//   pdfRef.current.classList.add('pdf-text-black');
//   generatePDF(pdfRef);
//   pdfRef.current.classList.remove('pdf-text-black');
// }

function downloadHighlights(pdfRef) {
  pdfRef.current.classList.add('pdf-text-black');

  var componentHTML = HTML_OPENING + mdStylesString.trim()
  componentHTML += BODY_OPENING + ' <div style="width:550px; height:100px;">' + pdfRef.current.innerHTML + ' </div>' + BODY_CLOSING + HTML_CLOSING;

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
  });
    
  console.log(componentHTML)
  console.log(doc.getFontSize())
  
  doc.html(componentHTML, {
    callback: function (doc) {
      // pass the title name here after parsing the title
      doc.save("output.pdf");
    },
    x: 50,
    y: 30,
  });
}


const buttonContainerCSS = {
  textAlign: 'right',
  paddingRight: '5rem'
}

const HTML_OPENING= "<html> "
const HTML_CLOSING = "</html> "
const BODY_OPENING ="<body>"
const BODY_CLOSING = "</body>"

const mdStylesString = `
<style>  
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h4 {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h6 {
    font-size: 0.9em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 12px;
  }

  /* Bold */
  b, strong {
    font-weight: bold;
  }

  /* Italic */
  i, em {
    font-style: italic;
  }

  /* Strike Through */
  s, strike {
    text-decoration: line-through;
  }

  /* Blockquote */
  blockquote {
    margin: 0;
    padding: 0 1em;
    color: #666;
    border-left: 4px solid #ccc;
  }

  /* Code Block */
  pre {
    margin: 0;
    padding: 0.5em;
    background-color: #f0f0f0;
    font-family: 'Courier New', Courier, monospace;
    border: 1px solid #ccc;
    white-space: pre-wrap;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f0f0f0;
    padding: 0.2em;
    border: 1px solid #ccc;
  }
</style>`



export default App;

// parse title to have a valid Title
// todo Move content to relevant files 