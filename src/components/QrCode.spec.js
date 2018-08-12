import React from 'react';
import {shallow} from "enzyme";
import QrCode from "./QrCode";

describe("QrCode", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<QrCode/>);
    });

    it('should contain a div with class qrcode', () => {
        expect(wrapper.find('div').first().hasClass('qrcode')).toBe(true);
    });

    it('should display if display props is true', () => {
        wrapper.setProps({display: true});
        expect(wrapper.find(".qrcode").prop("style")).toEqual({ display: 'block' })
    });

    it('should not display if display props is false', () => {
        wrapper.setProps({display: false});
        expect(wrapper.find(".qrcode").prop("style")).toEqual({ display: 'none' })
    });
});
