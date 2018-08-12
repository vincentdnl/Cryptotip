import React from 'react';
import DonationModal from './DonationModal';
import Amount from "./Amount";
import BitcoinAddress from "./BitcoinAddress";
import QRCode from "./QrCode";
import {shallow} from "enzyme";
import PaymentOptions from "./PaymentOptions";
import Message from "./Message";
import Header from "./Header";

const payload = {
    "time": {
        "updated": "Aug 2, 2018 09:22:00 UTC",
        "updatedISO": "2018-08-02T09:22:00+00:00",
        "updateduk": "Aug 2, 2018 at 10:22 BST"
    },
    "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
    "chartName": "Bitcoin",
    "bpi": {
        "USD": {
            "code": "USD",
            "symbol": "&#36;",
            "rate": "7,634.5863",
            "description": "United States Dollar",
            "rate_float": 7634.5863
        },
        "GBP": {
            "code": "GBP",
            "symbol": "&pound;",
            "rate": "5,835.8777",
            "description": "British Pound Sterling",
            "rate_float": 5835.8777
        },
        "EUR": {
            "code": "EUR",
            "symbol": "&euro;",
            "rate": "6,569.5615",
            "description": "Euro",
            "rate_float": 6569.5615
        }
    }
};

describe("DonationModal", () => {
    let wrapper;
    let handleClose = jest.fn();

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    json: () => {
                        return payload;
                    },
                });
            });
        });

        wrapper = shallow(<DonationModal
            bitcoinAddress="3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF"
            bitcoinLabel="My donation address"
            modalTitle="Support my work with Bitcoin!"
            handleClose={handleClose}
            displayed={false}
        />);
        handleClose.mockReset();
    });

    it('should renders children correctly', () => {
        expect(wrapper.find('div').first().hasClass('modal')).toEqual(true);

        expect(wrapper.containsMatchingElement(<Header/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<Amount/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<Message/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<PaymentOptions/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<QRCode/>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<BitcoinAddress/>)).toEqual(true);
    });

    it('should have style block when displayed is true', () => {
        wrapper = shallow(<DonationModal
            bitcoinAddress="3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF"
            bitcoinLabel="My donation address"
            modalTitle="Support my work with Bitcoin!"
            handleClose={handleClose}
            displayed={true}
        />);
        expect(wrapper.prop('style')).toHaveProperty("display", "block");
    });

    it('should call the handleClose callback on modal click', () => {
        wrapper.find('#donation-modal').simulate("click");
        expect(handleClose.mock.calls.length).toBe(1);
    });

    it('should not call the handleClose callback on .modal-content click', () => {
        wrapper.find('.modal-content').simulate("click", {
            stopPropagation: () => {
            }
        });
        expect(handleClose.mock.calls.length).toBe(0);
    });

    it('should fetch bitcoin price on mount', () => {
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("https://api.coindesk.com/v1/bpi/currentprice.json");
        expect(wrapper.state().currentBtcPrice).toEqual(6569.5615);
        expect(wrapper.state().amountEur).toEqual(65.7)  // default is 0.01 BTC
    });

    it('should produce a correct payment uri', () => {
        wrapper.instance().bitcoinPaymentUri();
        expect(wrapper.state().lastValidPaymentUri).toEqual(
            "bitcoin:3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF?amount=0.01&label=My donation address"
        )
    });

    it('should update BTC and EUR amounts in state when handleAmountBtcChange is called with a number', () => {
        wrapper.setState({amountBtcIsValid: false});
        wrapper.setState({amountEurIsValid: false});
        wrapper.instance().handleAmountBtcChange("2");
        expect(wrapper.state().amountBtc).toEqual("2");
        expect(wrapper.state().amountEur).toEqual(13139.12); // 2 * floatRate
        expect(wrapper.instance().currentAmountBtcIsValid()).toEqual(true);
        expect(wrapper.instance().currentAmountEurIsValid()).toEqual(true);
    });

    it('should not update EUR amounts in state when handleAmountBtcChange is called with NaN', () => {
        wrapper.setState({amountBtcIsValid: true});
        wrapper.setState({amountEurIsValid: true});
        wrapper.instance().handleAmountBtcChange("What's a BTC?");
        expect(wrapper.state().amountBtc).toEqual("What's a BTC?");
        expect(wrapper.state().amountEur).toEqual(65.7); // Did not move from default
        expect(wrapper.instance().currentAmountBtcIsValid()).toEqual(false);
        expect(wrapper.instance().currentAmountEurIsValid()).toEqual(true);
    });

    it('should update EUR and BTC amounts in state when handleAmountBtcChange is called with a number', () => {
        wrapper.setState({amountEurIsValid: false});
        wrapper.setState({amountBtcIsValid: false});
        wrapper.instance().handleAmountEurChange("2");
        expect(wrapper.state().amountEur).toEqual("2");
        expect(wrapper.state().amountBtc).toEqual(0.00030443); // 2 / floatRate
        expect(wrapper.instance().currentAmountEurIsValid()).toEqual(true);
        expect(wrapper.instance().currentAmountBtcIsValid()).toEqual(true);
    });

    it('should update BTC amounts in state when handleAmountBtcChange is called with NaN', () => {
        wrapper.setState({amountEurIsValid: true});
        wrapper.setState({amountBtcIsValid: true});
        wrapper.instance().handleAmountEurChange("What's a EUR?");
        expect(wrapper.state().amountEur).toEqual("What's a EUR?");
        expect(wrapper.state().amountBtc).toEqual("0.01"); // Did not move from default
        expect(wrapper.instance().currentAmountEurIsValid()).toEqual(false);
        expect(wrapper.instance().currentAmountBtcIsValid()).toEqual(true);
    });

    it('should update message when handleMessageChange is called', () => {
        wrapper.instance().handleMessageChange("new message");
        expect(wrapper.state().message).toEqual("new message");
    });

    it('should NOT update lastValidPaymentUri when handleMessageChange is called with invalid amountBtc', () => {
        wrapper.setState({amountBtc: "What's a BTC?"});
        wrapper.instance().handleMessageChange("new message");
        expect(wrapper.state().lastValidPaymentUri).toEqual("bitcoin:3CahdmxRvrCiZVZLMpFchbDMVsdLyu69uF?amount=0.01&label=My donation address"); // Not changed
    });

    it('should change state of displayQrCode and displayPaymentUri when handleQrCodeOptionClick is called', () => {
        wrapper.instance().handleQrCodeOptionClick();
        expect(wrapper.state().displayQrCode).toBe(true);
        expect(wrapper.state().displayPaymentUri).toBe(false);
    });

    it('should change state of displayQrCode and displayPaymentUri when handlePaymentUriOptionClick is called', () => {
        wrapper.instance().handlePaymentUriOptionClick();
        expect(wrapper.state().displayQrCode).toBe(false);
        expect(wrapper.state().displayPaymentUri).toBe(true);
    });
});
