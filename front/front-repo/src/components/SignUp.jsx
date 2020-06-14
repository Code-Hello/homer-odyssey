import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }

  updateEmailField(event) {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <h1>{email}</h1>
        <input
          type="email"
          name="email"
          onChange={this.updateEmailField}
          value={email}
        />
      </div>
    );
  }
}

export default SignUp;
