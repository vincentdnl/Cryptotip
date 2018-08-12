import * as PropTypes from "prop-types";
import React from "react";

export const buttonClass = (cssClasses, display) => cssClasses + (display ? " active" : "");

const PaymentOptions = ({handleQrCodeOptionClick, handlePaymentUriOptionClick, displayQrCode, displayPaymentUri}) => {
    return <div className="payment-options">
        <button className={buttonClass("qr-code", displayQrCode)} onClick={handleQrCodeOptionClick}>QR Code</button>
        <button className={buttonClass("payment-uri", displayPaymentUri)} onClick={handlePaymentUriOptionClick}>Payment URI</button>
    </div>;
};

PaymentOptions.propTypes = {
    handleQrCodeOptionClick: PropTypes.func,
    handlePaymentUriOptionClick: PropTypes.func
};

export default PaymentOptions;
