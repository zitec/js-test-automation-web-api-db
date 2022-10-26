import { Selector, t } from "testcafe";

class RegisterModel {
  constructor() {
    this.email = Selector('input[name="emailAddress"]');
    this.password = Selector("#password");
    this.agreeTermsCheckbox = Selector("input.form-check-input");
    this.submitRegisterBtn = Selector("#registerBtn");
    this.dropdownSelect = Selector("div > select");
    this.dropdownOption = (country) =>
      Selector('option[value="' + country + '"]');
    this.registerResultMessage = Selector("#message");
  }

  async selectCountry(country) {
    await t.click(this.dropdownSelect);
    await t.click(this.dropdownOption(country));
  }
}

export default new RegisterModel();
