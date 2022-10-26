import { Selector } from "testcafe";

class SidebarModel {
  constructor() {
    this.formsBtn = Selector("#forms");
    this.fileUploadBtn = Selector("#file-upload-item");
    this.loginBtn = Selector('a[href="login.html"]');
    this.registerBtn = Selector('a[href="register.html"]');
  }
}

export default new SidebarModel();
