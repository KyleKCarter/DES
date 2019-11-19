import React, { Component } from 'react';
import './css/reviewLandingPage.css';
import { getReviews, updateEntertainment, increaseJuJu, decreaseJuJu, getJuJu } from '../../Redux/Reducers/ReviewReducer/reviewPageReducer';
import { connect } from 'react-redux';

class ReviewsLandingPage extends Component {
    state = {
        error: false,
        entertainment: this.props.match.params.entertainment
    }

    componentDidMount() {
        this.getReviews();
        this.updateEntertainment();
    }

    updateEntertainment = () => {
        this.props.updateEntertainment(this.state.entertainment)
    }

    getReviews = () => {
        this.props.getReviews(this.state.entertainment);
    }

    postReview = e => {
        this.props.history.push('/user/reviews/post');
    }

    goodJuJu = () => {
        this.props.increaseJuJu();
    }

    badJuJu = () => {
        this.props.decreaseJuJu();
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const mappedReviews = this.props.reviews.map(val => {
            console.log(val);
            // need to add date posted
            return (
                <div className='review_content_box'>
                    <div className='review_juju'>
                        <div onClick={() => this.goodJuJu(val.review_id)}><i class="fas fa-caret-up"></i></div>
                        <div className='juju_number'>{this.props.JuJu}</div>
                        <div onClick={() => this.badJuJu(val.review_id)}><i class="fas fa-caret-down"></i></div>
                    </div>
                    <div className='profile_pic_and_post'>
                        <img className='review_post_profile_pic' src={val.img} alt="profile_pic" />
                        <div className='review_content_box_review'>
                            <h1 className='review_title'>{val.review_title}</h1>
                            <div className='review_username'>By: {val.username}</div>
                            <div className='review_text'>{val.review_text}</div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='review_landing_page'>
                <div className='fake_nav_bar'></div>
                <div className='reviews_landing_page_header'>
                    <button className='review_back_button' onClick={this.goBack}>Back</button>
                    <h1 className='reviews_landing_page_title'>{this.props.match.params.entertainment} Reviews</h1>
                    <button className='review_post_button' onClick={e => this.postReview(e)}>Post</button>
                </div>
                <div className='review_content_area'>{mappedReviews}</div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href = '/user/login' : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.reviews,
        entertainment: state.reviewReducer.entertainment,
        loggedIn: state.authReducer.loggedIn,
        JuJu: state.reviewReducer.JuJu,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps, {
    getReviews,
    updateEntertainment,
    increaseJuJu,
    decreaseJuJu,
    getJuJu
})(ReviewsLandingPage);