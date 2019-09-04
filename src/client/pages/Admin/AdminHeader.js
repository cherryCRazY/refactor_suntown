import React, { Component } from 'react';
import logo from '../../media/logo.png';

export default class AdminHeader extends Component {
  render() {
    return (
      <div className='admin_header_box'>
        <div className='admin_logo_box'>
          <img src={logo}/>
        </div>
        <ul className='admin_header_list'>
          <li>
            <button className='admin_header_button' style={{boxShadow: `0px 0px 4px ${this.props.currentPage === 'admin-gallery' ? 'blue' : 'black'}`}} 
              onClick={() => this.props.routing('admin-gallery')}>Gallery</button>
          </li>
          <li>
            <button className='admin_header_button' style={{boxShadow: `0px 0px 4px ${this.props.currentPage === 'admin' ? 'blue' : 'black'}`}}
              onClick={() => this.props.routing('admin')}>News</button>
          </li>
          <li>
            <button className='admin_header_button' style={{boxShadow: `0px 0px 4px ${this.props.currentPage === 'admin-seo' ? 'blue' : 'black'}`}}
              onClick={() => this.props.routing('admin-seo')}>Seo</button>
          </li>
          <li>
            <button className='admin_header_button' style={{boxShadow: `0px 0px 4px ${this.props.currentPage === 'admin-partners' ? 'blue' : 'black'}`}}
              onClick={() => this.props.routing('admin-partners')}>Partners</button>
          </li>
          <li>
            <button className='admin_header_button' style={{boxShadow: `0px 0px 4px ${this.props.currentPage === 'admin-mail' ? 'blue' : 'black'}`}}
              onClick={() => this.props.routing('admin-mail')}>Mail</button>
          </li>
        </ul>
      </div>
    )
  }
}
