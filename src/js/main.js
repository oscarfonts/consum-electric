import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import Consums from './components/Consums';

ReactDOM.render(
    <div>
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <div className="navbar-left"></div>
                    <div className="navbar-brand" href="#">Consum elèctric</div>
                </div>
            </div>
        </nav>
        <div className="container">
            <Consums/>
        </div>
    </div>,
    document.getElementById('app')
);
