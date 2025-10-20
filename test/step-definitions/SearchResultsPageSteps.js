import { When, Then } from '@wdio/cucumber-framework';
import { assert } from 'chai';
import allure from '@wdio/allure-reporter';
import searchResultsPage from '../pageobjects/SearchResultsPage.js';

Then(/^The search results page is displayed$/, async function () {
  await allure.startStep('Verify Search Results Page is displayed');
  assert.isTrue(searchResultsPage.isPageOpened(), "Search Results Page is not opened");
  await allure.endStep();
});

Then(/^The header contains the search query$/, async function () {
  await allure.startStep('Verify header contains the search query');
  assert.include(await searchResultsPage.getPageHeader(), this.context.searchQuery, '');
  await allure.endStep();
});

Then(/^The (\d+) game name matches with search query$/, async function (gameIndex) {
  await allure.startStep(`Verify game ${gameIndex} name matches search query`);
  assert.strictEqual(await searchResultsPage.getGameName(gameIndex), this.context.searchQuery, '');
  this.context.gamePrice = await searchResultsPage.getGamePrice(gameIndex);
  await allure.endStep();
});

Then(/^The (\d+) game (Author|Genre) is "([^"]+)"$/, async function (gameIndex, field, expectedValue) {
  await allure.startStep(`Verify game ${gameIndex} ${field} is "${expectedValue}"`);
  let actualValue;

  switch (field) {
    case 'Author':
      actualValue = await searchResultsPage.getGameAuthor(gameIndex);
      this.context.gameAuthor = expectedValue;
      break;
    case 'Genre':
      actualValue = await searchResultsPage.getGameGenre(gameIndex);
      this.context.gameGenre = expectedValue;
      break;
    default:
      throw new Error(`Unsupported field: ${field}`);
  }

  assert.strictEqual(actualValue, expectedValue, `Expected game ${field} to be "${expectedValue}", but got "${actualValue}"`);
  await allure.endStep();
});

When(/^I open the (\d+) game from the search results$/, async (gameIndex) => {
  await allure.startStep(`Open game ${gameIndex} from the search results`);
  await searchResultsPage.clickGame(gameIndex);
  await allure.endStep();
});

Then(/^The (\d+) game should match the initial search result$/, async function (gameIndex) {
  await allure.startStep(`Verify game ${gameIndex} matches the initial search result`);
  assert.strictEqual(await searchResultsPage.getGameName(gameIndex), this.context.searchQuery, '');
  assert.strictEqual(await searchResultsPage.getGameAuthor(gameIndex), this.context.gameAuthor, '');
  assert.strictEqual(await searchResultsPage.getGameGenre(gameIndex), this.context.gameGenre, '');
  await allure.endStep();
});
