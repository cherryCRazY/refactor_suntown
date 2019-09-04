import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../../actions/authActions";
import "../../Styles/Admin.css";
import logo from "../../media/logo.png";

const login = authActions.login;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                login_username: "",
                login_password: ""
            },
            showPassword: false,
            error: "",
            redirectToRef: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.errorMessage) {
            this.setState({
                ...this.state,
                error: nextProps.auth.errorMessage.message
            });
        } else if (nextProps.auth.isAuthenticated) {
            this.setState({ redirectToRef: true });
        }
    }

    onSubmit = () => {
        const {
            login_username: username,
            login_password: password
        } = this.state.userData;
        this.props.login({ username, password });
    };

    showPassword = e => {
        e.preventDefault();
        this.setState({ password: !this.state.password });
    };

    onChange = e => {
        this.setState({
            ...this.state,
            userData: {
                ...this.state.userData,
                [e.target.id]: e.target.value
            }
        });
    };

    render() {
        if (this.state.redirectToRef) {
            return <Redirect to="/admin" />;
        }
        return (
            <div className="admin_login">
                <form>
                    {this.state.error && <h1>{this.state.error}</h1>}
                    <div className="admin_login_logo_box">
                        <img src={logo} />
                    </div>
                    <input
                        type="text"
                        id="login_username"
                        value={this.state.userData.login_username}
                        onChange={this.onChange}
                    />
                    <input
                        type={!this.state.password ? "password" : "text"}
                        id="login_password"
                        value={this.state.userData.login_password}
                        onChange={this.onChange}
                    />
                    <button
                        className="admin_login_action_button admin_login_show_pass"
                        onClick={this.showPassword}
                    >
                        Show Password
                    </button>
                </form>
                <button
                    className="admin_login_action_button admin_login_button"
                    onClick={this.onSubmit}
                >
                    Login
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
