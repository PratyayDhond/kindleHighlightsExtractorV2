import validateClippings from "./ValidateClippings";
import getBooks from "./getBooks";
import { ENDL, H5, QUOTE } from "./Constants/markdownConstants";
import jsPDF from 'jspdf';
import {marked} from 'marked';

function getHighlightFilesZip(clippingsTxtFile, setErrorMessage){

    if(!validateClippings(clippingsTxtFile, setErrorMessage))
        return false;
    var books = getBooks(clippingsTxtFile,setErrorMessage);
    // convert books to markdown->PDFs
    var pdfBooks = getPdfs(books,setErrorMessage)
    // convert PDFs to ZIP File
    // download the zip
    return pdfBooks
}

async function getPdfs(books,setErrorMessage){
    var pdfs = []
    var flags = {
        highlight: true,
        noteType: true,
        location: true,
        pageNo: true,
        date: true,
    }
    try {
        var count = 0;
        for(const book in books){
            var pdf = await bookToPdf(book, books[book], flags)
            pdfs.push([book, pdf])
            count++;
            // temporary
            if(count > 5)
                break;
        }
    }catch(e){
        setErrorMessage(e.toString())
    }
    // console.log(pdfs)
    sendToUser(pdfs[3][0], pdfs[3][1]) // todo use obj notation here
    return pdfs
}

function sendToUser(title, data){
    if(data !== null){
        var dataUrl = window.URL.createObjectURL(data);
        var tempLink = document.createElement('a');
        tempLink.href = dataUrl;
        tempLink.setAttribute('download', title.trim() + ".pdf");
        tempLink.click();    
    }
}

function checkNull(value){
    if(value === null)
            return true;
    if(value === undefined)
            return true;
    return false
}

const generatePdfBlob =  async (markdownString) => {
    const htmlString = marked(markdownString);
    const pdf = new jsPDF();  
    var pdfBlob = null;
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
    await pdf.html(htmlString, {
        callback: function (doc) {
          pdfBlob = doc.output('blob');
        },
     });
    return pdfBlob  
  };
  

function getMarkdown(title, content, flags){

    var md = "";
    md += "### "+title
    md += ENDL
    md += H5 + " Highlights"
    md += ENDL
    for(const highlight of content){
        if(flags.noteType)
            var noteType = content.isHighlight === true ? "Highlight" : "Note"
            md += noteType + " "
        if(flags.location && !checkNull(highlight.location))
            md += "on Location: " + highlight.location
        md += ENDL
        if(flags.pageNo && !checkNull(highlight.pageNo))
            md += "Page: " + highlight.pageNo + ENDL
        if(flags.highlight)
            md += QUOTE + highlight.highlight + ENDL
        if(flags.date && !checkNull(highlight.timestamp))
            md += highlight.timestamp + ENDL
        md += ENDL + ENDL
        if(md.endsWith(ENDL + ENDL + ENDL + ENDL)){
            md = "" // no flags enabled
            break
        }
    }   
    // console.log(md)
    return md;
}

async function bookToPdf(title,content,flags){
    
    var bookHighlightsInMd = getMarkdown(title, content, flags)
    var result = await generatePdfBlob(bookHighlightsInMd)
    return result
}

export default getHighlightFilesZip;


// ToDo futurescope add flags of what to include in highlights
// ToDo futurescope add date/time format specification by the user