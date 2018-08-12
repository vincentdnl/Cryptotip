import React from "react";

export const isValidClassName = (isValid) => isValid ? '' : ' invalid';

const Amount = ({amountBtc, amountBtcIsValid, handleAmountBtcChange, amountEur, amountEurIsValid, handleAmountEurChange}) =>
    <div className="amount">
        <div className="currency btc">
            <label htmlFor="amount-btc">Amount BTC</label>
            <input
                type="text"
                className={isValidClassName(amountBtcIsValid())}
                name="amount-btc"
                value={amountBtc}
                onChange={(event) => handleAmountBtcChange(event.target.value)}
            />
            <div className={isValidClassName(amountBtcIsValid())}>BTC</div>
        </div>
        <div className="separator"> =</div>
        <div className="currency eur">
            <label htmlFor="amount-eur">Amount EUR</label>
            <input
                type="text"
                className={isValidClassName(amountEurIsValid())}
                name="amount-eur"
                value={amountEur}
                onChange={(event) => handleAmountEurChange(event.target.value)}
            />
            <div className={isValidClassName(amountEurIsValid())}>EUR</div>
        </div>
    </div>;


export default Amount;
