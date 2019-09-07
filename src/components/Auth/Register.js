import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Redirect, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from './../../actions/auth_actions';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import Login_BG from './../../assets/img/login_bg.png';
import BrandLogo from './../../assets/img/login/logo_new.png';
import Brand from './../../assets/img/wyfae_main logo.svg';
import { Button, Row, Col, Container, InputGroup, InputGroupAddon } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

class Register extends Component {
	state = {
		errors: {},
		loading: false,
		form: {
			dob: moment().format("DD/MM/YYYY")
		}
	};

	getData(e) {
		e.preventDefault();
		this.setState(
			{
				loading: true
			},
			() => {
				setTimeout(() => {
				this.props.registerUser(this.state.form, this.props.history);
				}, 300);
			}
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors || nextProps.errors.msg) {
			this.setState({
				errors: nextProps.errors,
				loading: false
			});
		}
	}

	handleFormData(e, d, nd) {
		this.setState({
			form: {
				...this.state.form,
				[e == 'date' ? 'dob': e.target.id]: e == 'date' ? d: e.target.value ,
				[e == 'date' ? 'rawDate': '']: e == 'date' ? nd: '' 
			}
		});
	}

	render() {
		const { isAuthenticated: isAuth } = this.props.auth;

		if (isAuth) {
			return <Redirect to="/" />;
		}

		const { errors } = this.state;

		return (
			<div className="register_holder_self">
				<Container style={{ minWidth: '90% !important' }}>
					<Row>
						<Col md="7" style={{ background: 'white' }}>
							<div className="left-side">
								<div className="brand-holder">
									<img src={Brand} alt="Wyfae Brand" style={{ width: '140px' }} />
								</div>
								<h1 className="font-weight-bold">Sign up for free</h1>
								<form className="text-center">
									{errors.msg && <div className="alert alert-danger"> {errors.msg} </div>}
									<Grid container spacing={24}>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Username"
												id="username"
												error={errors.username}
  											helperText={errors.username ? errors.username : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={24}>
										<Grid item xs={6}>
											<TextField
												fullWidth
												label="First Name"
												id="first_name"
												error={errors.first_name}
  											helperText={errors.first_name ? errors.first_name : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
											fullWidth
												label="Last Name"
												id="sur_name"
												error={errors.sur_name}
  											helperText={errors.sur_name ? errors.sur_name : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={24}>
										<Grid item xs={12}>
											<TextField
											fullWidth
												label="Email"
												id="email"
												error={errors.email}
  											helperText={errors.email ? errors.email : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={24}>
										<Grid item xs={6}>
											<TextField
												fullWidth
												label="Password"
												id="password"
												error={errors.password}
  											helperText={errors.password ? errors.password : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												fullWidth
												label="Confirm Password"
												id="password2"
												error={errors.password2}
  											helperText={errors.password2 ? errors.password2 : ' '}
												onChange={this.handleFormData.bind(this)}
											/>
										</Grid>
									</Grid>

									<Grid container spacing={24}>
										<Grid item xs={12}>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<KeyboardDatePicker
													id="dob"
													fullWidth
													error={errors.dob}
  												helperText={errors.dob ? errors.dob : ' '}
													value={moment(this.state.form.rawDate).format('MM/DD/YYYY')}
													label="Date of Birth"
													format="dd/MM/yyyy"
													onChange={(e, d) => {
														this.handleFormData.bind(this)('date', d, e);
													}}
													KeyboardButtonProps={{
														'aria-label': 'change date'
													}}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
									</Grid>

									<p className="mt-5 d-block">
										By continuing, you agree to Wyfae's{' '}
										<b>
											<Link to="/usage">Terms of Service </Link>
										</b>{' '}
										and{' '}
										<b>
											<Link to="/privacy"> Privacy Policy</Link>
										</b>.
									</p>
									<div className="loader-holder">
										<Button variant="outlined" type="submit" onClick={this.getData.bind(this)} disabled={this.state.loading}>
											{this.state.loading ? <Spinner /> : 'Register'}
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
											Codingzap
										</a>{' '}
									</p>
								</center>
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
											<NavLink to="/trending">Competetions</NavLink>
										</li>
										<li>
											<NavLink to="/trending">Trending Weekly</NavLink>
										</li>
									</ul>
								</div>
								<div className="signup">
									<h1 className="font-weight-bold">Already have an Account?</h1>
									<p>Login and start writing your experiences, memories and emotions.</p>
									<p className="text-center">Let's Ink your life.</p>
									<NavLink className="btn" to="/login">
										Login
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

Register.propTypes = {
	errors: PropTypes.object,
	registerUser: PropTypes.func,
	auth: PropTypes.object
};

function mapStateToProps(state) {
	return {
		errors: state.errors.errors,
		auth: state.auth
	};
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
