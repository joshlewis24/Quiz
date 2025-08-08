const quotes = [
  "Ship early, ship often.",
  "Eat before you’re hungry; commit before you’re ready.",
  "Delete code you don’t need."
];

function randomQuote(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

document.body.innerHTML = `<h2>${randomQuote(quotes)}</h2>`;
