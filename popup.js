if (localStorage.getItem("firstgo") != "false") {
  localStorage.setItem("firstgo", "false")
  alert("Please reset settings to default by clicking on the settings button")
  chrome.tabs.create({
    url: chrome.runtime.getURL('settings.html')
  });
  localStorage.setItem("firstgo", "false")

  localStorage.setItem("tracker_black_badge", "false")
  localStorage.setItem("tracker_show_badge", "true")
  localStorage.setItem("tracker_speed", "3")

  chrome.storage.local.set({ "tracker_speed": "3" }, () => {
    console.log("tracker_speed settings saved");
  });

  chrome.storage.local.set({ "tracker_show_badge": "true" }, () => {
    console.log(" tracker_show_badge settings saved");
  });

  chrome.storage.local.set({ "tracker_black_badge": "false" }, () => {
    console.log("tracker_black_badge settings saved");
  });
} else {
  console.log("Not first go")
}

document.getElementById('copy-button').addEventListener('click', function() {
  const address = '0x6F4C57911E2867caf57a1316b53A05a71a9F5818';
  navigator.clipboard.writeText(address).then(function() {
    //alert('Address copied to clipboard');
    document.getElementById('copy-button').innerText = 'Copied Address';
    setTimeout(() => {
      document.getElementById('copy-button').innerText = 'Copy Address';
    }, 1000); 
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});

document.getElementById('settings-button').addEventListener('click', function() {
  chrome.tabs.create({
    url: chrome.runtime.getURL('settings.html')
  });
});