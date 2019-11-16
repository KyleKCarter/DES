import React, { Component } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getUserReviews } from '../../Redux/Reducers/ProfileReducer/profileReducer';

class Profile extends Component {
    state = {
        menuView: 'description'
    }

    componentDidMount() {
        const { id } = this.props.user
        this.props.getUserInfo(id);
        this.props.getUserReviews(id);
    }

    descriptionView = () => {
        this.setState({ menuView: 'description' });
    }

    reviewsView = () => {
        this.setState({ menuView: 'reviews' });
    }

    render() {
        const { username } = this.props;
        const { img, date_joined, bio } = this.props.userProfile;

        const mappedReviews = this.props.userReviews.map(val => {
            return (
                <div className='user_review_content_box_area'>
                    <h1 className='user_review_title'>{val.review_title}</h1>
                    <div className='user_review_username'>By: {val.username}</div>
                    <div className='user_review_text'>{val.review_text}</div>
                </div>
            )
        })

        return (
            <div className='profile_page'>
                <div className='profile_header'>
                    <Link to='/user/profile/settings'><button>Account Settings</button></Link>
                </div>
                <div className='profile_user_information'>
                    <img className='profile_pic' src={img} alt="profile_pic" />
                    <div className='username_date_joined_section'>
                        <h1 className='profile_username'>{username}</h1>
                        <div className='profile_user_date_joined'>{date_joined}</div>
                    </div>
                </div>
                <div className='description_reviews_menu'>
                    <h4 onClick={this.descriptionView}>Description</h4>
                    <h4 onClick={this.reviewsView}>My Reviews</h4>
                </div>
                {
                    this.state.menuView === 'description'
                        ?
                        <>
                            <div className='user_bio_section'>
                                <div className='user_bio'>{bio}</div>
                            </div>
                        </>
                        :
                        null
                }
                {
                    this.state.menuView === 'reviews'
                        ?
                        <>
                            <div className='user_reviews_section'>
                                <div className='user_review_content_area'>{mappedReviews}</div>
                            </div>
                        </>
                        :
                        null
                }
                {/* {this.props.loggedIn === false ? window.location.href = '/user/login' : null} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedIn: state.authReducer.loggedIn,
        username: state.authReducer.username,
        user: state.authReducer.user,
        userProfile: state.profileReducer.userProfile,
        userReviews: state.profileReducer.userReviews
    }
}

export default connect(mapStateToProps, {
    getUserInfo,
    getUserReviews
})(Profile);