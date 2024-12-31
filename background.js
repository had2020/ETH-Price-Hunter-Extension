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
        kprice = (parseFloat(price) / 1000).toFixed(1)
        let lastprice = localStorage.getItem("lastprice");
        updateBadge(kprice.toString() + "k");
        console.log("should be updating badge");
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

setInterval(() => {
    //unfinshed code
    chrome.action.setBadgeBackgroundColor({ color: '#800000' }, () => {
        if (chrome.browserAction.lastError) {
            console.error('Failed to set badge color:', chrome.runtime.lastError);
        } else {
            console.log('Badge color set to red');
        }
    });
    chrome.action.setBadgeBackgroundColor({ color: '#009933' }, () => {
        if (chrome.browserAction.lastError) {
            console.error('Failed to set badge color:', chrome.runtime.lastError);
        } else {
            console.log('Badge color set to red');
        }
    });
    //end unfinished code   

    let price;

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
          kprice = (parseFloat(price) / 1000).toFixed(1)
          updateBadge(kprice.toString() + "k");
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

  }, 60000); //TODO change to 5 minutes, 1000 = sec

