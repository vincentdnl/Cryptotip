import QRCode from "qrcode.react";
import * as PropTypes from "prop-types";
import React from "react";

const QrCode = (props) => {
    return <div className="qrcode" style={{display: props.display ? "block" : "none"}}>
        <p>Scan the QR code with your wallet application</p>
        <div className="qrcode-image">
            <QRCode
                value={props.lastValidPaymentUri}
                size={256}
                bgColor={"#fff"}
                fgColor={"#000"}
            />
        </div>
    </div>;
};

QrCode.propTypes = {
    displayQrCode: PropTypes.bool,
    lastValidPaymentUri: PropTypes.string
};

export default QrCode;
