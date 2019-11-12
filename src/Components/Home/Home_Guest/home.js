import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <body>
                <div className='content'>
                    <Link to='/user/register'>
                        <button className='button_top'>
                            <p>SIGN UP NOW</p>
                        </button>
                    </Link>
                </div>
                <div className='little_taste'>
                    <div className='little_taste_title'>
                        <h1 className='title_top'>Daily Entertainment Streaming King</h1>
                        <h2>Where entertainment is on your DESK</h2>
                    </div>
                    <div className='little_taste_content'>
                        <div className='little_taste_twitch'>
                            <img className='twitch_symbol' src="https://pmcvariety.files.wordpress.com/2019/09/twitch_logo.jpg?w=1000&h=563&crop=1" alt="twitch_symbol" />
                            <iframe title='Summit player frame' src="https://player.twitch.tv/?channel=summit1g" frameborder="0" allowfullscreen="true" scrolling="no" height="249" width="400"></iframe>
                        </div>
                        <div className='little_taste_mixer'>
                            <img className='mixer_symbol' src="https://media.comicbook.com/2019/04/mixer-1168878-1280x0.jpeg" alt="mixer_symbol" />
                            <iframe title="NepentheZ's player frame" allowfullscreen="true" src="https://mixer.com/embed/player/NepentheZ?disableLowLatency=1" width="400" height="249"> </iframe>
                        </div>
                        <div className='little_taste_youtube'>
                            <img className='youtube_symbol' src="https://www.versionmuseum.com/images/websites/youtube-website/youtube-website%5E2017%5Eyoutube-logo-redesign-cropped.jpg" alt="youtube_symbol" />
                            <iframe title="YouTube video frame" width="400" height="249" src="https://www.youtube.com/embed/4vw73p_6tPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
                <div className='entertainment_offered_and_in_the_work'>
                    <div className='entertainment_logo_section'>
                        <div>
                            <img className='service_logo' src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg" alt="twitch_logo" />
                            <img className='service_logo' src="https://files.startupranking.com/startup/thumb/52553_dae09bc2ebff123b43708bf949cea0cf095281d2_mixer_m.png" alt="mixer_logo" />
                            <img className='service_logo' src="https://www.yachtstarship.com/wp-content/uploads/2016/09/Youtube-Logo-Vector-300x212.png" alt="youtube_logo" />
                        </div>
                        <div>
                            <img className='service_logo' src="https://cdn.vox-cdn.com/thumbor/Yq1Vd39jCBGpTUKHUhEx5FfxvmM=/39x0:3111x2048/1200x800/filters:focal(39x0:3111x2048)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png" alt="netflix_logo" />
                            <img className='service_logo' src="https://icon-library.net/images/hbo-go-icon/hbo-go-icon-6.jpg" alt="hboGo_logo" />
                            <img className='service_logo' src="https://d1.awsstatic.com/case-studies/600x400_amazon-prime-video_Logo.90fb8f16b76b14ffaa6e5c5f5e6ede7eaa23db75.png" alt="prime_video" />
                            <img className='service_logo' src="https://cdn.brandfolder.io/F97BMUF5/as/puee7j-5t3vuw-1nmo6c/Image_uploaded_from_iOS__8_1503433270.jpg" alt="hulu_logo" />
                            <img className='service_logo' src="https://i0.wp.com/thegeekswarm.com/wp-content/uploads/2019/11/disney-plus-logo.jpg?fit=1000%2C563&ssl=1" alt="disneyPlus_logo" />
                            <img className='service_logo' src="https://pmcvariety.files.wordpress.com/2013/11/amc-logo.jpg?w=1000&h=563&crop=1" alt="amc_logo" />
                            <img className='service_logo' src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_TNT_Series.png" alt="tnt_logo" />
                            <img className='service_logo' src="https://i.ytimg.com/vi/g88H8xpS7OI/maxresdefault.jpg" alt="fx_logo" />
                        </div>
                    </div>
                    <div className='text_section'>
                        <p>ENTERTAINMENT AVAILABLE NOW</p>
                        <p>__________________________________________</p>
                        <p>ENTERTAINMENT OF THE FUTURE</p>
                        <div>DESK</div>
                    </div>
                </div>
                <div className='button_footer'>
                    <p className='above_button'>Entertainment is King</p>
                    <Link to='/user/register'>
                        <button className='button'>
                            <p>SIGN UP NOW</p>
                        </button>
                    </Link>
                </div>
            </body>
        )
    }
}

export default Home;