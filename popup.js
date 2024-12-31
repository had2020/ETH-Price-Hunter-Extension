console.log('popup.js loaded');

fetch('https://coinmarketcap.com/currencies/ethereum/', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.text())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

console.log('fetched data...');