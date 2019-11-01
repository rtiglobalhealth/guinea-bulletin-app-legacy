import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';

import BulletinDownloader from './components/BulletinDownloader';
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
          console.log('no d2');
          return null;
      }

      // for fun, print all users to the console log, probably doens't need to stay
      this.state.d2.models.user.list().then(userCollection => {
            userCollection.forEach(user => console.log(user.name));
      });
      
      return (
          <D2UIApp>
              <MuiThemeProvider theme={createMuiTheme(dhis2theme)}>
                  <HeaderBarExample d2={this.state.d2} />
                    <BulletinDownloader d2={this.state.d2} />
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

