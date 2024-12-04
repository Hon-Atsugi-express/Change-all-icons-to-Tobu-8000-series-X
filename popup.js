const changeAllIconsToTobu8000SeriesXPopupInit = () => {
    const iconChangeEnableCheckbox = document.getElementById("icon-change-enable-checkbox-change-all-icons-to-tobu-8000-series-x");
    const iconDetectionFrequencyNumber = document.getElementById("icon-detection-frequency-number-change-all-icons-to-tobu-8000-series-x");
    const iconChangeFrequencyNumber = document.getElementById("icon-change-frequency-number-change-all-icons-to-tobu-8000-series-x");
    chrome.storage.local.get("icon-change-enable", (value) => {
        if (value == null) {
            iconChangeEnableCheckbox.checked = true;
            chrome.storage.local.set({"icon-change-enable": true})
        } else {
            iconChangeEnableCheckbox.checked = (value["icon-change-enable"] === "true");
        }
    });
    chrome.storage.local.get("icon-detection-frequency", (value) => {
        if (value == null && value < 1) {
            iconDetectionFrequencyNumber.value = 200;
            chrome.storage.local.set({"icon-detection-frequency": "200"});
        } else {
            iconDetectionFrequencyNumber.value = parseInt(value["icon-detection-frequency"], 10);
        }
        
    });
    chrome.storage.local.get("icon-change-frequency", (value) => {
        if (value == null && value < 1) {
            iconChangeFrequencyNumber.value = 0;
            chrome.storage.local.set({"icon-change-frequency": 0});
        } else {
            iconChangeFrequencyNumber.value = parseInt(value["icon-change-frequency"], 10);
        }
    });
    iconChangeEnableCheckbox.addEventListener("change", () => {
        chrome.storage.local.set({"icon-change-enable": iconChangeEnableCheckbox.checked.toString()});
    });
    iconDetectionFrequencyNumber.addEventListener("change", () => {
        chrome.storage.local.set({"icon-detection-frequency": iconDetectionFrequencyNumber.value.toString()});
    });
    iconChangeFrequencyNumber.addEventListener("change", () => {
        chrome.storage.local.set({"icon-change-frequency": iconChangeFrequencyNumber.value.toString()});
    })
}
changeAllIconsToTobu8000SeriesXPopupInit();