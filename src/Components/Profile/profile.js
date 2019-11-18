import React, { Component } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, getUserReviews, updateState, editUserReview, deleteUserReview } from '../../Redux/Reducers/ProfileReducer/profileReducer';

class Profile extends Component {
    state = {
        menuView: 'description',
        editView: false,
        reviewId: ''
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

    editView = (val) => {
        this.setState({ 
            editView: true,
            reviewId: val
         })
    }

    handleChangeEdit = e => {
        this.props.updateState({ [e.target.name]: e.target.value })
    }

    editReview = async() => {
        const {id} = this.props.user
        const {review_title, review_text} = this.props;
        const {reviewId} = this.state;
        await this.props.editUserReview(
            reviewId,
            review_title,
            review_text
            );
        this.setState({ editView: false })
        await this.props.getUserReviews(id);
    }

    deleteReview = async (val) => {
        const { id } = this.props.user
        await this.props.deleteUserReview(val);
        await this.props.getUserReviews(id);
    }

    render() {
        console.log(this.props.review_title)
        console.log(this.props.review_text)
        const { username, review_title, review_text } = this.props;
        const { img, date_joined, bio } = this.props.userProfile;

        const mappedReviews = this.props.userReviews.map(val => {
            return (
                <div className='user_review_content_box_area'>
                    <div className='top_of_review'>
                        <h1 className='user_review_title'>{val.review_title}</h1>
                        <div className='edit_delete'>
                            <i onClick={() => this.editView(val.review_id)} class="fas fa-pen-square"></i>
                            <i onClick={() => this.deleteReview(val.review_id)} class="fas fa-trash-alt"></i>
                        </div>
                    </div>
                    <div className='user_review_username'>By: {val.username}</div>
                    <div>{val.entertainment_service}</div>
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
                        this.state.editView === false
                            ?
                            <>
                                <div className='user_reviews_section'>
                                    <div className='user_review_content_area'>{mappedReviews}</div>
                                </div>
                            </>
                            :
                            this.state.editView === true
                            ?
                            <div>
                                <input placeholder='Title' onChange={this.handleChangeEdit} name='review_title' value={review_title} type="text" />
                                <textarea placeholder='Review' onChange={this.handleChangeEdit} name="review_text" value={review_text} cols="30" rows="10"></textarea>
                                <button onClick={() => this.editReview()}>Submit</button>
                            </div>
                            :
                            null
                        :
                        null
                }
                {this.props.loggedIn === false ? window.location.href = '/user/login' : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        username: state.authReducer.username,
        user: state.authReducer.user,
        userProfile: state.profileReducer.userProfile,
        userReviews: state.profileReducer.userReviews,
        review_title: state.profileReducer.review_title,
        review_text: state.profileReducer.review_text
    }
}

export default connect(mapStateToProps, {
    getUserInfo,
    getUserReviews,
    updateState,
    editUserReview,
    deleteUserReview
})(Profile);