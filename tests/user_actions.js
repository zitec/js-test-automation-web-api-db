import { Selector, t } from "testcafe";

fixture("User actions test suite").page("https://qa-practice.netlify.app");

test("register test", async (t) => {
  await t.click(Selector("#forms"));
  await t.click(Selector('a[href="register.html"]'));
  //await t.click(Selector('a').withText('Register'));

  // await t.click(Selector('div > select'));
  // await t.click(Selector('option[value="Romania"]'));
  // await t.click(Selector('option').withText('Austria'));

  await selectCountry("Romania");
  await t.typeText(Selector("#emailAddress"), "iamrv@gmail.com");
  await t.click(Selector("input.form-check-input"));
  await t.typeText(Selector("#password"), "12345");
  await t.click(Selector("#registerBtn"));
  await t.expect(Selector("#message").visible).eql(true);
  await t.expect(Selector("#message").withText("The account has been successfully created!").exists).ok();
});

test("Login test - bad creds", async (t) => {
  await t.click(Selector("#forms"));
  await t.click(Selector('a[href="login.html"]'));

  await t.typeText(Selector("#email"), "iamqarv@gmail.com");
  await t.typeText(Selector("#password"), "12345");
  await t.click(Selector("#submitLoginBtn"));
  await t.expect(Selector("#message").withText("Bad credentials! Please try again! Make sure that you've registered.").exists).ok();
});

test("Login test - valid creds", async (t) => {
  await t.click(Selector("#forms"));
  await t.click(Selector('a[href="login.html"]'));
  await login("admin@admin.com", "admin123");
  await t.expect(Selector("#message").withText("admin@admin.com, you have successfully logged in!").exists).ok();
});

test("file upload test", async (t) => {
  await t.click(Selector("#file-upload-item"));
  await t.setFilesToUpload(Selector("#file_upload"), ["../files/test.txt"]);
  await t.click(Selector('button[type="submit"]'));
  await t.expect(Selector("*").withText('You have successfully uploaded "test.txt"').exists)
    .ok();
});

async function login(email, psw) {
  await t.typeText(Selector("#email"), email);
  await t.typeText(Selector("#password"), psw);
  await t.click(Selector("#submitLoginBtn"));
}

async function selectCountry(country) {
  await t.click(Selector("div > select"));
  await t.click(Selector('option[value="' + country + '"]'));
}
