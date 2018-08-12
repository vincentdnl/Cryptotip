import BitcoinLogo from "../media/bitcoin-logo.svg";
import * as PropTypes from "prop-types";
import React from "react";

const DonationButton = (props) =>
    <button className="donation-button" onClick={props.handleDonateButtonClick}>
        <BitcoinLogo className="bitcoin-logo" width={25} height={25}/>
        <p className="donate-text">Donate Bitcoin</p>
    </button>;

DonationButton.propTypes = {handleDonateButtonClick: PropTypes.func};

export default DonationButton;
