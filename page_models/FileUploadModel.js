import { Selector } from "testcafe";

class FileUploadModel {
  constructor() {
    this.fileUploadInput = Selector("#file_upload");
    this.fileUploadBtn = Selector('button[type="submit"]');
  }
}

export default new FileUploadModel();
