export const ipwhois = {
    getLocation: async (ip: string): Promise<string> => {
        try {
            const response = await fetch(`http://ipwho.is/${ip}`);
            const { country_code } = await response.json();
            return country_code as string;
        } catch {
            return "";
        }
    },
};
