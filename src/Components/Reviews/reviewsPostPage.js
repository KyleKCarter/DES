import React, { Component } from 'react';
import './css/reviewPostPage.css';
import { updateState, resetFields, addReview } from '../../Redux/Reducers/ReviewReducer/postReducer';
import { connect } from 'react-redux';

class ReviewPostPage extends Component {
    state = {
        error: false
    }

    handleChange = (e) => {
        this.props.updateState({ [e.target.name]: e.target.value })
    }

    addReview = () => {
        console.log(this.props.entertainment)
        const { entertainment, title, username, review } = this.props;
        this.props.addReview(
            entertainment,
            title,
            username,
            review
        ).then(() => {
            this.props.history.push(`/user/reviews/${this.props.entertainment}`)
        }).catch(() => {
            this.setState({ error: true })
        })
    }

    cancelPost = () => {
        this.props.history.goBack();
    }

    render() {
        const { title, username, review } = this.props;
        return (
            <div className='post_page'>
                <div className='fake_nav_bar'></div>
                <h1 className='post_a_review_page_top'>Post A Review</h1>
                <div className='content_box'>
                    <div className='post_title'>
                        <div className='title_left'>
                            <h3>Title:</h3>
                            <input className='title_field' type="text" onChange={this.handleChange} name="title" value={title} />
                        </div>
                        <div className='title_right'>
                            <select className='selector' onChange={this.handleChange} name="entertainment">
                                <option value="---">---</option>
                                <option value='Twitch'>Twitch</option>
                                <option value='Mixer'>Mixer</option>
                                <option value='YouTube'>YouTube</option>
                            </select>
                        </div>
                    </div>
                    <div className='username_input_review'>
                        <h3>Username:</h3>
                        <input className='username_input_review_field' type="text" onChange={this.handleChange} name="username" value={username} />
                    </div>
                    <div className='text_box'>
                        <h3>Review:</h3>
                        <textarea className='review_field' onChange={this.handleChange} name="review" value={review} cols="30" rows="10"></textarea>
                    </div>
                    <div className='bottom_buttons'>
                        <button className='cancel_button' onClick={this.cancelPost}>Cancel</button>
                        <button className='post_button' onClick={this.addReview}>Post</button>
                    </div>
                </div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href='/user/login' : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        title: state.postReducer.title,
        username: state.postReducer.username,
        review: state.postReducer.review,
        entertainment: state.postReducer.entertainment,
        loggedIn: state.authReducer.loggedIn,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    addReview
})(ReviewPostPage);