import React ,{ Component }from 'react'
import logoImg from "./resources/logo.png"
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../src/actions/authActions";
import classnames from "classnames";


class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
    onChange = e => {
      console.log(e.target.value);
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
    
        this.props.registerUser(newUser, this.props.history);
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
                <h3>Sign Up</h3>
                <form noValidate onSubmit={this.onSubmit} className="items-start">
                    <input 
                        onChange={this.onChange}
                        value={this.state.name}
                        type="text" 
                        id="name" 
                        placeholder="Username"
                        className={classnames("full-width main-text", {
                            invalid: errors.name
                          })}
                    />
                    <span className="red-text">{errors.name}</span>
                    <br/>
                    <input 
                        onChange={this.onChange}
                        value={this.state.email}
                        type="text" 
                        id="email"  
                        placeholder="Email"
                        className={classnames("full-width main-text", {
                            invalid: errors.email
                          })}
                    />
                    <span className="red-text">{errors.email}</span>
                    <br/>
                    <input 
                        onChange={this.onChange}
                        value={this.state.password}
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        className={classnames("full-width main-text", {
                            invalid: errors.password
                          })}
                    />
                    <span className="red-text">{errors.password}</span>
                    <br/>
                    <input 
                        onChange={this.onChange}
                        value={this.state.password2}
                        type="password" 
                        id="password2" 
                        placeholder="Confirm Password" 
                        className={classnames("full-width main-text", {
                            invalid: errors.password2
                          })}
                    />
                    <span className="red-text">{errors.password2}</span>
                    <br/>
                    <button 
                        className="self-center main-text cursor-pointer"
                        type="submit">
                        Register
                    </button>
                    <br/>
                    <br/>
                    <p 
                        className="self-center sub-text">
                        Already a member? <Link to="/" className="cursor-pointer hoverable">Log In</Link>
                    </p>
                </form>
            </div>
        )
    }
}

SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(SignUp));
