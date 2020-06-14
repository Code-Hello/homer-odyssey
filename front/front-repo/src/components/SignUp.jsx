import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordbis: '',
      name: '',
      lastname: '',
    };
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const { email, password, passwordbis, name, lastname } = this.state;
    return (
      <div>
        <h1>{JSON.stringify(this.state, 1, 1)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={this.updateField}
            value={email}
          />
          <input
            type="password"
            name="password"
            onChange={this.updateField}
            value={password}
          />
          <input
            type="password"
            name="passwordbis"
            onChange={this.updateField}
            value={passwordbis}
          />
          <input
            type="text"
            name="name"
            onChange={this.updateField}
            value={name}
          />
          <input
            type="text"
            name="lastname"
            onChange={this.updateField}
            value={lastname}
          />
          <input type="submit" value="Soumettre" />
        </form>
      </div>
    );
  }
}

export default SignUp;
