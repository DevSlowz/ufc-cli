import { fetchAndParseHTML, getURLsFromHTML } from './scrape.js'



async function main() {
    let htmlResult = ''
    let result = ''
    
    htmlResult = await fetchAndParseHTML('https://www.ufc.com/rankings')
    result = getURLsFromHTML(htmlResult, 'https://www.ufc.com')
    
    console.log(result)
}

main()