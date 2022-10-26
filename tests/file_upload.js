import { Selector, t } from "testcafe";
import FileUploadModel from "../page_models/FileUploadModel";
import SidebarModel from "../page_models/SidebarModel";

fixture("File upload test suite")
  .page("https://qa-practice.netlify.app")
  .beforeEach(async (t) => {
    await t.click(SidebarModel.formsBtn);
  });

test("file upload test", async (t) => {
  await t
    .click(SidebarModel.fileUploadBtn)
    .setFilesToUpload(FileUploadModel.fileUploadInput, ["../files/test.txt"])
    .click(FileUploadModel.fileUploadBtn)
    .expect(
      Selector("*").withText('You have successfully uploaded "test.txt"').exists
    )
    .ok();
});
