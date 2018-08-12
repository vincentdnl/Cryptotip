import React, {Component} from "react";
import Copy from "../media/copy-regular.svg";
import Link from "../media/external-link-alt-solid.svg";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class BitcoinAddress extends Component {
    state = {
        copied: false
    };

    afterCopy = () => {
        this.setState({copied: true}, () => {
            setTimeout(
                () => this.setState({copied: false}), 1000
            )
        })
    };

    render() {
        return <div className="bitcoin-address" style={{display: this.props.display ? "block" : "none"}}>
            <p>Use the link or copy the payment uri to your wallet</p>
            <div className="address-bar">
                <input type="text" value={this.props.lastValidPaymentUri} readOnly={true}/>
                <div className="copied" style={{display: this.state.copied ? "block" : "none"}}>Copied</div>
                <div className="actions">
                    <CopyToClipboard text={this.props.lastValidPaymentUri} onCopy={this.afterCopy}>
                        <Copy className="icon copy" width={25} height={25}/>
                    </CopyToClipboard>
                    <a href={this.props.lastValidPaymentUri} target="_blank">
                        <Link className="icon link" width={25} height={25}/>
                    </a>
                </div>
            </div>
        </div>;
    }
}

export default BitcoinAddress;
