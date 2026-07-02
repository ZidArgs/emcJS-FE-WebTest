import {
    readData, writeData, getDirectoryContents
} from "./OPFSHandler.js";

const inputEl = document.getElementById("input");
const writeEl = document.getElementById("write");
const readEl = document.getElementById("read");

const NAMESPACE = "TEST";
const FILENAME = "FOOBAR";

window.listOPFSContents = async function() {
    console.log("OPFS", await getDirectoryContents());
};

writeEl.addEventListener("click", async () => {
    await writeData(NAMESPACE, FILENAME, {
        value: inputEl.value,
        timestamp: new Date()
    });
    inputEl.value = "";
});

readEl.addEventListener("click", async () => {
    const data = await readData(NAMESPACE, FILENAME);
    console.log(data);
});
