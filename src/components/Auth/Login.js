import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './../../actions/auth_actions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import { Button, Row, Col, Container, InputGroup, InputGroupAddon } from 'reactstrap';
import Brand from './../../assets/img/newlogo.svg';
import LockPNG from './../../assets/img/locked@3x.png';
import MailPNG from './../../assets/img/mail@3x.png';
import './Auth.css';
import anime from 'animejs/lib/anime.es.js';
import RectanglePNG from './../../assets/img/Rectangle 50@3x.png';
import GroupPNG from './../../assets/img/Group 124@3x.png';
import Group2PNG from './../../assets/img/Group 122@3x.png';
import PathPNG from './../../assets/img/Path 186@3x.png';
import MaskPNG from './../../assets/img/Mask Group 1@3x.png';
import Mask2PNG from './../../assets/img/Mask Group 2@3x.png';
import Mask3PNG from './../../assets/img/Mask Group 3@3x.png';
import Path2PNG from './../../assets/img/Path 184@3x.png';

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

	componentDidMount() {
		var randomMovement = function() {
			return anime.random(0, 10) + 'rem';
		};

		anime({
			targets: '#first',
			loop: true,
			scale: 0.1,
			easing: 'linear',
			duration: 3000,
			direction: 'alternate',
			rotate: [ { value: 0 }, { value: 180 }, { value: 0 } ]
		});

		anime({
			targets: '#second',
			loop: true,
			duration: 3000,
			easing: 'linear',
			direction: 'alternate',
			translateX: [ { value: randomMovement }, { value: randomMovement }, { value: randomMovement } ],
			translateY: [ { value: randomMovement }, { value: randomMovement }, { value: randomMovement } ]
		});

		anime({
			targets: '#third',
			loop: true,
			scale: 0.1,
			easing: 'linear',
			duration: 3000,
			direction: 'alternate',
			rotate: [ { value: 0 }, { value: 180 }, { value: 0 } ]
		});

		anime({
			targets: '#seventh',
			loop: true,
			scale: 0.1,
			easing: 'linear',
			duration: 3000,
			direction: 'alternate',
			rotate: [ { value: 0 }, { value: 180 }, { value: 0 } ]
		});
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
				<Container style={{ minWidth: '90% !important' }}>
					<Row>
						<Col md="7" style={{ background: 'white' }}>
							<div className="left-side">
								<div className="animation ">
									<img id="firstM" className="floating-blob d-block d-md-none" src={RectanglePNG} />
									<img id="first" className="floating-blob d-none d-md-block" src={RectanglePNG} />
									<img id="secondM" className="floating-blob d-block d-md-none" src={GroupPNG} />
									<img id="second" className="floating-blob d-none d-md-block" src={GroupPNG} />
									<img id="third" className="floating-blob d-none d-md-block" src={Path2PNG} />
									<img id="fourth" className="floating-blob d-none d-md-block" src={Group2PNG} />
									<img id="fifth" className="floating-blob d-none d-md-block" src={Mask2PNG} />
									<img id="sixth" className="floating-blob d-none d-md-block" src={Mask3PNG} />
									<img id="seventhM" className="floating-blob d-block d-md-none" src={PathPNG} />
									<img id="seventh" className="floating-blob d-none d-md-block" src={PathPNG} />
									<img id="eighth" className="floating-blob d-none d-md-block" src={MaskPNG} />
								</div>

								<div className="brand-holder">
									<img src={Brand} alt="Wyfae Brand" style={{ width: '80px' }} />
								</div>
								<div className="signin-form">
									<h1 className="font-weight-bold">Sign in to Wyfae</h1>
									<form onSubmit={handleSubmit(this.getData)}>
										{errors.msg && <div className="alert alert-danger"> {errors.msg} </div>}
										<div className="form-group">
											<InputGroup className="ip-group">
												<InputGroupAddon addonType="prepend">
													<img style={{ objectFit: 'contain' }} src={MailPNG} />
												</InputGroupAddon>
												<Field
													component="input"
													type="text"
													name="username"
													className={classnames('form-control', {
														'is-invalid': errors.email
													})}
													id="username"
													autoComplete={'email'}
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
												<InputGroupAddon addonType="prepend">
													<img style={{ objectFit: 'contain' }} src={LockPNG} />
												</InputGroupAddon>
												<Field
													component="input"
													type="password"
													name="password"
													autoComplete={'new-password'}
													className={classnames('form-control', {
														'is-invalid': errors.password
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
										<div className="text-right pt-2" style={{ paddingRight: '100px' }}>
											<NavLink to="forgot" style={{ color: '#4881EC', fontSize: '12px' }}>
												Forgot password?
											</NavLink>
										</div>
										<div className="loader-holder">
											<Button type="submit" disabled={this.state.loading}>
												{this.state.loading ? <Spinner /> : 'Login'}
											</Button>
										</div>
									</form>
									<center>
									<p className="copy-right mt-5" style={{ color: '#000' }}>
										&copy; All rights reserved 2019 | Powered by{' '}
										<a
											href="https://www.codingzap.com"
											target="_blank"
											style={{ color: '#4881EC' }}
										>
											Codingzap Technologies
										</a>{' '}
									</p>
								</center>
								</div>
							</div>
						</Col>
						<Col md="5" style={{ background: '#4881EC' }}>
							<div className="right-side">
								<div className="navigation">
									<ul>
										<li>
											<NavLink to="/trending">Trending Feel</NavLink>
										</li>
										<li>
											<NavLink to="/trending/upcoming">Competitions</NavLink>
										</li>
										<li>
											<NavLink to="/trending/poems">Trending Weekly</NavLink>
										</li>
									</ul>
								</div>
								<div className="signup">
									<h1 style={{fontSize: '25px'}} className="font-weight-bold">New Here?</h1>
									<p>
										Create a new account and start writing your experiences, memories and emotions.
									</p>
									<p className="text-center">Let's Ink your life.</p>
									<NavLink className="btn" to="/register">
										Sign up
									</NavLink>
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
	form: 'login'
})(connect(mapStateToProps, { loginUser })(withRouter(Login)));
