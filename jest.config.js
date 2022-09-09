module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["."],
    transform: { "\\.ts$": ["ts-jest"] },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    globals: {
        "ts-jest": {
            tsConfig: {
                allowJs: true,
            },
        },
    },
};
