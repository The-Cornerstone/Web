/**
 * Uses public arXiv API to get anti-cheat article count
 * 
 * Thanks to Sem Postma for the Atom feed parsing resources!
 * (https://medium.com/@polyismstudio/creating-an-atom-feed-reader-with-javascript-8d71a5cdf8e3)
 */

const endpoint = "https://export.arxiv.org/api/query?search_query=";
const parser = new DOMParser();

let performQuery = async (query) => {
    let response = await fetch(endpoint + query);
    let xml = await response.text();
    
    return xml;
};

let parseAsXmlDoc = async (xml) => {
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    
    return xmlDoc;
};

let getFromXmlDoc = async (doc, tag, count=1) => {
    let results = doc.getElementsByTagName(tag);

    if (count < 1 || count > results.length)
        return Error(`Requested results count out of bounds (${count} < 1 or ${count} > ${results.length}).`);

    return (count == 1) ? results[0] : results.slice(0, count);
};

