import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from './Main/Card';

class Ongoing extends Component {
	state = {
		post: {}
	};

	componentDidMount() {
		axios
			.post(`${process.env.REACT_APP_API_ENDPOINT}` + '/user/get_single_post', {
				post_id: this.props.match.params.post_id
			})
			.then((response) => {
				let post = response.data.post_data || {};
				this.setState({
					post
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div className="container pt-5">
				<Row>
					<Col className="my-0 mx-auto" md="7">
						<Card post={this.state.post} />
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(Ongoing);
