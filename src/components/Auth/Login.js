import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "./../../actions/auth_actions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Spinner from "./../Loader/Spinner";
import { Button, Row, Col, Container, InputGroup, InputGroupAddon} from 'reactstrap';
import Brand from "./../../assets/img/wyfae_main logo.svg";
import './Auth.css';

class Login extends Component {
  constructor(props) {
    super();
    this.getData = this.getData.bind(this);
  }

  state = { errors: {}, loading: false };

  getData(formData) {
    this.setState(
      {
        loading: true
      },
      () => {
        setTimeout(() => {
          this.props.loginUser(formData, this.props.history);
        }, 500);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors && nextProps.errors.msg) {
      this.setState({
        errors: nextProps.errors,
        loading: false
      });
    }
  }

  render() {
    const { isAuthenticated: isAuth } = this.props.auth;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    const { handleSubmit } = this.props;
    const { errors } = this.state;

    return (
      <div class="login-page-holder">
        <Container style={{ minWidth: "90% !important" }}>
          <Row>
            <Col md="7" style={{ background: "white" }}>
              <div className="left-side">
                <div className="brand-holder">
                  <img src={Brand} alt="Wyfae Brand" style={{width: '140px'}} />
                </div>
                <div className="signin-form">
                  <h1 className="font-weight-bold">Sign in to Wyfae</h1>
                  <form onSubmit={handleSubmit(this.getData)}>
                    {errors.msg && (
                      <div className="alert alert-danger"> {errors.msg} </div>
                    )}
                    <div className="form-group">
                    <InputGroup className="ip-group">
                      <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                      <Field
                        component="input"
                        type="text"
                        name="username"
                        className={classnames("form-control", {
                          "is-invalid": errors.email
                        })}
                        id="username"
                        placeholder="Username"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback"> {errors.email} </div>
                      )}
                    </InputGroup>
                      
                    </div>
                    <div className="form-group">
                    <InputGroup className="ip-group">
                      <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                      <Field
                        component="input"
                        type="password"
                        name="password"
                        className={classnames("form-control", {
                          "is-invalid": errors.password
                        })}
                        id="password"
                        placeholder="Enter Password"
                        required
                      />
                      {errors.password && (
                        <div className="invalid-feedback"> {errors.password} </div>
                      )}
                    </InputGroup>
                    </div>
                    <div className="text-right pt-2" style={{paddingRight: '100px'}}>
                      <NavLink to="forgot" style={{color: "#4881EC", fontSize: '12px'}}>
                        Forgot password?
                      </NavLink>
                    </div>
                    <div className="loader-holder">
                      <Button
                        type="submit"
                        disabled={this.state.loading}
                      >
                        {this.state.loading ? <Spinner /> : "Login"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
            <Col md="5" style={{ background: "#4881EC" }}>
              <div className="right-side">
                <div className="navigation">
                  <ul>
                    <li><NavLink to="/trending">Trending</NavLink></li>
                    <li><NavLink to="/trending">Competetions</NavLink></li>
                    <li><NavLink to="/trending">Trending Weekly</NavLink></li>
                  </ul>
                </div>
                <div className="signup">
                  <h1 className="font-weight-bold">New Here?</h1>
                  <p>You can create a new account and start posting your experiences.</p>
                  <NavLink className="btn" to="/register">Sign up</NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.object,
  loginUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.errors,
    auth: state.auth
  };
}

export default reduxForm({
  form: "login"
})(
  connect(
    mapStateToProps,
    { loginUser }
  )(withRouter(Login))
);
