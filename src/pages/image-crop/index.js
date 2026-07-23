import ObjectURLHandler from "@emcjs/core/util/ObjectURLHandler.js";
import "@emcjs/fe/ui/form/element/components/image/ImageCropper.js";
import "@emcjs/fe/ui/form/element/input/file/FileInput.js";

const imageCropperEl = document.getElementById("image-cropper");
const imagePreviewEl = document.getElementById("image-preview");
const cropButtonEl = document.getElementById("crop-button");
const imageUploadEl = document.getElementById("image-upload");

const sourceURLHandler = new ObjectURLHandler();
const croppedURLHandler = new ObjectURLHandler();

cropButtonEl.addEventListener("click", renderImage);
imageCropperEl.addEventListener("load", renderImage);

imageUploadEl.addEventListener("change", () => {
    imageCropperEl.src = sourceURLHandler.setBlob(imageUploadEl.getData().file);
});

async function renderImage() {
    const blob = await imageCropperEl.toBlob();
    imagePreviewEl.src = croppedURLHandler.setBlob(blob);
}
