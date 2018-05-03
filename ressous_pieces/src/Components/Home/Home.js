import React, { Component } from 'react';
import './Home.css';
import Mockup from '../rp_mockup_iphone.png';
import Record1 from '../../rp_record1.mp4';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
  } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import ReallySmoothScroll from 'really-smooth-scroll';

ReallySmoothScroll.shim();

var durationFn = function(deltaTop) {
    return deltaTop;
};

class Home extends Component {

scrollFunc(val){
    window.scrollTo(0,val)
}


    render() {
        return (
            <div className='appHome'>
                <div className='heroSection'>
                    <div className='titleSection'>
                        <div className='headingSection'>
                            <h1>manage your professional development</h1>
                            <h4>Ressous Pieces  </h4>
                            <button className='btn scrollButton' onClick={() => this.scrollFunc(800)}>Get Started</button>
                        </div>
                    </div>
                    <div className='mockupSection'>
                        <img className='mockup' src={Mockup} alt='mockup'/>
                    </div>
                </div>
                <div className='tutorialSection'>
                {/*<div className='titleContainer'>
                    <h1>how does it work</h1>
                    <hr/>
                    <h3>organizing and keeping track of your ressources</h3>
        </div>*/}
                    <div className='section'>
                        <div className='step'>
                            <div className='number'>
                                <span>1</span>
                            </div>
                            <div>
                                <h6>create a Workspace</h6>
                            </div>
                        </div>
                        <div className='clip'>
                            <Player loop='true' ref="player" fluid='false' width='100px' autoPlay='true' muted='true'>
                                <source src={Record1} />
                                <ControlBar disabled />
                            </Player>
                        </div>
                    </div>
                    <div className='section'>
                        <div className='step'>
                            <div className='number'>
                                <span>2</span>
                            </div>
                            <div>
                                <h6>store Articles, Projects and Topics</h6>
                            </div>
                        </div>
                        <div className='clip'>
                            <Player loop='true' ref="player" fluid='false' width='100px' autoPlay='true' muted='true'>
                                <source src={Record1} />
                                <ControlBar disabled />
                            </Player>
                        </div>
                    </div>
                    <div className='section'>
                        <div className='step'>
                            <div className='number'>
                                <span>3</span>
                            </div>
                            <div>
                                <h6>work on Practice Problems and check off Topics</h6>
                            </div>
                        </div>
                        <div className='clip'>
                            <Player loop='true' ref="player" fluid='false' width='100px' autoPlay='true' muted='true'>
                                <source src={Record1} />
                                <ControlBar disabled />
                            </Player>
                        </div>
                    </div>
                    <div className='section'>
                        <div className='step'>
                            <div className='number'>
                                <span>5</span>
                            </div>
                            <div>
                                <h6>explore Ressources from other People and use them</h6>
                            </div>
                        </div>
                        <div className='clip'>
                            <Player loop='true' ref="player" fluid='false' width='100px' autoPlay='true' muted='true'>
                                <source src={Record1} />
                                <ControlBar disabled />
                            </Player>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;