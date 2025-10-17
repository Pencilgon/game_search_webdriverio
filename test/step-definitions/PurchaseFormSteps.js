import { When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import purchaseForm from '../pageobjects/PurchaseForm.js';
import priceUtils from '../utils/PriceUtils.js';

Then(/^The game price matches with the price shown on the game page$/, async function () {
  await allure.startStep('Verify game price matches price on game page');
  const purchaseFormPriceText = await purchaseForm.getGamePrice();
  const gamePagePriceText = this.context.gamePrice;

  const gamePagePrice = priceUtils.normalizePrice(gamePagePriceText);
  const purchaseFormPrice = priceUtils.normalizePrice(purchaseFormPriceText);

  assert.equal(
    purchaseFormPrice,
    gamePagePrice,
    `Expected game page price "${gamePagePrice}" to equal search page price "${purchaseFormPrice}"`,
  );
  await allure.endStep();
});

Then(/^The same price should be inserted in the price text field$/, async () => {
  await allure.startStep('Verify the same price is inserted in the price text field');
  const amount = await purchaseForm.getGamePrice();
  await purchaseForm.fillInPriceField(amount);
  assert.equal(await purchaseForm.getValueOfPriceField(), amount, '');
  await allure.endStep();
});

When(/^I click "([^"]*)" button to support the developers$/, async function (amount) {
  await allure.startStep(`Click "${amount}" button to support the developers`);
  const digit = priceUtils.stripToDigits(amount);
  await purchaseForm.clickPayExtraAmount(digit);
  this.context.payExtra = priceUtils.normalizePrice(amount);
  await allure.endStep();
});

Then(/^The price field increases accordingly$/, async function () {
  await allure.startStep('Verify price field increases accordingly');
  const actualPrice = priceUtils.normalizePrice(await purchaseForm.getValueOfPriceField());
  const amount = priceUtils.normalizePrice(await purchaseForm.getGamePrice());
  const expectedAmount = amount + this.context.payExtra;
  assert.equal(actualPrice, expectedAmount, '');
  await allure.endStep();
});
