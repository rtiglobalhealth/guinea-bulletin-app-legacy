import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';


import PeriodPicker from './components/period-picker';
import Layout from './components/layout';
import HeaderBarExample from './components/header-bar';

import { App as D2UIApp, mui3theme as dhis2theme } from '@dhis2/d2-ui-core';


class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          d2: props.d2,
      };
  }

  getChildContext() {
      return { d2: this.state.d2 };
  }

  render() {
      if (!this.state.d2) {
          console.log('no');
          return null;
      }

      return (
          <D2UIApp>
              <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                  
                  <HeaderBarExample d2={this.state.d2} />
                    <Layout />

              </MuiThemeProvider>
          </D2UIApp>
      );
  }
}

App.childContextTypes = {
  d2: PropTypes.object,
};

App.propTypes = {
  d2: PropTypes.object.isRequired,
};
export default App;

