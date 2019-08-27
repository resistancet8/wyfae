import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultPic from './../../../assets/img/default.jpg';
import Canvas from './Canvas';
import validateFeelingsinput from './../../../helpers/feelings_validator';
import classnames from 'classnames';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Loader from './../../Loader';
import Switch from 'react-switch';
import axios from 'axios';
import './text.js';
let textLimit = 100;
let fontList = [
	'Arial',
	'Tahoma',
	'Impact',
	'Arial Black',
	'Trebuchet MS',
	'Comic Sans MS',
	'Bookman',
	'Garamond',
	'Palatino',
	'Georgia',
	'Verdana',
	'Courier New',
	'Times New Roman',
	'Helvetica'
];

function convertFileToDataURLviaFileReader(url, callback) {
	var image = new Image();
	image.crossOrigin = 'anonymous';

	image.onload = function() {
		var canvas = document.createElement('canvas');
		canvas.width = 500; // or 'width' if you want a special/scaled size
		canvas.height = 500; // or 'height' if you want a special/scaled size

		canvas.getContext('2d').drawImage(this, 0, 0);

		// Get raw image data
		// callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

		// ... or get as Data URI
		callback(canvas.toDataURL('image/png'));
	};

	image.src = url;
}

class Form extends Component {
	constructor(props) {
		super();
		this.getData = this.getData.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleControlsChange = this.handleControlsChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.updateCanvas = this.updateCanvas.bind(this);
		this.selectImage = this.selectImage.bind(this);
	}

	state = {
		errors: {},
		loading: false,
		shared_type: '',
		modal: 1,
		previewUrl: '',
		color: '#333333',
		imageVisibility: false,
		forceTurnOffImage: false,
		previewed: false,
		text: '',
		textAlign: 'left',
		fontSize: 35,
		fontWeight: 'bold',
		textFill: '#444444',
		fontFamily: fontList[0],
		canvasBackground: '#ffffff',
		canvasBackgroundImage: null,
		canvasFinalImage: null,
		showLoaderImages: '',
		defaultImages: [],
		selectedItem: 0
	};

	getDefaultImages() {
		this.setState({ showLoaderImages: true });

		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_image`, {})
			.then((response) => {
				let images = response.data.image_list.map((i) => i.replace('images', 'image'));
				this.setState({ defaultImages: images, showLoaderImages: false });
			})
			.catch((err) => {});
	}

	updateCanvas(canvas) {
		if (canvas != this.state.canvasFinalImage) {
			this.setState({
				canvasFinalImage: canvas
			});
		}
	}

	handleTextChange(e) {
		let text = e.target.value;
		if (text.trim().length < 1) return;
		if (text.trim().split(/\s+/).length > textLimit) {
			this.setState({
				forceTurnOffImage: true,
				imageVisibility: false
			});
		} else {
			this.setState({
				forceTurnOffImage: false,
				text
			});
		}
	}

	selectImage(image, item) {
		fetch(image, {
			method: 'GET',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				return response.blob();
			})
			.then((blob) => {
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64data = reader.result;
					this.setState({
						canvasBackgroundImage: base64data,
						selectedItem: item
					});
				};
			});
	}

	handleImageChange(e) {
		e.persist();
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = (f) => {
			var data = f.target.result;
			this.setState({
				canvasBackgroundImage: data,
				filename: e.target.files[0].name
			});
		};
		reader.readAsDataURL(file);
	}

	handleControlsChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	toggle() {
		this.setState(
			{
				previewed: true
			},
			() => {
				document.querySelector('.open-preview-modal').click();
			}
		);
	}

	dataURItoBlob(dataURI) {
		// convert base64 to raw binary data held in a string
		// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
		var byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);

		// create a view into the buffer
		var ia = new Uint8Array(ab);

		// set the bytes of the buffer to the correct values
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		// write the ArrayBuffer to a blob, and you're done
		var blob = new Blob([ ab ], { type: mimeString });
		return blob;
	}

	getData(formData) {
		let { isValid, errors } = validateFeelingsinput({ text: this.state.text, ...formData });

		if (!isValid) {
			this.setState({ errors: errors });
			return;
		}

		let blob = this.dataURItoBlob(this.state.canvasFinalImage);
		let bodyFormData = new FormData();
		bodyFormData.append('text', this.state.text);
		bodyFormData.append('post_type', formData.post_type);
		bodyFormData.append('image_or_text', this.state.imageVisibility);
		bodyFormData.append('shared_type', this.state.shared_type);
		bodyFormData.append('post_title', formData.post_title);
		bodyFormData.append(
			'pic',
			new File([ blob ], 'default.jpg', {
				type: 'image/jpg',
				lastModified: Date.now()
			})
		);

		this.props.submitArt(bodyFormData);
	}

	componentDidMount() {
		this.getDefaultImages();

		this.props.initialize({
			post_type: 'art'
		});
	}

	handleShowImage(checked) {
		this.setState(() => {
			return {
				imageVisibility: checked
			};
		});
	}

	render() {
		const { handleSubmit } = this.props;
		let showButtons = true;

		if ((this.state.imageVisibility && this.state.previewed) || !this.state.imageVisibility) {
			showButtons = false;
		}

		return (
			<div>
				<form>
					<button
						type="button"
						class="btn btn-primary d-none open-preview-modal"
						data-toggle="modal"
						data-target="#exampleModal"
					/>
					<div className="data-holder">
						<div
							class="modal fade"
							id="exampleModal"
							tabindex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true"
						>
							<div class="modal-dialog xyz" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h3 class="modal-title font-weight-normal" id="exampleModalLabel">
											Share Your Feelings/ Experience
										</h3>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="row preview-container" style={{ padding: '10px' }}>
											<div class="col-lg-5 col-md-12" style={{ background: '#fefefe' }}>
												<h5>Controls:</h5>
												<div className="controls-holder" style={{ padding: '10px 20px' }}>
													<form>
														<div class="form-group">
															<div className="row">
																<div className="col">
																	<label>Font Size:</label>
																	<input
																		type="number"
																		class="form-control"
																		id="fontSize"
																		placeholder="Font Size"
																		value={this.state.fontSize}
																		onChange={this.handleControlsChange}
																	/>
																</div>
																<div className="col">
																	<label>Font Weight:</label>
																	<select
																		class="form-control"
																		id="fontWeight"
																		onChange={this.handleControlsChange}
																		value={this.state.fontWeight}
																	>
																		<option value="normal">Normal</option>
																		<option value="bold">Bold</option>
																		<option value="400">400</option>
																		<option value="600">600</option>
																		<option value="800">800</option>
																		<option value="900">900</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="form-group">
															<div className="row">
																<div className="col">
																	<label>Text Colour:</label>
																	<input
																		type="color"
																		class="form-control"
																		id="textFill"
																		placeholder="Color"
																		value={this.state.textFill}
																		onChange={this.handleControlsChange}
																	/>
																</div>
																<div className="col">
																	<label for="text-align">Alignment:</label>
																	<select
																		class="form-control"
																		id="textAlign"
																		onChange={this.handleControlsChange}
																		value={this.state.textAlign}
																	>
																		<option value="left">Left</option>
																		<option value="center">Center</option>
																		<option value="right">Right</option>
																		<option value="justify">Justify</option>
																		<option value="justify-left">
																			Justify Left
																		</option>
																		<option value="justify-center">
																			Justify Center
																		</option>
																		<option value="justify-right">
																			Justify Right
																		</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="form-group">
															<label for="text-align">Choose Font:</label>
															<select
																class="form-control"
																id="fontFamily"
																onChange={this.handleControlsChange}
																value={this.state.fontFamily}
															>
																{fontList.map((f) => <option value={f}>{f}</option>)}
															</select>
														</div>
														<div class="form-group">
															<label>Background Colour:</label>
															<input
																type="color"
																class="form-control w-25"
																id="canvasBackground"
																placeholder="Color"
																value={this.state.canvasBackground}
																onChange={this.handleControlsChange}
															/>
														</div>
														<div class="form-group">
															<label>Choose Different Image:</label>
															<input
																type="file"
																class="form-control"
																accept="image/*"
																id="image"
																onChange={(e) => this.handleImageChange(e)}
															/>
															<small className="text-muted">(500x500)</small>
														</div>
														<div class="form-group">
															{this.state.showLoaderImages ? (
																<Loader />
															) : (
																this.state.defaultImages &&
																this.state.defaultImages.length > 0 && (
																	<div>
																		<label>Choose Default Image:</label>
																		<img
																			src=""
																			crossOrigin="anonymous"
																			id="newimagetoadd"
																			alt=""
																		/>
																		<Carousel
																			selectedItem={this.state.selectedItem}
																			onClickItem={(e) => {
																				this.selectImage(
																					`${process.env
																						.REACT_APP_API_ENDPOINT}${this
																						.state.defaultImages[e]}`
																				, e);
																			}}
																		>
																			{this.state.defaultImages.map((img) => {
																				return (
																					<div>
																						<img
																							src={`${process.env
																								.REACT_APP_API_ENDPOINT}${img}`}
																						/>
																						<p
																							className="legend"
																							style={{
																								color: 'white',
																								background: 'red'
																							}}
																						>
																							Select
																						</p>
																					</div>
																				);
																			})}
																		</Carousel>
																	</div>
																)
															)}
														</div>
													</form>
												</div>
											</div>
											<div
												class="col-lg-7 col-md-12"
												style={{ background: '#f1f1f1', padding: '10px' }}
											>
												{this.state.text.trim().length > 0 && (
													<Canvas
														text={this.state.text}
														textAlign={this.state.textAlign}
														fontSize={this.state.fontSize}
														fontWeight={this.state.fontWeight}
														textFill={this.state.textFill}
														fontFamily={this.state.fontFamily}
														canvasBackground={this.state.canvasBackground}
														canvasBackgroundImage={this.state.canvasBackgroundImage}
														updateCanvas={this.updateCanvas}
													/>
												)}
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label>Title:</label>
							<Field
								component="input"
								type="text"
								name="post_title"
								className={classnames('form-control rounded', {
									'is-invalid': this.state.errors.post_title
								})}
								id="post_title"
								placeholder="Title to your art"
							/>
							{this.state.errors.post_title && (
								<div className="invalid-feedback"> {this.state.errors.post_title} </div>
							)}
						</div>
						<Field component="input" type="hidden" name="post_type" />
						<img src={defaultPic} class="d-none" id="default-pic" />
						<textarea
							name="text"
							id="text-body"
							onChange={this.handleTextChange}
							cols="30"
							rows="7"
							// onChange={this.previewImage}
							className={classnames('form-control rounded', {
								'is-invalid': this.state.errors.text
							})}
							placeholder="Share Your Feelings/ Experience"
						/>
						{this.state.errors.text && <div className="invalid-feedback"> {this.state.errors.text} </div>}
						{this.state.forceTurnOffImage && (
							<div class="text-right">
								<small className="text-muted red">You can only post as text</small>
							</div>
						)}

						<div className="show-img-holder mt-5">
							<label>Show default background image:</label>
							<div className="d-inline">
								<Switch
									height={25}
									width={50}
									disabled={this.state.forceTurnOffImage}
									checked={this.state.imageVisibility}
									onChange={(c, e) => {
										this.handleShowImage(c);
									}}
								/>

								<label for="switch-show-bg" />
							</div>
							<label>{this.state.imageVisibility ? 'On' : 'Off'}</label>
						</div>
						{!this.state.forceTurnOffImage &&
						this.state.imageVisibility && (
							<div>
								{' '}
								<div className="select-image-holder my-3">
									<label>Select background image:</label>
									<input
										type="file"
										style={{ display: 'none' }}
										class="form-control"
										accept="image/*"
										id="file-selector"
										onChange={this.handleImageChange}
									/>
									<label id="label-file" htmlFor="file-selector">
										Choose
									</label>
									<label style={{ maxWidth: '30%', overflow: 'hidden' }}>
										{this.state.filename ? this.state.filename : 'No image chosen'}
									</label>
								</div>
								<Button
									onClick={(e) => {
										e.preventDefault();
										this.toggle();
									}}
									disabled={!(this.state.text.trim().length > 0)}
									style={{ background: '#0085f3', color: 'white' }}
								>
									Show Preview
								</Button>
							</div>
						)}
						<div className="controls mr-auto mt-3">
							{!this.props.part_id && (
								<div>
									<Button
										disabled={showButtons}
										variant="outlined"
										className="mr-2 mb-2 font-weight-normal"
										onClick={() => {
											this.setState(
												{
													shared_type: 'public'
												},
												() => {
													handleSubmit(this.getData)();
												}
											);
										}}
									>
										<i className="fas fa-share mx-1" />
										Share
									</Button>
									<Button
										disabled={showButtons}
										variant="outlined"
										className="mr-2 mb-2 font-weight-normal"
										onClick={() => {
											this.setState(
												{
													shared_type: 'anonymous'
												},
												() => {
													handleSubmit(this.getData)();
												}
											);
										}}
									>
										<i className="fas fa-share mx-1" />
										Share Anonymously
									</Button>
									<Button
										disabled={showButtons}
										variant="outlined"
										className="mr-2 mb-2 font-weight-normal"
										onClick={() => {
											this.setState(
												{
													shared_type: 'save'
												},
												() => {
													handleSubmit(this.getData)();
												}
											);
										}}
									>
										<i className="fas fa-save mx-1" />
										Save
									</Button>
									<Button
										disabled={showButtons}
										variant="outlined"
										className="mr-2 mb-2 font-weight-normal"
										onClick={() => {
											this.setState(
												{
													shared_type: 'compete'
												},
												() => {
													handleSubmit(this.getData)();
												}
											);
										}}
									>
										<i className="fas fa-medal mx-1" />
										Compete
									</Button>
								</div>
							)}
							{this.props.part_id && (
								<Button
									className="mr-2 mb-2 font-weight-normal"
									onClick={() => {
										this.setState(
											{
												shared_type: 'compete'
											},
											() => {
												handleSubmit(this.getData)();
											}
										);
									}}
								>
									<i className="fas fa-medal mx-1" />
									Compete
								</Button>
							)}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

Form.propTypes = {
	errors: PropTypes.object,
	auth: PropTypes.object,
	handleSubmit: PropTypes.func
};

export default reduxForm({
	form: 'art-form'
})(connect(null, {})(withRouter(Form)));
