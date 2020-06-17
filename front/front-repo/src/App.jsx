import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import './App.css';

import SignUp from './components/SignUp';

function App() {
  return (
    <MuiThemeProvider>
      <Grid container alignItems="center" style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Paper elevation={4} style={{ margin: 32 }}>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={6} style={{ 'text-align': 'center' }}>
                <img
                  src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
                  alt="Homer Simpson"
                />
              </Grid>
              <Grid item xs={12} sm={6} alignContent="center">
                <SignUp />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
