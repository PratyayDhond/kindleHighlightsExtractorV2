import './App.css';
import {useEffect, useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InputComponent from './Components/InputComponent/InputComponent';
// import generatePDF from 'react-to-pdf';
import React from 'react';
import PdfCarousel from './Components/PdfCarousel/pdfCarousel';


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
      <PdfCarousel style={PdfCarouselFlexStyle} theme={theme} markdownObjects={markdownObjects} pdfCount={pdfCount}/>    
      <Footer theme={theme}/>
    </div>
  );
}

  
const PdfCarouselFlexStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
}


export default App;

// parse title to have a valid Title
// todo Move content to relevant files 