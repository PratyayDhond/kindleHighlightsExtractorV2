import { Button } from '@material-ui/core';
import { darkTheme } from '../Constants/themeConstants';
import { ButtonDarkTheme, ButtonLightTheme } from '../InputComponent/SubmitButton';
import {HTML_CLOSING, HTML_OPENING, BODY_OPENING, BODY_CLOSING, STYLE_FOR_MARKDOWN} from '../Constants/constants'
import jsPDF from'jspdf';


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

function downloadHighlights(pdfRef) {

  var componentHTML = HTML_OPENING + STYLE_FOR_MARKDOWN.trim()
  componentHTML += BODY_OPENING + ' <div style="width:550px; height:100px;">' + pdfRef.current.innerHTML + ' </div>' + BODY_CLOSING + HTML_CLOSING;
  // var utf16HTML = unescape(encodeURIComponent(componentHTML));
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
    x: 10,
    y: 10,
  });
}


const buttonContainerCSS = {
  textAlign: 'right',
  paddingRight: '5rem'
}
export default DownloadPDFButton

