
/*
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
*/
// /\ fetching code

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