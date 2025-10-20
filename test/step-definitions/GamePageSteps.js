import { When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import gamePage from '../pageobjects/GamePage.js';
import priceUtils from '../utils/PriceUtils.js';

Then(/^The game page is displayed$/, async function () {
  await allure.startStep('Verify Game Page is displayed');
  assert.isTrue(gamePage.isPageOpened(), "Game Page is not opened");
  await allure.endStep();
});

When(/^I expand the More information section in the game page$/, async () => {
  await allure.startStep('Expand More information section');
  await gamePage.clickMoreInformationButton();
  await allure.endStep();
});

Then(/^The "([^"]+)" matches with those from the search results$/, async function (field) {
  await allure.startStep(`Verify ${field} matches search results`);
  const actualValue = await gamePage.getGameInfo(field);
  const expectedValue = this.context[`game${field}`];
  assert.strictEqual(actualValue, expectedValue, `${field} does not match search result`);
  await allure.endStep();
});

When(/^I return to the previous page using browser navigation$/, async () => {
  await allure.startStep('Return to previous page using browser navigation');
  await browser.back();
  await allure.endStep();
});

Then(/^The game price matches with the price shown on the search results page$/, async function () {
  await allure.startStep('Verify game price matches search results');
  const gamePagePriceText = await gamePage.getGamePrice();
  const searchPagePriceText = this.context.gamePrice;
  const gamePagePrice = priceUtils.normalizePrice(gamePagePriceText);
  const searchPagePrice = priceUtils.normalizePrice(searchPagePriceText);
  assert.strictEqual(
    gamePagePrice,
    searchPagePrice,
    `Expected game page price "${gamePagePrice}" to equal search page price "${searchPagePrice}"`,
  );
  await allure.endStep();
});

When(/^I click the Buy button$/, async () => {
  await allure.startStep('Click the Buy button');
  await gamePage.clickBuyButton();
  await allure.endStep();
});
