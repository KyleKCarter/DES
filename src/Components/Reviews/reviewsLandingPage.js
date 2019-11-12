import React, { Component } from 'react';
import './css/reviewLandingPage.css';
import { getReviews } from '../../Redux/Reducers/ReviewReducer/reviewPageReducer';
import {connect} from 'react-redux';

class ReviewsLandingPage extends Component {
    state = {
        error: false
    }

    componentDidMount() {
        this.getReviews();
    }

    getReviews = () => {
        this.props.getReviews();
    }

    postReview = e => {
        this.props.history.push('/user/reviews/post');
    }

    goBack = e => {
        this.props.history.goBack()
    }

    render() {
        const mappedReviews = this.props.reviews.map(val => {
            return (
                <div className='review_content_box'>
                    <div>{val.title}</div>
                    <div>{val.review}</div>
                </div>
            )
        })
        return (
            <>
                <div className='reviews_landing_page_header'>
                    <button onClick={e => this.goBack(e)}>Back</button>
                    <h1 className='reviews_landing_page_title'>{this.props.match.params.entertainment} Reviews</h1>
                    <button onClick={e => this.postReview(e)}>Post</button>
                </div>
                <div>{mappedReviews}</div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.reviews
    }
}

export default connect(mapStateToProps, {
    getReviews
})(ReviewsLandingPage);