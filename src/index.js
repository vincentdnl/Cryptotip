import React from 'react';
import ReactDOM from 'react-dom';
import Cryptotip from './Cryptotip';
import registerServiceWorker from './registerServiceWorker';

let container = document.getElementById('cryptotip');
ReactDOM.render(<Cryptotip
    bitcoinAddress={container.dataset.bitcoinAddress}
    bitcoinLabel={container.dataset.bitcoinLabel}
    modalTitle={container.dataset.modalTitle}
/>, container);
registerServiceWorker();
