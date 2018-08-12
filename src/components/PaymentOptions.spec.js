import React from 'react';
import {shallow} from "enzyme";
import PaymentOptions, {buttonClass} from "./PaymentOptions";

describe("PaymentOptions", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<PaymentOptions/>);
    });

    it('should contain a div with class payment-options', () => {
        expect(wrapper.find('div').first().hasClass('payment-options')).toBe(true);
    });
});

describe("PaymentOptions functions", () => {
    test('qrCodeClass should return correct class', () => {
        expect(buttonClass("qr-code", true)).toBe("qr-code active");
        expect(buttonClass("payment-uri", false)).toBe("payment-uri");
    });
});
