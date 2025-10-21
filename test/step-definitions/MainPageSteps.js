import { Given, When } from '@wdio/cucumber-framework';
import allure from '@wdio/allure-reporter';
import { config } from '../../configs/chrome.cucumber.conf.js';
import Browser from '../../framework/browser/Browser.js';
import mainPage from '../pageobjects/MainPage.js';

Given(/^I am on the main page$/, async () => {
  await allure.startStep('Open main page');
  await Browser.openUrl(config.baseUrl);
  await allure.endStep();
});

When(/^I type "([^"]*)" in the search field$/, async function (text) {
  await allure.startStep(`Type "${text}" into search field`);
  await mainPage.typeIntoSearchField(text);
  this.context.searchQuery = text;
  await allure.endStep();
});

When(/^I click the search button$/, async () => {
  await allure.startStep('Click the search button');
  await mainPage.clickSearchButton();
  await allure.endStep();
});
