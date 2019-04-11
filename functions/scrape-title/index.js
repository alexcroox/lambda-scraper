const responses = require('../../lib/responses')
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const apiFunction = async (request, response) => {
  let requestedUrl = request.query.url

  if (!requestedUrl) {
    return responses.error(response, 'The url paramater is missing', 400)
  }

  console.log({ requestedUrl })

  let pageTitle
  let browser

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    })

    let page = await browser.newPage()

    await page.goto(requestedUrl)

    pageTitle = await page.title()
  } catch (error) {
    console.error({ error })
    return responses.error(response, error)
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }

  return responses.success(response, { pageTitle })
}

module.exports = apiFunction
