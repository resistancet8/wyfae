import React, { Component } from 'react';
import { Form, FormGroup, Input, Row, Col, Button } from 'reactstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './../../Loader';

class AdminCompetition extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notification_message: '',
			saving: false,
			showLoader: false,
			defaultImages: [],
			showLoaderImages: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDefaultImages = this.getDefaultImages.bind(this);
		this.uploadNewDefaultImage = this.uploadNewDefaultImage.bind(this);
		this.onChange = this.onChange.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit(e) {
		this.setState({ saving: true });
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/push_message`,
				{ text: this.state.notification_message },
				axiosConfig
			)
			.then((response) => {
				alert('Saved!');
				this.setState({ saving: false });
			})
			.catch((err) => {
				alert('Error Saving Message!');
				this.setState({ saving: false });
			});
	}

	getDefaultImages() {
		this.setState({ showLoaderImages: true });
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_image`, {}, axiosConfig)
			.then((response) => {
				let images = response.data.image_list.map((i) => i.replace('images', 'image'));
				this.setState({ defaultImages: images, showLoaderImages: false });
			})
			.catch((err) => {});
	}

	uploadNewDefaultImage() {
		var bodyFormData = new FormData();
		bodyFormData.set('pic', this.state.file);

		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/upload_image`, bodyFormData, axiosConfig)
			.then((response) => {
				this.setState({ defaultImages: response.data.image_list });
				window.location.reload();
			})
			.catch((err) => {});
	}

	componentDidMount() {
		this.getDefaultImages();

		this.setState({ showLoader: true });
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(
				`${process.env.REACT_APP_API_ENDPOINT}/dashboard/get_message`,
				{ compete_status: 'all', skip_count: 0, limit_count: 10 },
				axiosConfig
			)
			.then((response) => {
				let data = response.data.admin_message.text;
				this.setState({
					notification_message: data,
					showLoader: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChange(e) {
		this.setState({ file: e.target.files[0] });
	}

	deleteImage(image) {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: this.props.admin.admin_token || ''
			}
		};

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/dashboard/delete_image`, { image_name: image }, axiosConfig)
			.then((response) => {
				this.setState({
					image_list: []
				});
				alert('Deleted!');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="pr-2">
				<Row>
					<Col md="4">
						<h2 className="my-1">Notification Message</h2>
						<Form>
							<FormGroup>
								{this.state.showLoader ? (
									<Loader />
								) : (
									this.state.notification_message.length >= 0 && (
										<Input
											style={{ height: '300px' }}
											type="textarea"
											name="text"
											onChange={this.handleChange}
											id="notification_message"
											placeholder="Enter Message"
											value={this.state.notification_message}
										/>
									)
								)}
							</FormGroup>
						</Form>
						{this.state.saving ? (
							<Loader />
						) : (
							<Button type="submit" onClick={this.handleSubmit}>
								Submit
							</Button>
						)}
					</Col>
					<Col md="4" className="border-left">
						<h2 className="my-1">Default Images</h2>
						<hr />
						<div>
							<label>Upload new image: </label>
							<input type="file" name="myImage" className="mb-2 ml-1" onChange={this.onChange} />
							<Button type="submit" onClick={this.uploadNewDefaultImage}>
								Submit
							</Button>
						</div>
						{this.state.showLoaderImages ? (
							<Loader />
						) : this.state.defaultImages && this.state.defaultImages.length > 0 ? (
							<Carousel dynamicHeight={false}>
								{this.state.defaultImages.map((img) => {
									return (
										<div>
											<img src={`${process.env.REACT_APP_API_ENDPOINT}${img}`} />
											<button
												onClick={(e) => {
													e.preventDefault();
													let image = img.split('/')[3];
													this.deleteImage(image);
												}}
												className="legend"
												style={{ color: 'white', background: 'red' }}
											>
												Delete
											</button>
										</div>
									);
								})}
							</Carousel>
						) : (
							<p> No images. </p>
						)}
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		admin: state.admin
	};
}

export default withRouter(connect(mapStateToProps)(AdminCompetition));
