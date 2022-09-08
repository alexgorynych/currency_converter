import { ICurrency } from "../../models";

export const currency = {
    get: async (): Promise<ICurrency[]> => {
        try {
            const response = await fetch(
                "https://www.cbr-xml-daily.ru/daily_json.js"
            );
            const { Valute } = await response.json();
            const currencies: ICurrency[] = [];
            if (Valute)
                for (let code in Valute) {
                    const name: string = Valute[code].Name;
                    const charCode: string = Valute[code].CharCode;
                    const value: number = Number.parseFloat(
                        (Valute[code].Value / Valute[code].Nominal).toFixed(4)
                    );
                    currencies.push({
                        name: name,
                        charCode: charCode,
                        value: value,
                    });
                }
            currencies.push({
                name: "Российский рубль",
                charCode: "RUB",
                value: 1,
            });
            return currencies;
        } catch {
            return [];
        }
    },
};
