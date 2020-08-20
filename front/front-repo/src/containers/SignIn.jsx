import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { storeToken } from '../actions/authActions';
import { Button, TextField, Snackbar, Grid } from '@material-ui/core';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      flash: '',
      open: false,
    };
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, email } = this.state;
    const { history } = this.props;
    fetch('/auth/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.statusText);
      })
      .then((res) => {
        this.props.storeToken(res.token);
        this.setState({ flash: res.flash, open: true });
        history.push('/profile');
      })
      .catch((err) => this.setState({ flash: err.flash, open: true }));
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { email, password, flash, open } = this.state;
    return (
      <Grid container alignItems="center" style={{ padding: 15 }}>
        <Grid item>
          <h2>Sign In !</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              label="Email"
              placeholder="your@mail.com"
              onChange={this.updateField}
              value={email}
            />
            <TextField
              fullWidth
              required
              type="password"
              name="password"
              label="Password"
              onChange={this.updateField}
              value={password}
            />
            <Grid
              container
              item
              xs={12}
              justify="flex-end"
              style={{ padding: 20 }}
            >
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={open}
              autoHideDuration={5000}
              onClose={this.handleClose}
              message={flash}
            />
          </form>
          <Grid container item xs={12} justify="center">
            <Grid item>
              <Link to="/signup">Go to SignUp page</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeToken: (token) => dispatch(storeToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
