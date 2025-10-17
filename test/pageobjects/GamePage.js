import { Button } from '../../framework/elements/Button.js';
import { Label } from '../../framework/elements/Label.js';
import BasePage from '../../framework/page/BasePage.js';

class GamePage extends BasePage {
  moreInformationButton = new Button("//a[@class='toggle_info_btn']", 'More Information Button');

  infoPanel = new Label("//div[@class='info_panel_wrapper' and @style='display: block;']", 'Information panel');

  gameInfo = (text) => new Button(`//td[text()='${text}']/following-sibling::td/a`, `Information about Game ${text}`);

  buyButton = new Button("//a[contains(@class,'buy_btn')]", 'Buy Button');

  gamePrice = new Label("//span[@itemprop='price']", 'Game Price');

  constructor() {
    super(new Label("//div[@id='inner_column']", 'Game Info Wrapper'), 'Game Page');
  }

  async clickMoreInformationButton() {
    await this.moreInformationButton.scrollIntoView();
    await this.moreInformationButton.click();
  }

  async getGameInfo(text) {
    await this.infoPanel.state().waitForDisplayed();
    return this.gameInfo(text).getText();
  }

  async clickBuyButton() {
    await this.buyButton.scrollIntoView();
    await this.buyButton.click();
  }

  async getGamePrice() {
    return this.gamePrice.getText();
  }
}

export default new GamePage();
