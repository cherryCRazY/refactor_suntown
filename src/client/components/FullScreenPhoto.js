import React, { Component } from 'react';
import * as d3 from 'd3';
import '../Styles/FullScreenPhoto.css';
import CloseButton from '../media/news_close_button.svg';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    this.preSets();
  }

  preSets(){
    let that = this;
    d3.selectAll('.full_screen_video_box').on('click', function(){
      d3.select(this).call(that.checkVideo)}
    );
    d3.select('.full_screen_description_box')
      .style('opacity', '0');
    d3.select('.full_screen_picture_box')
      .on('mouseleave', function(){
        d3.select(this).call(that.showDescription, true);
      })
      .on('mouseover',function(){
        d3.select(this).call(that.showDescription, false);
      });
  }

  showDescription(e, visible){
    d3.select('.full_screen_description_box')
      .transition().duration(300).ease(d3.easeLinear)
      .style('opacity', `${visible ? 1 : 0}`);
  }


  render() {
    return (
      <div className='full_screen_box' style={{ display: this.props.visible }}>
        <div className='full_screen_picture_box'>
          {this.props.url &&
            <img src={this.props.url} />
          }
          <div className='full_screen_description_box'>
            {this.props.description &&
              <p>
                {this.props.description}
              </p>
            }
          </div>
        </div>
        <div className='full_screen_box_close' onClick={() => this.props.showPicture()}>
          <img src={CloseButton} />
        </div>
      </div>)
  }
}