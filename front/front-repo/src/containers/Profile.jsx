import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';

import { storeUser } from '../actions/userActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: '',
        name: '',
        lastname: '',
      },
    };
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    fetch('/profile', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.statusText);
      })
      .then((res) => {
        this.props.storeUser(res);
        this.setState({
          profile: {
            email: res.email,
            name: res.name,
            lastname: res.lastname,
          },
        });
      })
      .catch();
  }

  render() {
    const {
      profile: { email, name, lastname },
    } = this.state;
    return (
      <Grid container alignItems="center" style={{ padding: 15 }}>
        <Grid item>
          <List>
            <ListItem>
              <ListItemText primary={email} />
            </ListItem>
            <ListItem>
              <ListItemText primary={name} />
            </ListItem>
            <ListItem>
              <ListItemText primary={lastname} />
            </ListItem>
          </List>
          <Grid
            container
            item
            xs={12}
            justify="flex-end"
            style={{ padding: 20 }}
          >
            <Grid item>
              <Button variant="contained" color="primary" type="button">
                <Link to="/signin">Logout</Link>
              </Button>
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
    user: state.user.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => dispatch(storeUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
