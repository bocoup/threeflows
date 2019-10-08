import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Item } from 'semantic-ui-react';

import { logIn, logOut } from '@client/actions';

const mapDispatchToProps = {
    logIn,
    logOut
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            loginError: '',
            buttonText: 'Login',
            username: '',
            usernameInput: '',
            passwordInput: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleChange(event) {
        this.setState({ [`${event.target.name}Input`]: event.target.value });
    }

    handleSubmit(event) {}

    handleSignUp() {}

    async handleLogIn() {
        const data = JSON.stringify({ username: this.state.usernameInput });
        const loginResponse = await (await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })).json();
        const username = loginResponse.username;
        this.props.logIn(username);

        if (loginResponse.error) {
            this.setState({ loginError: loginResponse.message });
            this.props.logOut('');
        } else {
            this.setState({ loginError: '' });
            this.props.logIn(username);
        }
    }

    async handleLogOut() {
        const logoutResponse = await fetch('/api/auth/logout', {
            method: 'POST'
        });
        const username = '';

        if (!logoutResponse.error) {
            this.props.logOut(username);
        }
    }

    render() {
        return (
            <Form className="login__form">
                <Form.Field>
                    <label htmlFor="name">Username</label>
                    <input
                        name="username"
                        onChange={event => this.handleChange(event)}
                        value={this.state.usernameInput}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={event => this.handleChange(event)}
                        value={this.state.passwordInput}
                    />
                </Form.Field>
                <Grid columns={2}>
                    <Grid.Column>
                        <Item>
                            <Item.Extra>
                                <Button
                                    type="submit"
                                    primary
                                    size="large"
                                    onClick={this.handleSubmit()}
                                >
                                    {this.state.buttonText}
                                </Button>
                            </Item.Extra>
                            <Item.Extra className="login__form--create-link">
                                <Link to="/login/new">Create an account</Link>
                            </Item.Extra>
                        </Item>
                    </Grid.Column>
                    <Grid.Column>{this.state.loginError}</Grid.Column>
                </Grid>
            </Form>
        );
    }
}

Login.propTypes = {
    logIn: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string
};

function mapStateToProps(state) {
    const { isLoggedIn, username } = state.login;
    return { isLoggedIn, username };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
