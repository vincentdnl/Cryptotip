import {
    amountBtcIsValid, amountEurIsValid,
    getAmountBtc,
    getAmountEur,
    keepHeightDigits,
    keepTwoDigits,
    makeBitcoinPaymentUri
} from "./domain";

test("keepTwoDigits should truncate correctly", () => {
    expect(keepTwoDigits(0.111)).toBe(0.11)
});

test("keepHeightDigits should truncate correctly", () => {
    expect(keepHeightDigits(0.111111111)).toBe(0.11111111)
});

test("getAmountEur should return the correct price", () => {
    expect(getAmountEur(0.5, 7000)).toBe(3500)
});

test("getAmountBtc should return the correct price", () => {
    expect(getAmountBtc(700, 7000)).toBe(0.1)
});

test("amountBtcIsValid for number 1. is true", () => {
    expect(amountBtcIsValid("1.")).toBe(true)
});

test("amountBtcIsValid for 'not a number' is false", () => {
    expect(amountBtcIsValid('definetly not a number')).toBe(false)
});

test("amountEurIsValid for number 1. is true", () => {
    expect(amountEurIsValid("1.")).toBe(true)
});

test("amountEurIsValid for 'not a number' is false", () => {
    expect(amountEurIsValid('not a number')).toBe(false)
});

test("makeBitcoinDonationUri should return the correct uri", () => {
    expect(makeBitcoinPaymentUri(
        "3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF",
        "0.01",
        "Keep up the good work!",
        "My donation address"
    )).toBe("bitcoin:3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF?amount=0.01&message=Keep up the good work!&label=My donation address")
});

test("makeBitcoinDonationUri without message and label should return the correct uri", () => {
    expect(makeBitcoinPaymentUri(
        "3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF",
        "0.01"
    )).toBe("bitcoin:3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF?amount=0.01")
});
