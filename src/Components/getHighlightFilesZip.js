import validateClippings from "./ValidateClippings";
import getBooks from "./getBooks";
import { ENDL, QUOTE, H5 } from "./Constants/markdownConstants";

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
        for(const book in books){
            var pdf = await bookToPdf(book, books[book], flags)
            pdfs.push([book,pdf])
            // temporary
            break;
        }
    }catch(e){
        setErrorMessage(e.toString())
    }
    console.log(pdfs)
    sendToUser(pdfs[0][0], pdfs[0][1]) // todo use obj notation here
    return pdfs
}

function sendToUser(title, data){
    var dataUrl = window.URL.createObjectURL(data);
    var tempLink = document.createElement('a');
    tempLink.href = dataUrl;
    tempLink.setAttribute('download', title.trim() + ".pdf");
    tempLink.click();
}

function checkNull(value){
    if(value === null)
            return true;
    if(value === undefined)
            return true;
    return false
}

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
    
    var bookHighlightsInMD = getMarkdown(title, content, flags)
    // const htmlString = marked(bookHighlightsInMarkdown)
    // console.log(bookHighlightsInMarkdown)
    console.log(bookHighlightsInMD)
    var result = null
    // const doc = new jsPDF({
        // orientation: 'portrait',
        // format: 'a4'
    // });
    // await doc.html(bookHighlightsInHtml,{
        // async callback(doc){
                // result = await doc.output('blob')
        // }
    // })
    return result
}

export default getHighlightFilesZip;


// ToDo futurescope add flags of what to include in highlights
// ToDo futurescope add date/time format specification by the user