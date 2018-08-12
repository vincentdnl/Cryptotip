import React, {Component} from 'react';
import DonationModal from "./components/DonationModal";
import "./Cryptotip.css";
import DonationButton from "./components/DonationButton";

class Cryptotip extends Component {
    state = {
        modalDisplayed: false
    };

    handleDonateButtonClick = () => {
        this.setState({
            modalDisplayed: true
        })
    };

    handleCloseModal = () => {
        this.setState({
            modalDisplayed: false
        })
    };

    render() {
        return <div>
            <DonationButton
                handleDonateButtonClick={this.handleDonateButtonClick}/>
            <DonationModal
                bitcoinAddress={this.props.bitcoinAddress}
                bitcoinLabel={this.props.bitcoinLabel}
                modalTitle={this.props.modalTitle}
                handleClose={this.handleCloseModal}
                displayed={this.state.modalDisplayed}/>
        </div>;
    }
}

export default Cryptotip;
