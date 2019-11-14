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
            // console.log(val);
            // need to add date posted
            return (
                <div className='review_content_box'>
                    <div className='review_juju'>
                        {/* <div>{`&#9650`}</div> */}
                        {/* <div>{`&#9660`}</div> */}
                        <div onClick={() => this.goodJuJu(val.review_id)}>^</div>
                        <div>{this.props.JuJu}</div>
                        <div onClick={() => this.badJuJu(val.review_id)}>v</div>
                    </div>
                    <div className='review_content_box_review'>
                        <h1 className='review_title'>{val.review_title}</h1>
                        <div className='review_username'>By: {val.username}</div>
                        <div className='review_text'>{val.review_text}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className='review_landing_page'>
                <div className='reviews_landing_page_header'>
                    <button onClick={this.goBack}>Back</button>
                    <h1 className='reviews_landing_page_title'>{this.props.match.params.entertainment} Reviews</h1>
                    <button onClick={e => this.postReview(e)}>Post</button>
                </div>
                <div className='review_content_area'>{mappedReviews}</div>
                {this.props.loggedIn === false ? window.location.href = '/user/login' : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.reviewReducer.reviews,
        entertainment: state.reviewReducer.entertainment,
        loggedIn: state.authReducer.loggedIn,
        JuJu: state.reviewReducer.JuJu
    }
}

export default connect(mapStateToProps, {
    getReviews,
    updateEntertainment,
    increaseJuJu,
    decreaseJuJu,
    getJuJu
})(ReviewsLandingPage);