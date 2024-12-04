async function changeIconsToTobu8000Series() {
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    let detectionFrequency;
    let changeFrequency;
    const setDetectionFrequency = () => new Promise((resolve) => {
        chrome.storage.local.get("icon-detection-frequency", (value) => {
            if (value == null) {
                chrome.storage.local.set({"icon-detection-frequency": "200"});
                detectionFrequency = 200;
                resolve();
            } else {
                if (value["icon-detection-frequency"] >= 200) {
                    detectionFrequency = parseInt(value["icon-detection-frequency"], 10);
                } else {
                    detectionFrequency = 200;
                }
                resolve();
            }
        })
    });
    const setChangeFrequency = () => new Promise((resolve) => {
        chrome.storage.local.get("icon-change-frequency", (value) => {
            if (value == null) {
                chrome.storage.local.set({"icon-change-frequency": 0});
                changeFrequency = 0;
                resolve();
            } else {
                changeFrequency = value > 0 ? parseInt(value["icon-change-frequency"], 10) : 0 ;
                resolve();
            }
        });
    })
    await setDetectionFrequency();
    await setChangeFrequency();
    setInterval(() => {
        try {
            let profileIconElements = Array.from(document.querySelectorAll('div[style*="https://pbs.twimg.com/profile_images/"], div[style*="https://pbs.twimg.com/dm_group_img/"], div[style*="https://abs.twimg.com/sticky/default_profile_images/default_profile_"], span[style*="https://pbs.twimg.com/profile_images/"], span[style*="https://pbs.twimg.com/dm_group_img/"], span[style*="https://abs.twimg.com/sticky/default_profile_images/default_profile_"]'));
            if (location.hostname != "x.com") profileIconElements = profileIconElements.concat(Array.from(document.querySelectorAll('img[src*="https://pbs.twimg.com/profile_images/"], img[src*="https://pbs.twimg.com/dm_group_img/"], img[src*="https://abs.twimg.com/sticky/default_profile_images/default_profile_"]')));
            profileIconElements.concat()
            if (profileIconElements.length != 0) {
                if (changeFrequency <= 2) {
                    profileIconElements.forEach((element) => {
                        if (element.tagName == "IMG") {
                            element.src = chrome.runtime.getURL("icon_high.png");
                        } else {
                            element.style.backgroundImage = `url(${chrome.runtime.getURL("icon_high.png")})`;
                        }
                    });
                } else {
                    const intervalId = setInterval(() => {
                        let index = 0;
                        if (index < profileIconElements.length) {
                            const element = profileIconElements[index];
                            if (element.tagName == "IMG") {
                                element.src = chrome.runtime.getURL("icon_high.png");
                            } else {
                                element.style.backgroundImage = `url(${chrome.runtime.getURL("icon_high.png")})`;
                            }
                            index++;
                        } else {
                            clearInterval(intervalId);
                        }
                    }, changeFrequency);
                }
            }
        } catch {

        }
    }, detectionFrequency);
};
chrome.storage.local.get("icon-change-enable", (value) => {
    if (value != null) {
        if (value["icon-change-enable"] === "true") changeIconsToTobu8000Series();
    } else {
        changeIconsToTobu8000Series();
    }
});