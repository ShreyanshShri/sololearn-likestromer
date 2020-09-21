const puppeteer = require('puppeteer')

const sendStrom = async (email, password, id) => {
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
        })
        const page = await browser.newPage();

        await page.goto('https://sololearn.com/users/login');

        await page.waitForSelector('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(1) > input')
        const emailInput = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(1) > input')
        const passwordInput = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(2) > input')
        const submitBtn = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(2) > input')

        emailInput.type(email)
        passwordInput.type(password)
        
        await Promise.all([
            submitBtn.click(),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ])

        await page.goto(`https://sololearn.com/Profile/${id}`)

        await page.waitForSelector('#userCodes > div:nth-child(1) > div > div.codeDetails > div.actions > div > div.upvote')

        await page.evaluate(() => {
            let elements = $('div.upvote').toArray();
            for (i = 0; i < elements.length; i++) {
              setInterval(function(){
                $(elements[i]).click();
              }, 1000)
            }
         })

        console.log('Strom Sent')

        await browser.close();
}

module.exports = sendStrom