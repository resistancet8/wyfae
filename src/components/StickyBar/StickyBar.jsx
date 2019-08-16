import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FeelCircle from "./../../assets/img/feelcircle.svg";
import JournalCircle from "./../../assets/img/journal icon.svg";
import Brand from "./../../assets/img/wyfae_main logo.svg";
import TrendingFeel from "./../../assets/img/trending feel icon.svg";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './StickyBar.css';
import navigationHome from "./../../helpers/navigation";
import { Link } from 'react-router-dom';

class StickyBar extends Component {
	constructor() {
		super();

		this.toggle = this.toggle.bind(this);
		this.toggleComp = this.toggleComp.bind(this);
	}

	state = {
		user: {},
		dropdownOpen: false,
		dropdownOpenComp: false
	};

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	toggleComp() {
		this.setState(prevState => ({
			dropdownOpenComp: !prevState.dropdownOpenComp
		}));
	}

	render() {

		const { url: profile_img } = this.props.user;

		return (
			<div className="stickybar-wrapper d-block d-lg-none">
				<ul>
					<li>
						<NavLink className="p-2 text-dark" to="/profile">
							<i class="fas fa-user"></i>
						</NavLink>
					</li>
					<li>
					<Dropdown direction="top" isOpen={this.state.dropdownOpenComp} toggle={this.toggleComp}>
							<DropdownToggle tag="a" className="nav-link">
								<i class="fas fa-trophy"></i>
          		</DropdownToggle>
							<DropdownMenu>
								<DropdownItem header className="font-weight-bold"><Link to={"/trending"}>Competition</Link></DropdownItem>
								<DropdownItem divider></DropdownItem>
								<DropdownItem>
									<Link to="/trending/upcoming">Upcoming</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/trending/ongoing">Ongoing</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/trending/completed">Completed</Link>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</li>
					<li>
						<Dropdown direction="top" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<DropdownToggle tag="a" className="nav-link">
								<i class="fas fa-poll"></i>
          		</DropdownToggle>
							<DropdownMenu>
								<DropdownItem header className="font-weight-bold"><Link to={"/trending"}>Top Trending</Link></DropdownItem>
								<DropdownItem divider></DropdownItem>
								{navigationHome.map(route => {
									if(route.path != '/trending/')
										return <DropdownItem><Link to={route.path}>{route.text}</Link></DropdownItem>
								})}
							</DropdownMenu>
						</Dropdown>
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
