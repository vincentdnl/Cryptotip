import React, {Component} from "react";
import Header from "./Header";
import Amount from "./Amount";
import Message from "./Message";
import BitcoinAddress from "./BitcoinAddress";
import {
    amountBtcIsValid,
    amountEurIsValid,
    getAmountBtc,
    getAmountEur,
    keepHeightDigits,
    keepTwoDigits,
    makeBitcoinPaymentUri
} from "../domain";
import PaymentOptions from "./PaymentOptions";
import QrCode from "./QrCode";

class DonationModal extends Component {
    state = {
        amountBtc: "0.01",
        amountEur: "",
        currentBtcPrice: null,
        message: "",
        lastValidPaymentUri: "",
        displayQrCode: true,
        displayPaymentUri: false,
    };

    componentDidMount = () => {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(response => response.json())
            .then(result => {
                const rateFloat = result.bpi.EUR.rate_float;
                const amountEur = getAmountEur(this.state.amountBtc, rateFloat);
                const roundedAmountEur = keepTwoDigits(amountEur);
                this.setState({
                    currentBtcPrice: rateFloat,
                    amountEur: roundedAmountEur,
                }, () => {
                    this.bitcoinPaymentUri();
                });
            });
    };

    bitcoinPaymentUri = () => {
        this.setState({
            lastValidPaymentUri: makeBitcoinPaymentUri(
                this.props.bitcoinAddress,
                this.state.amountBtc,
                this.state.message,
                this.props.bitcoinLabel
            )
        })
    };

    currentAmountBtcIsValid = () => amountBtcIsValid(this.state.amountBtc);

    currentAmountEurIsValid = () => amountEurIsValid(this.state.amountEur);

    handleAmountBtcChange = (amountBtc) => {
        this.setState(
            {
                amountBtc: amountBtc,
            },
            () => {
                if (amountBtcIsValid(amountBtc)) {
                    const amountEur = getAmountEur(amountBtc, this.state.currentBtcPrice);
                    const roundedAmountEur = keepTwoDigits(amountEur);
                    this.setState({
                        amountEur: roundedAmountEur
                    }, () => {
                        this.bitcoinPaymentUri();
                    });
                }
            }
        );
    };

    handleAmountEurChange = (amountEur) => {
        this.setState(
            {
                amountEur: amountEur
            },
            () => {
                if (amountEurIsValid(amountEur)) {
                    const amountBtc = getAmountBtc(amountEur, this.state.currentBtcPrice);
                    const roundedAmountBtc = keepHeightDigits(amountBtc);
                    this.setState({
                        amountBtc: roundedAmountBtc,
                    }, () => {
                        this.bitcoinPaymentUri();
                    });
                }
            });
    };

    handleMessageChange = (newMessage) => {
        this.setState({message: newMessage}, () => {
            if (this.currentAmountBtcIsValid()) {
                this.bitcoinPaymentUri();
            }
        });
    };

    handleQrCodeOptionClick = () => {
        this.setState({
            displayQrCode: true,
            displayPaymentUri: false
        })
    };

    handlePaymentUriOptionClick = () => {
        this.setState({
            displayQrCode: false,
            displayPaymentUri: true
        })
    };

    render() {
        return <div id="donation-modal" onClick={this.props.handleClose} className="modal"
                    style={{display: this.props.displayed ? "block" : "none"}}>
            <div className="modal-content" onClick={event => event.stopPropagation()}>
                <Header
                    title={this.props.modalTitle}
                    handleClose={this.props.handleClose}
                />

                <form>
                    <Amount
                        amountBtc={this.state.amountBtc}
                        amountBtcIsValid={this.currentAmountBtcIsValid}
                        amountEur={this.state.amountEur}
                        amountEurIsValid={this.currentAmountEurIsValid}
                        handleAmountBtcChange={this.handleAmountBtcChange}
                        handleAmountEurChange={this.handleAmountEurChange}
                    />
                    <Message message={this.state.message} handleMessageChange={this.handleMessageChange}/>
                </form>

                <PaymentOptions handleQrCodeOptionClick={this.handleQrCodeOptionClick}
                                handlePaymentUriOptionClick={this.handlePaymentUriOptionClick}
                                displayQrCode={this.state.displayQrCode}
                                displayPaymentUri={this.state.displayPaymentUri}/>

                <QrCode display={this.state.displayQrCode} lastValidPaymentUri={this.state.lastValidPaymentUri}/>

                <BitcoinAddress
                    display={this.state.displayPaymentUri}
                    lastValidPaymentUri={this.state.lastValidPaymentUri}
                    bitcoinAddress={this.props.bitcoinAddress}/>
            </div>
        </div>;
    }
}

export default DonationModal;
