import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import log from 'loglevel';
import App from './App';


import { init, config, getUserSettings, getManifest } from 'd2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appTheme from './theme';

import './styles.scss';
 
getManifest('manifest.webapp')
    .then((manifest) => {
        const baseUrl = manifest.getBaseUrl();
        config.baseUrl = `${baseUrl}/api/26`;
        log.info(`Loading: ${manifest.name} v${manifest.version}`);
        log.info(`Built ${manifest.manifest_generated_at}`);
    })
    .then(getUserSettings)
    .then(init)
    .then((d2) => {
        // App init
        log.info('D2 initialized', d2);
        window.d2 = d2;

        ReactDOM.render(
            <MuiThemeProvider muiTheme={appTheme}><App d2={d2} /></MuiThemeProvider>,
            document.getElementById('app'),
        );
    });