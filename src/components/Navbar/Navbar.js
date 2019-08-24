import React, { Component } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../../actions/auth_actions";
import Brand from "./../../assets/img/wyfae_main logo.svg";
import TrendingFeel from "./../../assets/img/trending feel icon.svg";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FeelCircle from "./../../assets/img/feelcircle.svg";
import JournalCircle from "./../../assets/img/journal icon.svg";
import SearchItem from "./SearchItem";
import { Scrollbars } from "react-custom-scrollbars";
import Loader from './../Loader';
import InfiniteScroll from 'react-infinite-scroller';
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';

import "./Navbar.css";
import Axios from "axios";

class NavbarComponent extends Component {
  state = {
    anchorEl: null,
    results: [],
    notifications: [],
    hasMore: true,
    showLoading: false,
    showNotification: false
  };

  componentDidMount() {
    if(this.props.auth.isAuthenticated)
      this.getNotifications();
    // window.addEventListener("click", e => {
    //   e.preventDefault();
    //   this.setState({
    //     showNotification: false
    //   })
    // });

    window.addEventListener("scroll", e => {
      e.preventDefault();
      if (this.state.showNotification) {
        this.setState({
          showNotification: false
        })
      }
    });
  }

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
    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/search_user", {
      username: val,
      skip_count: 0
    })
      .then(d => {
        this.setState({
          results: d.data.all_content
        });
      })
      .catch(e => { });
  }

  handleShowResult() {
    if (document.querySelector(".search-results")) {
      document.querySelector(".search-results").style.display = "block";
    }
  }

  loadFunc() {
    Axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/user/get_notification`, { skip_count: this.state.notifications.length, limit_count: 10 })
      .then(response => {
        this.setState((prev) => {
          return {
            notifications: [...this.state.notifications, ...response.data.all_content],
            hasMore: response.data.all_content.length <= 0 ? false : true
          }
        })
      })
      .catch(err => {
      });
  }

  handleShowNotification(e) {
    e.stopPropagation();
    this.setState({
      showNotification: !this.state.showNotification
    })
  }

  getNotifications() {

    this.setState({
      showLoading: true
    });

    Axios.post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/get_notification", {
      "skip_count": 0,
      "limit_count": 10
    })
      .then(d => {
        this.setState({
          notifications: [...d.data.all_content],
          showLoading: d.data.all_content.length == 0 ? false : true
        });
      })
      .catch(e => { });
  }

  render() {
    const { anchorEl } = this.state;
    const { isAuthenticated: isAuth } = this.props.auth;
    const { first_name } = this.props.user;
    const { url: profile_img } = this.props.user;

    let Results =
    this.state.results && this.state.results.length > 0 ? (
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

    let notificationsHTML = this.state.notifications.map(notification => {
      let notificationHTML = [];

      switch (notification.type) {
        case 'liked':
          notificationHTML.push(<Link onClick={e => { this.setState({ showNotification: false }) }} to={`/view/${notification.post_id}`}><ListGroupItem className="each-notification p-3"><i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;&nbsp;<Link to={`/profile/${notification.username}`}><strong className="font-weight-bold">{notification.name}</strong></Link> liked <strong className="font-weight-bold">{notification.post_title}</strong>. <div class="pl-2 mt-2"><strong>{moment(notification.creation_time).local().fromNow()}</strong></div></ListGroupItem></Link>);
          break;
        case 'unliked':
          notificationHTML.push(<Link onClick={e => { this.setState({ showNotification: false }) }} to={`/view/${notification.post_id}`}><ListGroupItem className="each-notification p-3"><i class="fas fa-thumbs-down"></i>&nbsp;&nbsp;&nbsp;<Link to={`/profile/${notification.username}`}><strong className="font-weight-bold">{notification.name}</strong></Link> unliked <strong className="font-weight-bold">{notification.post_title}</strong>. <div class="pl-2 mt-2"><strong>{moment(notification.creation_time).local().fromNow()}</strong></div></ListGroupItem></Link>);
          break;

        case 'commented':
          notificationHTML.push(<Link onClick={e => { this.setState({ showNotification: false }) }} to={`/view/${notification.post_id}`}><ListGroupItem className="each-notification p-3"><i class="fas fa-comments"></i>&nbsp;&nbsp;&nbsp;<Link to={`/profile/${notification.username}`}><strong className="font-weight-bold">{notification.name}</strong></Link> commented <strong className="font-weight-bold">{notification.comment_text}</strong> on <strong className="font-weight-bold">{notification.post_title}</strong>. <div class="pl-2 mt-2"><strong>{moment(notification.creation_time).local().fromNow()}</strong></div></ListGroupItem></Link>);
          break;

        case 'followed':
          notificationHTML.push(<Link onClick={e => { this.setState({ showNotification: false }) }} to={`/profile/${notification.followed_by}`}><ListGroupItem className="each-notification p-3"><i class="fas fa-user-plus"></i>&nbsp;&nbsp;&nbsp;<Link to={`/profile/${notification.followed_by}`}><strong className="font-weight-bold">{notification.followed_by}</strong></Link> started following you. <div class="pl-2 mt-2"><strong>{moment(notification.creation_time).local().fromNow()}</strong></div></ListGroupItem></Link>);
          break;

        case 'unfollowed':
          notificationHTML.push(<Link onClick={e => { this.setState({ showNotification: false }) }} to={`/profile/${notification.followed_by}`}><ListGroupItem className="each-notification p-3"><i class="fas fa-user-minus"></i>&nbsp;&nbsp;&nbsp;<Link to={`/profile/${notification.followed_by}`}><strong className="font-weight-bold">{notification.followed_by}</strong></Link> unfollowed   you. <div class="pl-2 mt-2"><strong>{moment(notification.creation_time).local().fromNow()}</strong></div>  </ListGroupItem></Link>);
          break;

        default:
          break;
      }

      return notificationHTML;
    });

    return (
      <header>
        <div className={`d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm navbar-holder-design justify-content-between ${window.location.pathname.indexOf('login') >= 0 || window.location.pathname.indexOf('register') >= 0 ? "" : "add-gradient"} `}>
          <NavLink className="my-0 banner" to="/trending">
            <img src={Brand} alt="Wyfae Brand" />
          </NavLink>
          {isAuth && (
            <div className="search-bar my-2 mx-5">
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
                  <Scrollbars autoHeight autoHide autoHeightMax={350}>
                    {Results}
                  </Scrollbars>
                </ul>
              </div>
            </div>
          )}
          <nav style={{ position: 'relative' }} className="my-2 my-md-0 mr-md-3 nav-links-h">
            <div className={`${this.state.showNotification ? 'd-grid' : 'd-none'} notifications-holder`}>
              <div className="notifications-header pl-3">
                <span>Notifications</span>
              </div>
              <div className="notifications shadow bg-light">
                {this.state.notifications && this.state.notifications.length > 0 ?
                  <div style={{ maxHeight: "600px", overflowX: "hidden", overflowY: "auto", position: 'relative' }}>
                    <Scrollbars autoHeight autoHide autoHeightMax={600}>
                      <InfiniteScroll
                        loadMore={this.loadFunc.bind(this)}
                        hasMore={this.state.hasMore}
                        useWindow={false}
                        threshold={10}
                        loader={<div className="text-center py-2"> <Loader /></div>}
                      >
                        <ListGroup className="notifications-parent">
                          {notificationsHTML}
                        </ListGroup>
                      </InfiniteScroll>
                    </Scrollbars>
                  </div> :
                  <div>
                    {this.state.showLoading && <div className="text-center py-2"> <Loader /></div>}
                    {this.state.notifications.length == 0 && !this.state.showLoading && <div className="text-center py-2"><strong>No notifications to show.</strong></div>}
                  </div>
                }
              </div>
            </div>
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
                <span className="p-2 text-dark" onClick={this.handleShowNotification.bind(this)}>
                  <IconButton color="default" className="icon-holder2">
                    <i className="fas fa-bell"></i>
                  </IconButton>
                </span>
                <Button onClick={this.handleClick} style={{ color: "white" }}>
                  <img
                    src={`${process.env.REACT_APP_API_ENDPOINT}` + "/" + profile_img}
                    className="img-fluid"
                    id="profile-img-header"
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem className="text-capitalize" onClick={() => {
                    this.handleClose();
                    this.props.history.push('/profile')
                  }}>
                    {first_name}
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
