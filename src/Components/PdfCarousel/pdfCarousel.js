import { ButtonDarkTheme, ButtonLightTheme } from '../InputComponent/SubmitButton';
import { darkTheme } from '../Constants/themeConstants';
import React, {useEffect, useState} from 'react';
import NavigationButtons from './NavigationButtons';
import MemoizedPreviewMarkdownAndDownloadButton from './PreviewMarkdownAndDownloadButton';
import { Height } from '@mui/icons-material';

function findIndexesWithKeyword(array, keyword) {
    var lowerCaseKeyWord = keyword.toLowerCase()
    return array
      .map((obj, index) => obj.title.toLowerCase().includes(lowerCaseKeyWord) ? index : -1) // Map to index or -1 if not found
      .filter(index => index !== -1); // Filter out -1 values
  }
  
  function getAllAvailableIndexes(length){
    let indexes = []
    for(let i = 0; i < length; i++){
      indexes.push(i)
    }
    return indexes
  }
  
  function PdfCarousel({ theme, markdownObjects, pdfCount }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentValidIndexes, setCurrentValidIndexes] = useState(getAllAvailableIndexes(markdownObjects.length))
    // console.log(currentValidIndexes)
  
    const handleNext = () => {
      setCurrentIndex(() => (currentIndex + 1) % currentValidIndexes.length);
    };
  
    const handlePrevious = () => {
      setCurrentIndex(() =>
        currentIndex === 0 ? currentValidIndexes.length - 1 : currentIndex - 1
      );
    };

    // This is done to update the display pdfs at initialising
    useEffect(()=>{
        var e = {
            target: {
                value: ""
            }
        }
        handleSearch(e)
    },[markdownObjects])

  
    const handleSearch = (e) => {
      const searchString = e.target.value
      var indexes = findIndexesWithKeyword(markdownObjects, searchString)
        console.log(indexes)
        setCurrentIndex(0)
        setCurrentValidIndexes(indexes)
      }
    
    var buttonTheme = theme === darkTheme ? ButtonDarkTheme : ButtonLightTheme
  
    if(markdownObjects.length === 0)
      return <div style={PdfCarouselStyle}></div>
    return (
      <div style={PdfCarouselStyle}>
      
        <NavigationButtons buttonTheme={buttonTheme} handlePrevious={handlePrevious} handleNext={handleNext} handleSearch={handleSearch}/>
        
        {
          markdownObjects[currentValidIndexes[currentIndex]] !== undefined && currentValidIndexes.length !== 0// using this for validations as the component is rendered before the array size for valid indexes is updated which causes the page to crash here
          ? <MemoizedPreviewMarkdownAndDownloadButton
          content={markdownObjects[currentValidIndexes[currentIndex]].content}
          title={markdownObjects[currentValidIndexes[currentIndex]].title}
         />
         : <div
            style={{
              textAlign: 'center', // Centers the text horizontally
              marginTop: '2rem'    // Adjust the top margin as needed
            }}>
            No such titles found! Try changing the search-query.
          </div>
        }
      </div>
    )
  }
  
  const PdfCarouselStyle = {
    borderTop: '1px solid #aaa',
    padding: '2rem',
  }
  

  

  

  

  


  export default PdfCarousel
