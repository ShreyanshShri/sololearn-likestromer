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

    // await page.waitForSelector('#userCodes > div:nth-child(1) > div > div.codeDetails > div.actions > div > div.upvote')

    await page.waitForSelector('.upvote')

    const likeBtns = await page.$$('.upvote')
    await likeBtns[0].click()
    // for(btn of likeBtns){
    //   await btn.click()
    // }

    console.log('Strom Sent')

    await browser.close();

  } catch (err) {
    console.log(err)
  }
}

module.exports = sendStrom