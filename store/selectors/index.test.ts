import selector from "./index";

const testState = {
    country: [{ name: "Россия", code: "RU", charCode: "RUB" }],
    currency: [
        { name: "Евро", charCode: "EUR", value: 3.45 },
        { name: "Российский рубль", charCode: "RUB", value: 2.34 },
    ],
    favourites: {
        location: "RU",
        currencies: ["RUB", "EUR"],
    },
};

describe("Selector", () => {
    test("countryList", () => {
        expect(selector.country.list(testState)).toEqual([
            { name: "Россия", code: "RU", charCode: "RUB" },
        ]);
    });
    test("currencyList", () => {
        expect(selector.currency.list(testState)).toEqual([
            { name: "Евро", charCode: "EUR", value: 3.45 },
            { name: "Российский рубль", charCode: "RUB", value: 2.34 },
        ]);
    });
    test("currenciesUsed", () => {
        expect(selector.currenciesUsed(testState)).toEqual([
            { name: "Российский рубль", charCode: "RUB", value: 2.34 },
            { name: "Российский рубль", charCode: "RUB", value: 2.34 },
            { name: "Евро", charCode: "EUR", value: 3.45 },
        ]);
    });
});
