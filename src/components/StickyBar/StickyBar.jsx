import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FeelCircle from "./../../assets/img/feelcircle.svg";
import JournalCircle from "./../../assets/img/journal icon.svg";
import Brand from "./../../assets/img/wyfae_main logo.svg";
import TrendingFeel from "./../../assets/img/trending feel icon.svg";
import './StickyBar.css';

class StickyBar extends Component {
	constructor() {
		super();
	}

	state = {
		user: {}
	};

	render() {

		const { url: profile_img } = this.props.user;

		return (
			<div className="stickybar-wrapper">
				<ul>
					<li>
						<NavLink className="p-2 text-dark" to="/profile">
							<img
								src={`${process.env.REACT_APP_API_ENDPOINT}` + "/" + profile_img}
								className="img-fluid"
								id="profile-img-header"
							/>
						</NavLink>
					</li>
					<li>
						<NavLink className="p-2 text-dark" to="/following">
							<img src={FeelCircle} alt="" />
						</NavLink>
					</li>
					<li>
						<NavLink className="p-2 text-dark" to="/journal">
							<img src={JournalCircle} alt="" />
						</NavLink>
					</li>
					<li>
						<NavLink className="p-2 text-dark" to="/trending">
							<img src={TrendingFeel} alt="" />
						</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.user
	};
}

export default withRouter(
	connect(
		mapStateToProps
	)(StickyBar)
);
