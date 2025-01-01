chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        if (tabs && tabs[0]) {
            chrome.tabs.reload(tabs[0].id, (reloadInfo) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });
});

function should_color(callback) {
  chrome.storage.local.get("tracker_black_badge", (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving tracker_speed:', chrome.runtime.lastError);
      callback(false);
    } else {
      const tracker_black_badge = result.tracker_black_badge1;
      console.log('chroma should color:', tracker_black_badge);
      if (tracker_black_badge === undefined) {
        console.error('tracker_speed is not set in chrome.storage.local');
        callback(false);
      } else {
        callback(true);
      }
    }
  });
}


function cuttafterfirstdecimal(number) {
    return Math.floor(number * 10) / 10;
}



should_color((should_color1) => {
  console.log("should_color: " + should_color1);
});

//first run
fetch('https://coinmarketcap.com/currencies/ethereum/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.text())
  .then(data => {
    const phrase = "price today is";
    if (data.includes(phrase)) {
      console.log("The phrase 'price today is' was found in the text.");
      const regex = new RegExp(`${phrase}\\s+\\$([\\d,]+)`);
      const match = data.match(regex);
      if (match && match[1]) {
        price = match[1].toString();
        console.log(`The price is: $${match[1]}`);
        console.log(price);
        price = price.replace(/,/g, ''); // remove commas
        //kprice = (parseFloat(price) / 1000).toFixed(1)
        kprice = cuttafterfirstdecimal(parseFloat(price) / 1000);

        chrome.storage.local.get("lastprice", (result) => {
            let lastprice = result.lastprice;
            updateBadge(kprice.toString() + "k");
            console.log("should be updating badge");
            
            chrome.storage.local.set({ "lastprice": kprice }, () => {
              console.log("Last price updated in storage");
            });
          });
        chrome.action.setBadgeBackgroundColor({ color: '#000000' }, () => {
            if (chrome.browserAction.lastError) {
                console.error('Failed to set badge color:', chrome.runtime.lastError);
            } else {
                console.log('Badge color set to green');
            }
        });
      } else {
        console.log("Price not found after the phrase.");
      }
    } else {
      console.log("The phrase 'price today is' was not found in the text.");
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function updateBadge(newnum) {
    chrome.action.setBadgeText({ text: newnum }, () => {
        if (chrome.browserAction.lastError) {
            console.error('Failed to set badge text:', chrome.runtime.lastError);
        } else {
            console.log('Badge text set');
        }
    });
}

function gettime(callback) {
  chrome.storage.local.get("tracker_speed", (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving tracker_speed:', chrome.runtime.lastError);
      callback(undefined);
    } else {
      const trackerSpeed = result.tracker_speed;
      console.log('Tracker speed:', trackerSpeed);
      if (trackerSpeed === undefined) {
        console.error('tracker_speed is not set in chrome.storage.local');
        callback(undefined);
        return;
      }
      const minute = 60000;
      let newtime;
      if (trackerSpeed == "1") {
        newtime = minute;
      } else if (trackerSpeed == "2") {
        newtime = minute * 2;
      } else if (trackerSpeed == "3") {
        newtime = minute * 5;
      } else if (trackerSpeed == "4") {
        newtime = minute * 10;
      } else if (trackerSpeed == "5") {
        newtime = minute * 15;
      }
      callback(newtime);
    }
  });
}

setInterval(() => {

    let price;

    let should_color = should_color();

    fetch('https://coinmarketcap.com/currencies/ethereum/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(data => {
      const phrase = "price today is";
      if (data.includes(phrase)) {
        console.log("The phrase 'price today is' was found in the text.");
        const regex = new RegExp(`${phrase}\\s+\\$([\\d,]+)`);
        const match = data.match(regex);
        if (match && match[1]) {
          price = match[1].toString();
          console.log(`The price is: $${match[1]}`);
          console.log(price);
          price = price.replace(/,/g, '');
          //kprice = (parseFloat(price) / 1000).toFixed(1)
          kprice = cuttafterfirstdecimal(parseFloat(price) / 1000);
          chrome.storage.local.get("lastprice", (result) => {
            let lastprice = result.lastprice;
            updateBadge(kprice.toString() + "k");
            console.log("should be updating badge");

            chrome.action.setBadgeTextColor({ color: '#ffffff' }, () => {
                if (chrome.browserAction.lastError) {
                    console.error('Failed to set test color:', chrome.runtime.lastError);
                } else {
                    console.log('Badge color set to white');
                }
            });

            if ( kprice > lastprice ) {
                chrome.action.setBadgeBackgroundColor({ color: '#009933' }, () => {
                    if (chrome.browserAction.lastError) {
                        console.error('Failed to set badge color:', chrome.runtime.lastError);
                    } else {
                        console.log('Badge color set to green');
                    }
                });
            } else if ( kprice < lastprice ) {
                chrome.action.setBadgeBackgroundColor({ color: '#800000' }, () => {
                    if (chrome.browserAction.lastError) {
                        console.error('Failed to set badge color:', chrome.runtime.lastError);
                    } else {
                        console.log('Badge color set to red');
                    }
                });
            }
            
            chrome.storage.local.set({ "lastprice": kprice }, () => {
              console.log("Last price updated in storage");
            });
          });
        } else {
          console.log("Price not found after the phrase.");
        }
      } else {
        console.log("The phrase 'price today is' was not found in the text.");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  }, 60000); // 1000 = sec, default 60000 = 1 min