const puppeteer = require('puppeteer')
const email = process.env.EMAIL
const password = process.env.PASSWORD

const sendStrom = async (id) => {
  try {
    // launching puppeteer
    const browser = await puppeteer.launch({
      headless : true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    })
    const page = await browser.newPage();

    // setting default timeout to 0 to ignore timeout warnings
    await page.setDefaultNavigationTimeout(0);

    // login
    await page.goto('https://sololearn.com/users/login')

    // selecting elements
    await page.waitForSelector('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(1) > input')
    const emailInput = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(1) > input')
    const passwordInput = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > div:nth-child(2) > input')
    const submitBtn = await page.$('#root > div > div > div > div > div > div.sl-user-login__content > div > div > div > div.sl-login-login__form > form > div > button')

    // filling form and hit submit
    await emailInput.type(email)
    await passwordInput.type(password)
    await submitBtn.click()
    // waitin for next page to load
    await page.waitForNavigation()

    console.log('Logged In...')    

    // redirecting to user's profile page
    await page.goto(`https://sololearn.com/Profile/${id}`)
    console.log("Redirected to user's profile...")
    // selecting the like buttons
    await page.waitForSelector('.upvote')
    const likeBtns = await page.$$('.upvote')
    console.log('Sending Stroms...')

    // iterating over like btns and hitting them in every 4000 ms
    for(btn of likeBtns){
      await btn.click()
      await page.waitForTimeout(4000)
    }

    console.log('Strom Sent...')
    // closing the browser
    await browser.close();

  } catch (err) {
    // error checkings
    console.log(err)
  }
}

module.exports = sendStrom