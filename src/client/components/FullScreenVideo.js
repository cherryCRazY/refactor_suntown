import React, { Component } from 'react';
import * as d3 from 'd3';
import '../Styles/FullScreenPhoto.css';
import video_arrow from '../media/video_arrow.svg';
import CloseButton from '../media/news_close_button.svg';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate() {
    this.preSets();
    let that = this;

    if(d3.select('.full_screen_video_box').select('video').node()){
    if(!d3.select('.full_screen_video_box').select('video').node().paused){
      d3.select('.full_screen_video_box').select('video').node().pause();
    }
    d3.select('.full_screen_video_box').select('video').node().remove();
    }
    d3.select('.full_screen_video_box')
      .append('video')
      .attr('width', '100%')
      .attr('autoPlay', 'autoplay')
      .append('source')
      .attr('src', that.props.url)
      .attr('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

  }

  preSets(){
    let that = this;
    d3.select('.full_screen_video_button').style('display', 'none');
    d3.select('.full_screen_video_box').on('click', function(){
      d3.select(this).call(that.checkFullScreenVideo);
    });
    d3.select('.full_screen_box_video_close').on('click', that.closeFullScreenVideo)
  }

  closeFullScreenVideo(){
    d3.select('video').node().pause();
    d3.select('video').node().currentTime = 0;
    d3.select('.full_screen_video_button').style('display', 'flex');
  }

  checkFullScreenVideo(e) {
    if (e.select('video').node().paused) {
      e.select('video').node().play();
      e.select('.full_screen_video_button').style('display', 'none');
    } else {
      e.select('video').node().pause();
      e.select('.full_screen_video_button').style('display', 'flex');
    }
  }



  render() {
    return (
      <div className='full_screen_box' style={{ display: this.props.visible }}>
          <div className='full_screen_video_box'>
            <div className='full_screen_video_button'>
              <img src={video_arrow} alt='' />
            </div>
          </div>
        <div className='full_screen_box_close full_screen_box_video_close' onClick={() => this.props.showVideo()}>
          <img src={CloseButton} />
        </div>
    </div>)
  }
}
