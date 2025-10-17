import { Button } from '../../framework/elements/Button.js';
import { Label } from '../../framework/elements/Label.js';
import { Input } from '../../framework/elements/Input.js';
import BasePage from '../../framework/page/BasePage.js';

class PurchaseForm extends BasePage {
  gamePrice = new Label("//strong[@class='actual_price']", 'Game Price');

  priceField = new Input("//input[@class='money_input']", 'Money Input');

  supportAmount = (amount) => new Button(`//button[@data-amount='${amount}']`, `Support the developers by paying +${amount} extra`);

  constructor() {
    super(new Button("//button[@data-source='paypal']", 'Pay with Paypal Button'), 'Purchase Page');
  }

  async getGamePrice() {
    return this.gamePrice.getText();
  }

  async fillInPriceField(amount) {
    await this.priceField.typeTextWithClear(amount);
  }

  async getValueOfPriceField() {
    return this.priceField.getValue();
  }

  async clickPayExtraAmount(amount) {
    await this.supportAmount(amount).click();
  }
}

export default new PurchaseForm();
