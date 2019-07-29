import React ,{ Component }from 'react'
import logoImg from "./resources/logo.png"
import './Logo.css'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../src/actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
    const userData = {
          email: this.state.email,
          password: this.state.password
        };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      };
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    render() {
        const { errors } = this.state;
        return (
            <div className="content-container main-text">
                <img 
                    src={logoImg}
                    alt="logo"
                    className="logo-img"
                />
                <h3>Log In</h3>
                <form noValidate onSubmit={this.onSubmit} className="items-start">
                    <input 
                        onChange={this.onChange}
                        value={this.state.email}
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Email" 
                        className={classnames("full-width main-text", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                    />
                    <span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                    </span>
                    <br/>
                    <input 
                        onChange={this.onChange}
                        value={this.state.password}
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        className={classnames("full-width main-text", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                    />
                    <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                    </span>
                    <Link
                        to="/forgotten"
                        className="self-end sub-text cursor-pointer hoverable">
                        <p>Forgot Password?</p>
                    </Link>
                    <button 
                        className="self-center main-text cursor-pointer"
                        type="submit">
                        Login
                    </button>
                    <br/>
                    <br/>
                    <p 
                        className="self-center sub-text">
                        Not a member? <Link to="/signup" className="cursor-pointer hoverable">Sign Up</Link>
                    </p>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);