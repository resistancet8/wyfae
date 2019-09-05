import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Loader from './../../Loader';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AdminUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			inview: [],
			hasMore: true,
			showLoading: false,
		};

		this.deleteUser = this.deleteUser.bind(this);
		this.loadFunc = this.loadFunc.bind(this);
	}

	loadFunc() {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`,
				{ skip_count: this.state.inview.length, limit_count: 10 },
				axiosConfig
			)
			.then((response) => {
				this.setState((prev) => {
					return {
						inview: [ ...this.state.inview, ...response.data.all_content ],
						hasMore: response.data.all_content.length <= 0 ? false : true
					};
				});
			})
			.catch((err) => {});
	}

	deleteUser(username) {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/delete_user`, { username }, axiosConfig)
			.then((response) => {
				alert('Deleted ' + username);
				window.location.reload();
			})
			.catch((err) => {
				alert('error deleting user: ' + username);
			});
	}

	componentDidMount() {
		this.setState({
			showLoading: true
		});

		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get-users`,
				{ skip_count: 0, limit_count: 10 },
				axiosConfig
			)
			.then((response) => {
				let data = response.data.all_content || [];
				this.setState({
					inview: [ ...data ],
					showLoading: data.length == 0 ? false : true
				});
			})
			.catch((err) => {});
	}

	render() {
		let items = this.state.inview.map((user, index) => {
			return (
				<Row className="my-4 border-bottom">
					<Col md="1">{index + 1}</Col>
					<Col md="2">{user.fullname}</Col>
					<Col md="2">{user.email}</Col>
					<Col md="1">{user.contact || 'nil'}</Col>
					<Col md="1">{user.total_followers}</Col>
					<Col md="1">{user.stats.no_of_wins}</Col>
					<Col md="1">{user.stats.content_shared}</Col>
					<Col md="1">{user.stats.anonymous_shared}</Col>
					<Col md="1">
						<Link to={`/profile/${user._id}`}>@{user._id}</Link>
					</Col>
					<Col md="1">
						<Link to={`/admin/dashboard/users/view/${user._id}`}>
							<button title="view" class="btn">
								<i class="fa fa-eye" />
							</button>
						</Link>
						<button
							title="delete"
							onClick={() => {
								let confirm_delete = window.confirm('Sure you want to delete?');
								if (confirm_delete) {
									this.deleteUser(user._id);
								}
							}}
							type="button"
							class="btn"
							id="Popover-1"
						>
							<i class="fa fa-trash" />
						</button>
					</Col>
				</Row>
			);
		});

		return (
			<div className="pr-2">
				<h2 className="my-1">List of Users</h2>
				<Row className="border py-3">
					<Col md="1">
						{' '}
						<strong>#</strong>
					</Col>
					<Col md="2">
						{' '}
						<strong>Name</strong>
					</Col>
					<Col md="2">
						{' '}
						<strong>Email</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Contact</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Followers</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Wins</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Shared</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Anonymous</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Username</strong>
					</Col>
					<Col md="1" />
				</Row>
				{this.state.inview && this.state.inview.length > 0 ? (
					<div style={{ height: '90vh', overflowX: 'hidden', overflowY: 'auto' }}>
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadFunc}
							hasMore={this.state.hasMore}
							useWindow={false}
							threshold={10}
							loader={
								<div className="text-center py-2">
									{' '}
									<Loader />
								</div>
							}
						>
							{items}
						</InfiniteScroll>
					</div>
				) : (
					<div>
						{this.state.showLoading && (
							<div className="text-center py-2">
								{' '}
								<Loader />
							</div>
						)}
						{this.state.inview.length == 0 &&
						!this.state.showLoading && (
							<div className="text-center py-2">
								<strong>No users to show.</strong>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		admin: state.admin
	};
}

export default withRouter(connect(mapStateToProps)(AdminUsers));
