import React from 'react';
import { Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: 'homer.simpson@wildcodeschool.fr',
        name: 'Homer',
        lastname: 'Simpson',
      },
    };
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

export default Profile;
