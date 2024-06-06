import { JSDOM } from 'jsdom'


function getURLsFromHTML(htmlBody, baseURL) {
    // Returns list of all the link URLs - un-normalized
    // Create an object of the DOM
    const links = []
    const dom = new JSDOM(htmlBody)
    const anchorElements = dom.window.document.querySelectorAll('a')
    
    anchorElements.forEach(anchor => {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')

            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                links.push(href)
            } catch (error) {
                console.log(`${error.message}: ${href}`)
            }
        }
    });
    
    return links
}


async function fetchAndParseHTML(currentURL) {
    let webpage
    // Attempt to fetch information from specified URL
    try {
        webpage = await fetch(currentURL)
    } catch (error) {
        throw new Error(`Got Network error: ${error.message}`)
    }
    
    // If the response from the fetch is equivalent to an error(>400) displaay to console
    if (webpage.status > 399) {
        console.log(`Got HTTP error: ${webpage.status} ${webpage.statusText}`)
        return 
    }

    const contentType = webpage.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return
    }

    // console.log(await webpage.text())

    // Collect, Store, and display web content
    const webpageContent = await webpage.text()
    
    return webpageContent
}


export { fetchAndParseHTML, getURLsFromHTML};