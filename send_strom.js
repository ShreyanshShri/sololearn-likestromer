const puppeteer = require('puppeteer')

const sendStrom = async (email, password, id) => {
  try {
    
    const browser = await puppeteer.launch({
      headless : true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    })
    const page = await browser.newPage();

    await page.goto('https://sololearn.com/user/login');

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
    console.log('Logged In')

    await page.goto(`https://sololearn.com/Profile/${id}`)

    await page.waitForSelector('#userCodes > div:nth-child(1) > div > div.codeDetails > div.actions > div > div.upvote')

    // await page.evaluate(() => {
    //     let elements = await page.$('.upvote').toArray();
    //     console.log(elements)
    //     for (i = 0; i < elements.length; i++) {
    //       setTimeout(function(){
    //         await $(elements[i]).click();
    //       }, 1000)
    //     }
    //  })

    const likeBtns = await page.$$('.upvote')

    for(btn of likeBtns){
      setTimeout( async() => {
        try{
          await btn.click()
        } catch (err) {
          console.log(err)
        }
      }, 1000)
    }

    console.log('Strom Sent')

    await browser.close();

  } catch (err) {
    console.log(err)
  }
}

module.exports = sendStrom