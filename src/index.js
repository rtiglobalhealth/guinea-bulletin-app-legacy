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

        d2.i18n.translations['app_search_placeholder'] = 'recherche par nom';
        d2.i18n.translations['manage_my_apps'] = 'gestion des applications';

        d2.i18n.translations['year'] = 'Année';
        d2.i18n.translations['month'] = 'Mois';
        d2.i18n.translations['jan'] = 'janiver';
        d2.i18n.translations['feb'] = 'février';
        d2.i18n.translations['mar'] = 'mars';
        d2.i18n.translations['apr'] = 'avril';
        d2.i18n.translations['may'] = 'mai';
        d2.i18n.translations['jun'] = 'juin';
        d2.i18n.translations['jul'] = 'juillet';
        d2.i18n.translations['aug'] = 'août';
        d2.i18n.translations['sep'] = 'septembre';
        d2.i18n.translations['oct'] = 'octobre';
        d2.i18n.translations['nov'] = 'novembre';
        d2.i18n.translations['dec'] = 'décembre';


        d2.i18n.translations['settings'] = 'Settings';
        d2.i18n.translations['profile'] = 'Profile';
        d2.i18n.translations['account'] = 'Account';
        d2.i18n.translations['help'] = 'Help';
        d2.i18n.translations['about_dhis2'] = 'About DHIS2';
        d2.i18n.translations['log_out'] = 'Se déconnecter';
        

        

        ReactDOM.render(
            <MuiThemeProvider muiTheme={appTheme}><App d2={d2} /></MuiThemeProvider>,
            document.getElementById('app'),
        );
    });