import BasePage from '../../framework/page/BasePage.js';
import { Label } from '../../framework/elements/Label.js';
import { Input } from '../../framework/elements/Input.js';
import { Button } from '../../framework/elements/Button.js';

class MainPage extends BasePage {
  searchField = new Input("//input[contains(@class,'search_input')]", 'Search Field');

  searchButton = new Button("//button[contains(@class,'submit_btn')]", 'Search Button');

  constructor() {
    super(new Label("//h2[text()='Latest Featured Games']", 'Latest Featured Games Section'), 'Main Page');
  }

  async typeIntoSearchField(text) {
    await this.searchField.typeTextWithClear(text);
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}

export default new MainPage();
