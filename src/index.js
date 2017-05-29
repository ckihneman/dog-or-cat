import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
