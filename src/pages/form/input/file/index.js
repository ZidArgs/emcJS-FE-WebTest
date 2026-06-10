import FileUploader from "@emcjs/core/util/file/FileUploader.js";
import {
    loadForm, init
} from "../../util/formLoader.js";

await init();
const formContext = await loadForm(false);

const fileUploader = new FileUploader();
const fileEl = document.getElementById("file");
const fileMultipleEl = document.getElementById("fileMultiple");
formContext.addEventListener("submit", () => {
    const singleFile = fileEl.files[0];
    if (singleFile) {
        fileUploader.uploadRaw(singleFile);
    }
    const multiFile = fileMultipleEl.files;
    if (multiFile.length) {
        fileUploader.upload(multiFile);
    }
});
