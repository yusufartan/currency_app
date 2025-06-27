const selectFromCurrency = document.querySelector("#selectFromCurrency");
const selectToCurrency = document.querySelector("#selectToCurrency");
const inputAmount = document.querySelector("#inputAmount");
const inputResult = document.querySelector("#inputResult");
const reverse = document.querySelector("#reverse");

const currencyConverter = new CurrencyConverter();

const currencyList = [
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR",
  "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY",
  "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB",
  "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
];

window.addEventListener("DOMContentLoaded", populateCurrencyOptions);

function populateCurrencyOptions() {
  selectFromCurrency.innerHTML = "";
  selectToCurrency.innerHTML = "";

  for (const currencyCode of currencyList) {
    const optionFrom = document.createElement("option");
    optionFrom.textContent = currencyCode;
    optionFrom.value = currencyCode;
    if (currencyCode === "TRY") optionFrom.selected = true;
    selectFromCurrency.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.textContent = currencyCode;
    optionTo.value = currencyCode;
    if (currencyCode === "USD") optionTo.selected = true;
    selectToCurrency.appendChild(optionTo);
  }

  inputAmount.addEventListener("input", handleExchange);
  selectFromCurrency.addEventListener("change", handleExchange);
  selectToCurrency.addEventListener("change", handleExchange);
}

reverse.addEventListener("click", () => {
  const tempIndex = selectFromCurrency.selectedIndex;
  selectFromCurrency.selectedIndex = selectToCurrency.selectedIndex;
  selectToCurrency.selectedIndex = tempIndex;
});

function handleExchange() {
  const amount = Number(inputAmount.value.trim());
  const fromCurrency = selectFromCurrency.value;
  const toCurrency = selectToCurrency.value;

  if (!amount) {
    inputResult.value = "";
    return;
  }

  currencyConverter.exchange(amount, fromCurrency, toCurrency)
    .then(converted => {
      inputResult.value = converted.toFixed(3);
    })
    .catch(error => {
      console.error("Kur dönüşüm hatası:", error);
      inputResult.value = "Hata";
    });
}
