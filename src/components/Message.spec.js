import React from 'react';
import {shallow} from "enzyme";
import Message from "./Message";

describe("Message", () => {
    let wrapper;
    let handleMessageChange = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<Message handleMessageChange={handleMessageChange}/>);
        handleMessageChange.mockReset();
    });

    it('should contain a div with class message', () => {
        expect(wrapper.find('div').first().hasClass('message')).toBe(true);
    });

    it('should trigger handleMessageChange callback on message change', () => {
        wrapper.find('input[name="message"]').simulate("change", {target: {value: 'Cheers!'}});
        expect(handleMessageChange.mock.calls.length).toBe(1);
    });
});
