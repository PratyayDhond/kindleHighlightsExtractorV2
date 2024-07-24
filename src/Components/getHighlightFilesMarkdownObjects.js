import validateClippings from "./ValidateClippings";
import getBooks from "./getBooks";
import { ENDL, QUOTE, H2, LINE_BREAK, SINGLE_LINE_CODE, ITALIC, BOLD } from "./Constants/markdownConstants";

function getHighlightFilesMarkdownObjects(clippingsTxtFile, setErrorMessage){

    if(!validateClippings(clippingsTxtFile, setErrorMessage))
        return false;
    var books = getBooks(clippingsTxtFile,setErrorMessage);
    // convert books to markdown objects
    var markdownObjects = getMarkdownObjects(books,setErrorMessage)
    // return markdownObjects
    return markdownObjects
}

function getMarkdownObjects(books,setErrorMessage){
    var markdownObjects = []
    var flags = {
        highlight: true,
        noteType: true,
        location: true,
        pageNo: true,
        date: true,
    }
    try {
        for(const book in books){
            var bookMarkdown = getMarkdown(book, books[book], flags)
            var mdObj = {
                "title": book,
                "content": bookMarkdown
            }
            markdownObjects.push(mdObj)

        }
    }catch(e){
        setErrorMessage(e.toString())
    }
    // sendToUser(markdownObjects[0].title, markdownObjects[0].) // todo use obj notation here
    return markdownObjects
}

// function sendToUser(title, data){
//     var dataUrl = window.URL.createObjectURL(data);
//     var tempLink = document.createElement('a');
//     tempLink.href = dataUrl;
//     tempLink.setAttribute('download', title.trim() + ".pdf");
//     tempLink.click();
// }

function checkNull(value){
    if(value === null)
            return true;
    if(value === undefined)
            return true;
    return false
}

// todo 
// Add options to make things italic bold etc
// another future scope would be to save users configs and load them by uploading configs json file
function getMarkdown(title, content, flags){

    var md = ENDL + ENDL + ENDL;
    md += H2 + " " + title + ENDL
    md += LINE_BREAK
    md += ENDL
    for(const highlight of content){
        if(flags.highlight)
            md +=  QUOTE + " " + BOLD + ITALIC + "\"" + highlight.highlight.trim() + "\"" + ITALIC + BOLD + ENDL
        md+= ENDL
        md += SINGLE_LINE_CODE
        if(flags.noteType)
            var noteType = highlight.isHighlight === true ? "Highlight" : "Note"
            md += "- " +  noteType + " "
        if(flags.location && !checkNull(highlight.location))
            md += "on Location: " + highlight.location
        if(flags.pageNo && !checkNull(highlight.pageNumber))
            md += ", Page No: " + highlight.pageNumber + ENDL
        if(flags.date && !checkNull(highlight.timestamp))
            md += ", taken on " + highlight.timestamp + ENDL
        md += SINGLE_LINE_CODE
        md += ENDL

    }   
    // console.log(md)
    return md;
}

export default getHighlightFilesMarkdownObjects;


// ToDo futurescope add flags of what to include in highlights
// ToDo futurescope add date/time format specification by the user
// ToDo futurescope add location format specification by the user
// ToDo futurescope add page number format specification by the user
// Todo futurescope - allow users to delete particular quotes from a quote markdown file