import React, { Component } from 'react';
import './css/reviewPostPage.css';
import { updateState, resetFields, addReview } from '../../Redux/Reducers/ReviewReducer/postReducer';
import {connect} from 'react-redux';

class ReviewPostPage extends Component {
    state = {
        error: false
    }

    handleChange = (e) => {
        this.props.updateState({ [e.target.name]: e.target.value })
    }

    addReview = e => {
        // e.preventDefault();
        const { entertainment, title, review } = this.props;
        this.props.addReview(
            entertainment,
            title,
            review
        ).then(() => {
            this.props.history.push(`/user/reviews/${this.props.entertainment}`)
        }).catch(() => {
            this.setState({ error: true })
        })
    }

    render() {
        const {title, review, entertainment} = this.props;
        return (
            <div className='post_page'>
                <h1>Post A Review</h1>
                <div className='content_box'>
                    <div className='post_title'>
                        <div className='title_left'>
                            <h3>Title:</h3>
                            <input className='title_field' type="text" onChange={this.handleChange} name="title" value={title} />
                        </div>
                        <div className='title_right'>
                            <select className='selector' onChange={this.handleChange} name="entertainment" value={entertainment}>
                                <option value="---">---</option>
                                <option value='Twitch'>Twitch</option>
                                <option value='Mixer'>Mixer</option>
                                <option value='YouTube'>YouTube</option>
                            </select>
                        </div>
                    </div>
                    <div className='text_box'>
                        <h3>Review:</h3>
                        <input className='review_field' type="text" onChange={this.handleChange} name='review' value={review} />
                    </div>
                    <button className='post_button' onClick={e => this.addReview()}>Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        title: state.postReducer.title,
        review: state.postReducer.review,
        entertainment: state.postReducer.entertainment
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    addReview
})(ReviewPostPage);