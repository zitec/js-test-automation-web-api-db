import { Selector, t } from "testcafe";
import LoginModel from "../page_models/LoginModel";
import RegisterModel from "../page_models/RegisterModel";
import SidebarModel from "../page_models/SidebarModel";
import { faker } from "@faker-js/faker";

fixture("User actions test suite")
  .page("https://qa-practice.netlify.app")
  .beforeEach(async (t) => {
    await t.click(SidebarModel.formsBtn);
  });

test("Register test", async (t) => {
  await t.click(SidebarModel.registerBtn);
  await RegisterModel.selectCountry("Romania");

  await t
    .typeText(
      RegisterModel.email,
      faker.internet.email("Razvan", "RV", "zitec.com"),
      { paste: true, replace: true }
    )
    .click(RegisterModel.agreeTermsCheckbox)
    .typeText(RegisterModel.password, "12345", { paste: true, replace: true })
    .click(RegisterModel.submitRegisterBtn)
    .expect(RegisterModel.registerResultMessage.visible)
    .eql(true)
    .expect(
      RegisterModel.registerResultMessage.withText(
        "The account has been successfully created!"
      ).exists
    )
    .ok();
});

test("Login test - bad creds", async (t) => {
  await t
    .click(SidebarModel.loginBtn)
    .typeText(LoginModel.email, "iamqarv@gmail.com", {
      paste: true,
      replace: true,
    })
    .typeText(LoginModel.password, "12345", { paste: true, replace: true })
    .click(LoginModel.submitLoginBtn)
    .expect(
      LoginModel.loginResultMessage.withText(
        "Bad credentials! Please try again! Make sure that you've registered."
      ).exists
    )
    .ok();
});

test("Login test - valid creds", async (t) => {
  await t.click(SidebarModel.loginBtn);
  await LoginModel.login("admin@admin.com", "admin123");
  await t
    .expect(
      LoginModel.loginResultMessage.withText(
        "admin@admin.com, you have successfully logged in!"
      ).exists
    )
    .ok();
});
