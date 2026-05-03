import FileLoader from "@emcjs/core/util/file/FileLoader.js";
import I18nOption from "@emcjs/fe/ui/i18n/builtin/I18nOption.js";
import "@emcjs/fe/loader/FormComponentsLoader.js";
import "@emcjs/fe/ui/Page.js";
import "@emcjs/fe/ui/input/ListSelect.js";
import "@emcjs/fe/ui/input/Option.js";

const data = await FileLoader.json(`./config.json`);

const newListSelect = document.getElementById("list-select");
const oldListSelect = document.getElementById("list-select-old");

for (const key in data) {
    const value = data[key];

    {// new list select
        const optionEl = I18nOption.create();
        optionEl.value = key;
        optionEl.i18nValue = value;
        newListSelect.append(optionEl);
    }

    {// old list select
        const optionEl = document.createElement("emc-option");
        optionEl.value = key;
        const el = document.createElement("emc-i18n-label");
        el.i18nValue = value;
        optionEl.append(el);
        oldListSelect.append(optionEl);
    }
}
