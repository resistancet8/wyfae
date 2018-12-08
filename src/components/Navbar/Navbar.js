import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/auth_actions";
import Brand from "./../../assets/img/wyfae_main logo.svg";
import TrendingFeel from "./../../assets/img/trending feel icon.svg";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AccessAlarmIcon from "@material-ui/icons/AccountCircle";
import FeelCircle from "./../../assets/img/feelcircle.svg";
import JournalCircle from "./../../assets/img/journal icon.svg";
import SearchItem from "./SearchItem";
import { Scrollbars } from "react-custom-scrollbars";

import "./Navbar.css";
import Axios from "axios";

class NavbarComponent extends Component {
  state = {
    anchorEl: null,
    results: []
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleUrlChange(username) {
    this.props.history.push("/profile/" + username);
  }

  logoutUser() {
    this.props.logoutUser();
  }

  handleSearch(val) {
    Axios.post("http://159.89.171.16:9000/user/search_user", {
      username: val,
      skip_count: 0
    })
      .then(d => {
        this.setState({
          results: d.data.content
        });
      })
      .catch(e => {});
  }

  handleShowResult() {
    if (document.querySelector(".search-results")) {
      document.querySelector(".search-results").style.display = "block";
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { isAuthenticated: isAuth } = this.props.auth;
    const { first_name } = this.props.user;

    let Results =
      this.state.results.length > 0 ? (
        this.state.results.map(o => {
          return (
            <SearchItem
              user={o}
              handleUrlChange={this.handleUrlChange.bind(this)}
            />
          );
        })
      ) : (
        <SearchItem empty={1} />
      );

    return (
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <NavLink className="my-0 mr-md-auto banner" to="/trending">
            <img src={Brand} alt="Wyfae Brand" />
          </NavLink>
          <div className="search-bar my-2">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e => {
                this.handleSearch(e.target.value);
              }}
              onFocus={this.handleShowResult}
              onBlur={() => {
                setTimeout(() => {
                  if (document.querySelector(".search-results")) {
                    document.querySelector(".search-results").style.display =
                      "none";
                  }
                }, 300);
              }}
            />
            <div class="search-results">
              <ul className="row">
                <Scrollbars autoHeight autoHide autoHeightMax={400}>
                  {Results}
                </Scrollbars>
              </ul>
            </div>
          </div>
          <nav className="my-2 my-md-0 mr-md-3">
            {!isAuth && (
              <React.Fragment>
                <NavLink className="p-2 text-dark" to="/register">
                  Register
                </NavLink>
                <NavLink className="p-2 text-dark" to="/login">
                  Login
                </NavLink>
              </React.Fragment>
            )}
            {isAuth && (
              <React.Fragment>
                <NavLink className="p-2 text-dark" to="/following">
                  <IconButton color="default" className="icon-holder">
                    <img src={FeelCircle} alt="" />
                  </IconButton>
                </NavLink>
                {/* <NavLink className="p-2 text-dark" to="/following">
                  <IconButton color="default" className="icon-holder">
                    <img src={FeelRequest} alt="" />
                  </IconButton>
                </NavLink> */}
                <NavLink className="p-2 text-dark" to="/journal">
                  <IconButton color="default" className="icon-holder">
                    <img src={JournalCircle} alt="" />
                  </IconButton>
                </NavLink>

                <NavLink className="p-2 text-dark" to="/trending">
                  <IconButton color="default" className="icon-holder2">
                    <img src={TrendingFeel} alt="" />
                  </IconButton>
                </NavLink>
                <Button onClick={this.handleClick}>
                  Profile &nbsp;
                  <AccessAlarmIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <NavLink className="text-dark profile" to="/profile">
                      {first_name}
                    </NavLink>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.handleClose();
                      this.logoutUser.bind(this)();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </nav>
        </div>
      </header>
    );
  }
}

NavbarComponent.propTypes = {
  auth: PropTypes.object,
  logoutUser: PropTypes.func,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(NavbarComponent)
);
