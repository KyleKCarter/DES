import React, {Component} from 'react';
import { updateFollows } from '../../Redux/Reducers/EntertainmentReducers/twitchReducer';
import { connect } from 'react-redux';

class TwitchLandingPage extends Component {
    state = {
        follows: {}
    }

    componentDidMount = () => {
        this.props.updateFollows()
    }

    render() {
        console.log(this.props.follows);
        return (
            <div className='twitch_user_landing_page'>
                <div className='twitch_user_content'>Twitch Landing Page</div>
                {/* <div>{mappedFollows}</div> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        follows: state.TwitchReducer.follows
    }
}

export default connect(mapStateToProps, {
    updateFollows
})(TwitchLandingPage);