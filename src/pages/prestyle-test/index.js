// main
import "@emcjs/fe/ui/Page.js";
import Import from "@emcjs/core/util/import/Import.js";

const loadButtonEl = document.getElementById("load-button");

loadButtonEl.addEventListener("click", once(() => {
    Import.module("@emcjs/fe/ui/navigation/NavBar.js");
    Import.module("@emcjs/fe/ui/dataview/datagrid/DataGrid.js");
    Import.module("@emcjs/fe/ui/dataview/datalist/DataList.js");
    Import.module("@emcjs/fe/ui/dataview/toolbar/DataViewControlToolbar.js");
}));

function once(callback) {
    let hasRun = false;
    return function(...args) {
        if (!hasRun) {
            hasRun = true;
            callback(...args);
        }
    };
}
