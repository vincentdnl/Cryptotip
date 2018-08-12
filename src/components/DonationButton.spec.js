import React from 'react';
import {shallow} from "enzyme";
import DonationButton from "./DonationButton";

describe("DonationButton", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<DonationButton/>);
    });

    it('should contain a button', () => {
        expect(wrapper.find('button')).toHaveLength(1)
    });
});
