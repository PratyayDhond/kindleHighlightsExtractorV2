function processMetaData(currentQuote, metadata){
    currentQuote["isHighlight"] = getHighlight(metadata) 
    currentQuote["isNote"] = getTypeNote(metadata)
    currentQuote["pageNumber"] = getPageNumber(metadata)
    currentQuote["location"] = getLocation(metadata)
    currentQuote["timestamp"] = getTimeStamp(metadata)
    return currentQuote
}

function getHighlight(str){
    const regex = /^- Your Highlight/;
    const match = str.match(regex);
    return match ? true : false
}

function getTypeNote(str){
    const regex = /^- Your Note/;
    const match = str.match(regex);
    return match ? true : false
}

function getPageNumber(str){
    const regex = /page (\d+)/;
    const match = str.match(regex);
    return match ? match[1] : null;
}

function getLocation(str){
    const regex = /Location (\d+-\d+)/;
    const match = str.match(regex);
    return match ? match[1] : null;
}

function getTimeStamp(str){
    const regex = /Added on (.+)/;
    const match = str.match(regex);
    return match ? match[1] : null
}

export default processMetaData