import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';

import ProductList from './containers/ProductList';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ProductList />, document.getElementById('root'));
registerServiceWorker();
