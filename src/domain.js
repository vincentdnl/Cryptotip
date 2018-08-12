export const keepTwoDigits = (number) => Math.round(100 * number) / 100;

export const keepHeightDigits = (number) => Math.round(100000000 * number) / 100000000;

export const getAmountEur = (amountBtc, currentBtcPrice) => Number(amountBtc) * Number(currentBtcPrice);

export const getAmountBtc = (amountEur, currentBtcPrice) => Number(amountEur) / Number(currentBtcPrice);

export const amountBtcIsValid = (amountBtc) => {
    if (!isNaN(amountBtc)) {
        if (String(amountBtc).includes(".")) {
            return String(amountBtc).split(".")[1].length <= 8;
        } else {
            return true
        }
    } else {
        return false
    }
};

export const amountEurIsValid = (amountEur) => {
    if (!isNaN(amountEur)) {
        if (String(amountEur).includes(".")) {
            return String(amountEur).split(".")[1].length <= 2;
        } else {
            return true
        }
    } else {
        return false
    }
};

export const makeBitcoinPaymentUri = (bitcoinAddress, amountBtc, message, bitcoinLabel) => {
    let bpu = `bitcoin:${bitcoinAddress}?amount=${amountBtc}`;
    if (message) {
        bpu += `&message=${message}`
    }
    if (bitcoinLabel) {
        bpu += `&label=${bitcoinLabel}`
    }
    return bpu
};
