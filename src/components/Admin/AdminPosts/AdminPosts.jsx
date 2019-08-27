import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Loader from './../../Loader';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
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
			filter_type: '',
			filter_value: '',
			filter: false
		};

		this.deletePost = this.deletePost.bind(this);
		this.loadFunc = this.loadFunc.bind(this);
		this.handleFilterType = this.handleFilterType.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilterType(filter_type) {
		this.setState({
      filter_type: filter_type,
      filter_value: ''
		});
	}

	handleFilter(filter_value) {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		this.setState(
			{
				filter_type: this.state.filter_type,
				filter_value: filter_value,
				filter: true,
				hasMore: true,
				inview: []
			},
			() => {
				axios
					.post(
						`${process.env.REACT_APP_API_ENDPOINT}/dashboard/${this.state.filter
							? 'filter_post'
							: 'get_post'}`,
						{
							skip_count: 0,
							limit_count: 5,
							filter_type: this.state.filter ? this.state.filter_type : '',
							filter_value: this.state.filter ? this.state.filter_value : ''
						},
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
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/${this.state.filter ? 'filter_post' : 'get_post'}`,
				{
					skip_count: this.state.inview.length,
					limit_count: 10,
					filter_type: this.state.filter ? this.state.filter_type : '',
					filter_value: this.state.filter ? this.state.filter_value : ''
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
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_post`,
				{ skip_count: 0, limit_count: 5 },
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
					<Col md="4">
						<div className="text-capitalize">{post.post_title.substr(0, 30)}</div>
					</Col>
					<Col md="1">{post.art_type ? post.art_type : 'N/A'}</Col>
					<Col md="1">{post.total_comments}</Col>
					<Col md="1">{post.likes}</Col>
					<Col md="1">{post.shared_type}</Col>
					<Col md="1">
						<Link to={'/profile/' + post.username}>@{post.username}</Link>
					</Col>
					<Col md="1">
						<Link to={`/admin/dashboard/posts/view/${post._id}`}>
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
				<h2 className="my-1">List of Posts</h2>

				<div className="my-2">
					<Row>
						<Col xs="1">
							{' '}
							<UncontrolledDropdown>
								<DropdownToggle caret>
									{this.state.filter_type == 'art' ? (
										'Art'
									) : this.state.filter_type == 'user' ? (
										'User'
									) : (
										'Sort'
									)}
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={(e) => this.handleFilterType('art')}>Art</DropdownItem>
									<DropdownItem divider />
									<DropdownItem onClick={(e) => this.handleFilterType('user')}>User</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Col>
						<Col xs="1">
							{' '}
							{this.state.filter_type == 'user' ? (
								<div style={{display: 'flex'}}>
									<input
                    type="text"
                    style={{padding: '3px'}}
                    placeholder="Username"
										onChange={(e) => {
											this.setState({
												username_filter: e.target.value
											});
										}}
									/>
									<Button
										onClick={(e) => {
											e.preventDefault();
											this.handleFilter(
												this.state.username_filter ? this.state.username_filter : ''
											);
										}}
									>
										Submit
									</Button>
								</div>
							) : this.state.filter_type == 'art' ? (
								<UncontrolledDropdown>
									<DropdownToggle caret>
										{this.state.filter_value ? this.state.filter_value : 'Choose'}
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem onClick={(e) => this.handleFilter('quote')}>Quote</DropdownItem>
										<DropdownItem onClick={(e) => this.handleFilter('poem')}>Poem</DropdownItem>
										<DropdownItem onClick={(e) => this.handleFilter('ganaz')}>
											Gazal/Nazm
										</DropdownItem>
										<DropdownItem onClick={(e) => this.handleFilter('story')}>Story</DropdownItem>
										<DropdownItem onClick={(e) => this.handleFilter('letter')}>
											Letters
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							) : (
								''
							)}
						</Col>
					</Row>
				</div>

				<Row className="border py-3">
					<Col md="1">
						{' '}
						<strong>#</strong>
					</Col>
					<Col md="4">
						{' '}
						<strong>Title</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Art Type</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Comments</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Likes</strong>
					</Col>
					<Col md="1">
						{' '}
						<strong>Shared Type</strong>
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
