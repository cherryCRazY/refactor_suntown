import React, { Component } from 'react';
import equinox_logo from '../../media/equinox_logo.png';

export default class extends Component{



render(){
  
    return(
        <div className='admin_equinox_rights'>
            <p>Розроблено командою Equinox</p>       
            <img src={equinox_logo}/> 
        </div>
    )
}

}