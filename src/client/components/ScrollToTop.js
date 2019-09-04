import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import ButtonUp from '../media/button_up.svg';
import animateScrollTo from 'animated-scroll-to';

export default class extends Component{

    
  topButtonStyle = {
    cursor: 'pointer',
    bottom: 50,
    right: 30,
    transitionDuration: '0.3s',
    transitionTimingFunction: 'linear',
    transitionDelay: 300,
  }


render(){
    return(
        <div className='scroll_to_top' onClick={()=>{animateScrollTo(0)}}>
                <img src={ButtonUp} alt=''/>
        </div>)
}

}