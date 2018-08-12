import React from 'react';
import {shallow} from "enzyme";
import Header from "./Header";

describe("Header", () => {
    let wrapper;
    let handleClose = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<Header handleClose={handleClose}/>);
        handleClose.mockReset();
    });

    it('should contain a div with class header', () => {
        expect(wrapper.find('div').first().hasClass('header')).toBe(true);
    });

    it('should call the handleClose callback on close click', () => {
        wrapper.find('.close').simulate("click");
        expect(handleClose.mock.calls.length).toBe(1);
    });
});
