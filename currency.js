class CurrencyConverter {
    constructor() {
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_fyyOVIz4A8nXJGedNfRyvOgSRHn3BiaENMBQqmt6&base_currency=";
    }

    async exchange(amount, fromCurrency, toCurrency) {
        const response = await fetch(`${this.url}${fromCurrency}`);
        const result = await response.json();
        const convertedAmount = amount * result.data[toCurrency];
        return convertedAmount;
    }
}
