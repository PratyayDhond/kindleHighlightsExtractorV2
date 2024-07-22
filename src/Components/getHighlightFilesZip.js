import validateClippings from "./ValidateClippings";
import processMetaData from "./metadataProcessing";

function getHighlightFilesZip(clippingsTxtFile, setErrorMessage){

    if(!validateClippings(clippingsTxtFile, setErrorMessage))
        return false;
    var books = getBooks(clippingsTxtFile,setErrorMessage);
    
    return books
}


function getBooks(highlightText, setErrorMessage){
    const lines = getLinesFromHighlights(highlightText)
    const books = {};

    try{
        var lengthOfFile = lines.length;
        var i = 0;
        var currentQuote = {}
        var title = ""
        while(i < lengthOfFile){
            currentQuote = {}
            title = lines[i++];
            processMetaData(currentQuote, lines[i++])
            i++;
            currentQuote['highlight'] = ""
            while(lines[i] !== "=========="){
                currentQuote['highlight'] += lines[i]
                i++;
            }
            i++

            // Adding CurrentQuote to book in books
            addElement(books,title,currentQuote)
        }
    }catch(e){
        setErrorMessage("Error in parsing the file")
    }
    return books   
}


function addElement(map, key, value) {
    if (!map[key]) {
      map[key] = [value];
    } else {
      map[key].push(value);  
    }
    return map
}

function getLinesFromHighlights(highlightText){
    var lines = highlightText.split("\r\n");
    if(lines[lines.length-1] === "")
            lines.pop()
    return lines
}

export default getHighlightFilesZip;