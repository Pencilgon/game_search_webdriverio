import { setWorldConstructor } from '@wdio/cucumber-framework';

class CustomWorld {
  constructor() {
    this.context = {};
  }
}

setWorldConstructor(CustomWorld);
