const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');
// Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36
// Get product from Amazon
module.exports.getProductFromAmazon = function(productURL, callback) {
    puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {

        const page = await browser.newPage();
        await page.goto(productURL);
        await page.waitForSelector('body');
        

        var productInfo = await page.evaluate(() => {
           
            /* Get product title */
            let name = document.body.querySelector('#productTitle').innerText;

            /* Get image URL */
            const imageURL = document.querySelector('#landingImage').getAttribute('src');
            
            
            let brand = document.body.querySelector('#bylineInfo').innerText.replace('Visit the ', '').replace('Brand: ', '');

            /* Get review count */
            let reviewCount = document.body.querySelector('#acrCustomerReviewText').innerText;
            let formattedReviewCount = reviewCount.replace(/[^0-9]/g,'').trim();
    
            /* Get and format rating */
            let ratingElement = document.body.querySelector('.a-icon.a-icon-star').getAttribute('class');
            let integer = ratingElement.replace(/[^0-9]/g,'').trim();
            let parsedRating = parseInt(integer) / 10;
    
            /* Get availability */
            let availability = document.body.querySelector('#availability').innerText; 
            let formattedAvailability = availability.replace(/[^0-9]/g, '').trim();
    
            /* Get price */
            let price = document.body.querySelector('#priceblock_ourprice').innerText;
    
            /* Get product features */
            let features = document.body.querySelectorAll('#feature-bullets ul li');
            let formattedFeatures = [];
    
            features.forEach((feature) => {
                formattedFeatures.push(feature.innerText);
            });
    
            /* Get comparable items */
            let comparableItems = document.body.querySelectorAll('#HLCXComparisonTable .comparison_table_image_row .a-link-normal');                
            formattedComparableItems = [];
    
            comparableItems.forEach((item) => {
                formattedComparableItems.push("https://amazon.com" + item.getAttribute('href'));
            });
    
            
            var product = {
                "name": name,
                "brand": brand,
                "rating": parsedRating,
                "reviewCount" : formattedReviewCount,
                "price": price,
                "availability": formattedAvailability,
                "features": formattedFeatures,
                "comparableItems": formattedComparableItems,
                "imageURL": imageURL
            };
            
            return product;
            
        });
        await browser.close();
        console.log(productInfo);
        callback(productInfo);
    
    }).catch(function(error) {
        console.error(error);
    });
}

