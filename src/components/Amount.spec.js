import React from 'react';
import {shallow} from "enzyme";
import Amount, {isValidClassName} from "./Amount";

describe("Amount", () => {
    let wrapper;
    let handleAmountBtcChange = jest.fn();
    let amountBtcIsValid = jest.fn();
    let handleAmountEurChange = jest.fn();
    let amountEurIsValid = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<Amount
            handleAmountBtcChange={handleAmountBtcChange}
            amountBtcIsValid={amountBtcIsValid}
            handleAmountEurChange={handleAmountEurChange}
            amountEurIsValid={amountEurIsValid}
        />);
        handleAmountBtcChange.mockReset();
        handleAmountEurChange.mockReset();
    });

    it('should contain divs with specific classes', () => {
        expect(wrapper.find('.currency.btc')).toHaveLength(1);
        expect(wrapper.find('.currency.eur')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(2);
    });

    it('should trigger handleAmountBtcChange callback on amountBtc change', () => {
        wrapper.find('input[name="amount-btc"]').simulate("change", {target: {value: '2'}});
        expect(handleAmountBtcChange.mock.calls.length).toBe(1);
        expect(handleAmountBtcChange.mock.calls[0][0]).toBe("2");
    });

    it('should trigger handleAmountEurChange callback on amountEur change', () => {
        wrapper.find('input[name="amount-eur"]').simulate("change", {target: {value: '2'}});
        expect(handleAmountEurChange.mock.calls.length).toBe(1);
        expect(handleAmountEurChange.mock.calls[0][0]).toBe("2");
    });
});

describe("Amount methods", () => {
    test('isValidClassName(true) should return correct css prop', () => {
        expect(isValidClassName(true)).toBe('')
    });

    test('isValidClassName(false) should return correct css prop', () => {
        expect(isValidClassName(false)).toBe(' invalid')
    });
});
