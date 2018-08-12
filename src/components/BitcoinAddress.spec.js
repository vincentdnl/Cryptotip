import React from 'react';
import {shallow} from "enzyme";
import BitcoinAddress from "./BitcoinAddress";

jest.useFakeTimers();

describe("BitcoinAddress", () => {
    let wrapper;
    let bitcoinPaymentUri = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<BitcoinAddress bitcoinPaymentUri={bitcoinPaymentUri}/>);
        bitcoinPaymentUri.mockReset();
    });

    it('should contain a div with class bitcoin-address', () => {
        expect(wrapper.find('div').first().hasClass('bitcoin-address')).toBe(true);
    });

    it('should go to state copied false after afterCopy is called', () => {
        wrapper.setState({copied: true});
        jest.runAllTimers();
        wrapper.instance().afterCopy();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        expect(wrapper.state().copied).toBe(false);
    });

    it('should display if display props is true', () => {
        wrapper.setProps({display: true});
        expect(wrapper.find(".bitcoin-address").prop("style")).toEqual({ display: 'block' })
    });

    it('should not display if display props is false', () => {
        wrapper.setProps({display: false});
        expect(wrapper.find(".bitcoin-address").prop("style")).toEqual({ display: 'none' })
    });
});
