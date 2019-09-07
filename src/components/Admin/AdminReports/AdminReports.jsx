import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Loader from './../../Loader';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Adminpost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inview: [],
			hasMore: true,
			showLoading: false,
			sortBy: '',
			sort: false
		};

		this.deletePost = this.deletePost.bind(this);
		this.loadFunc = this.loadFunc.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(type) {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		this.setState(
			{
				sortBy: type,
				sort: true,
				hasMore: true,
				inview: []
			},
			() => {
				axios
					.post(
						`${process.env.REACT_APP_API_ENDPOINT}/dashboard/${this.state.sort
							? 'filter_report'
							: 'get_flag_post'}`,
						{ skip_count: 0, limit_count: 5, report_type: this.state.sort ? this.state.sortBy : '' },
						axiosConfig
					)
					.then((response) => {
						let data = response.data.all_content;

						this.setState({
							inview: data,
							showLoading: data.length == 0 ? false : true
						});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		);
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
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/${this.state.sort
					? 'filter_report'
					: 'get_flag_post'}`,
				{
					skip_count: this.state.inview.length,
					limit_count: 10,
					report_type: this.state.sort ? this.state.sortBy : ''
				},
				axiosConfig
			)
			.then((response) => {
				let data = response.data.all_content;

				this.setState((prev) => {
					return {
						inview: [ ...this.state.inview, ...data ],
						hasMore: data.length <= 0 ? false : true
					};
				});
			})
			.catch((err) => {});
	}

	deletePost(post_id) {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/delete_post`, { post_id }, axiosConfig)
			.then((response) => {
				alert('Deleted');
				window.location.reload();
			})
			.catch((err) => {
				alert('error deleting post: ');
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
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/${this.state.sort
					? 'filter_report'
					: 'get_flag_post'}`,
				{ skip_count: 0, limit_count: 5, report_type: this.state.sort ? this.state.sortBy : '' },
				axiosConfig
			)
			.then((response) => {
				let data = response.data.all_content;

				this.setState({
					inview: data,
					showLoading: data.length == 0 ? false : true
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		let items = this.state.inview.map((post, index) => {
			return (
				<Row className="my-4 border-bottom">
					<Col md="1">{index + 1}</Col>
					<Col md="2">
						<div className="text-capitalize">{post.post_title.substr(0, 30)}</div>
					</Col>
					<Col md="2">
						<div className="">
							<a href={`mailto:${post.email}`}>{post.email}</a>
						</div>
					</Col>
					<Col md="2">{post.hasOwnProperty('plagarised_count') ? 'Plagarised' : 'Spam'}</Col>
					<Col md="1">
						{post.hasOwnProperty('plagarised_count') ? post.plagarised_count : post.spam_count}
					</Col>
					<Col md="1">
						<Link to={'/profile/' + post.username}>@{post.username}</Link>
					</Col>
					<Col md="1">
						<Link to={`/admin/dashboard/reports/view/${post._id}`}>
							<button title="view" class="btn">
								<i class="fa fa-eye" />
							</button>
						</Link>
						<button
							title="delete"
							onClick={() => {
								let confirm_delete = window.confirm('Sure you want to delete?');
								if (confirm_delete) {
									this.deletePost(post._id);
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
				<h2 className="my-1">List of Flagged Posts</h2>
				<div className="my-2">
					<UncontrolledDropdown>
						<DropdownToggle caret>
							{this.state.sortBy == 'spam' ? (
								'Spam'
							) : this.state.sortBy == 'plagarised' ? (
								'Plagarised'
							) : (
								'Sort'
							)}
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={(e) => this.handleFilter('spam')}>Spam</DropdownItem>
							<DropdownItem divider />
							<DropdownItem onClick={(e) => this.handleFilter('plagarised')}>Plagarised</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</div>
				<Row className="border py-3">
					<Col md="1">
						{' '}
						<strong>#</strong>
					</Col>
					<Col md="2">
						{' '}
						<strong>Title</strong>
					</Col>
					<Col md="2">
						{' '}
						<strong>Email</strong>
					</Col>
					<Col md="2">
						{' '}
						<strong>Type</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Count</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>User</strong>
					</Col>
					<Col md="1" />
				</Row>
				{this.state.inview && this.state.inview.length > 0 ? (
					<div style={{ height: '95vh', overflowX: 'hidden', overflowY: 'auto' }}>
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
								<strong>No posts to show.</strong>
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

export default withRouter(connect(mapStateToProps)(Adminpost));
