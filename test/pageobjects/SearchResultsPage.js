import { Label } from '../../framework/elements/Label.js';
import BasePage from '../../framework/page/BasePage.js';
import { Button } from '../../framework/elements/Button.js';

class SearchResultsPage extends BasePage {
  pageHeader = new Label("//div[contains(@class,'search_header')]/h2", 'Page Header');
  
  gameCardByIndex = (index) => `//div[contains(@class,'game_grid_widget')]/*[${index}]`;

  gameName = (index) => new Button(`${this.gameCardByIndex(index)}//div[@class='game_title']/a`, 'Game Name');
  
  gameAuthor = (index) => new Button(`${this.gameCardByIndex(index)}//div[@class='game_author']/a`, 'Game Author');

  gameGenre = (index) => new Label(`${this.gameCardByIndex(index)}//div[@class='game_genre']`, 'Game Genre');
  
  gamePrice = (index) => new Label(`${this.gameCardByIndex(index)}//div[@class='game_title']//div[@class='price_value']`, 'Game Price');

  constructor() {
    super(new Label("//div[contains(@class,'search_header')]/h2[contains(text(),'Search results')]", 'Page Header'), 'Search Results Page');
  }

  async getPageHeader() {
    return this.pageHeader.getText();
  }

  async getGameName(gameIndex) {
    return this.gameName(gameIndex).getText();
  }

  async getGameAuthor(gameIndex) {
    return this.gameAuthor(gameIndex).getText();
  }

  async getGameGenre(gameIndex) {
    return this.gameGenre(gameIndex).getText();
  }

  async getGamePrice(gameIndex) {
    return this.gamePrice(gameIndex).getText();
  }

  async clickGame(gameIndex) {
    await this.gameName(gameIndex).click();
  }
}

export default new SearchResultsPage();
