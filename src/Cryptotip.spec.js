import React from 'react';
import {shallow} from "enzyme";
import Cryptotip from "./Cryptotip";
import DonationModal from "./components/DonationModal";
import DonationButton from "./components/DonationButton";

describe("<Cryptotip />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Cryptotip/>);
    });

    it('should contain a div', () => {
        expect(wrapper.find('div')).toHaveLength(1)
    });

    it('should contain a DonationButton', () => {
        expect(wrapper.find(DonationButton)).toHaveLength(1)
    });

    it('should contain a DonationModal', () => {
        expect(wrapper.containsMatchingElement(<DonationModal/>)).toEqual(true);
    });

    it('should have modalDisplayed state to false by default', () => {
        expect(wrapper.state().modalDisplayed).toEqual(false)
    });

    it('should change modalDisplayed state to true when handleDonateButtonClick is called', () => {
        wrapper.instance().handleDonateButtonClick();
        expect(wrapper.state().modalDisplayed).toEqual(true)
    });

    it('should change modalDisplayed state to false when handleCloseModal is called', () => {
        wrapper.setState({modalDisplayed: true});
        wrapper.instance().handleCloseModal();
        expect(wrapper.state().modalDisplayed).toEqual(false)
    });
});
