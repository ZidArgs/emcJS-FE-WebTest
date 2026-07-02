// Origin Private File System

import jsonParse from "@emcjs/core/patches/JSONParser.js";

const rootDirHandle = await navigator.storage.getDirectory();

const NAME_PATTERN = /[a-z0-9]+/i;

export async function writeData(namespace, filename, data) {
    if (typeof name !== "string" || !NAME_PATTERN.test(namespace)) {
        throw new TypeError("Failed to create namespace: Namespace does not match pattern [a-zA-Z0-9].");
    }
    const namespaceHandle = await rootDirHandle.getDirectoryHandle(namespace, {create: true});
    if (typeof filename !== "string" || !NAME_PATTERN.test(filename)) {
        throw new TypeError("Failed to create file handle: Filename does not match pattern [a-zA-Z0-9].");
    }
    const fileHandle = await namespaceHandle.getFileHandle(filename + ".json", {create: true});
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data));
    await writable.close();
}

export async function readData(namespace, filename) {
    if (typeof name !== "string" || !NAME_PATTERN.test(namespace)) {
        throw new TypeError("Failed to retrieve namespace: Namespace does not match pattern [a-zA-Z0-9].");
    }
    const namespaceHandle = await rootDirHandle.getDirectoryHandle(namespace);
    if (typeof filename !== "string" || !NAME_PATTERN.test(filename)) {
        throw new TypeError("Failed to retrieve file handle: Filename does not match pattern [a-zA-Z0-9].");
    }
    const fileHandle = await namespaceHandle.getFileHandle(filename + ".json");
    const file = await fileHandle.getFile();
    const data = await file.text();
    return jsonParse(data);
}

export async function removeData(namespace, filename) {
    if (typeof name !== "string" || !NAME_PATTERN.test(namespace)) {
        throw new TypeError("Failed to retrieve namespace: Namespace does not match pattern [a-zA-Z0-9].");
    }
    const namespaceHandle = await rootDirHandle.getDirectoryHandle(namespace);
    if (typeof filename !== "string" || !NAME_PATTERN.test(filename)) {
        throw new TypeError("Failed to delete file: Filename does not match pattern [a-zA-Z0-9].");
    }
    await namespaceHandle.removeEntry(filename + ".json");
}

export function getDirectoryContents() {
    return getDirectoryContentsInternal();
}

async function getDirectoryContentsInternal(directoryHandle = rootDirHandle) {
    const result = {};
    const entries = await directoryHandle.values();
    for await (const entry of entries) {
        if (entry.kind === "directory") {
            result[entry.name] = await getDirectoryContentsInternal(entry);
        } else {
            result[entry.name] = true;
        }
    }
    return result;
}
