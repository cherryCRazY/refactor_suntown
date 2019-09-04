import React, { Component } from 'react'

import Admin from './Admin';
import AdminGallery from './AdminGallery';
import AdminHeader from './AdminHeader'
import AdminMail from './AdminMail';
import AdminPartners from './AdminPartners';
import SeoPanel from './SeoPanel';

import EquinoxRights from './EquinoxRights';

export default class AdminContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'admin'
    }
  }

  changePage = page => {
    this.setState({page})
  }

  changePannel = () => {
    switch(this.state.page){
      case 'admin':
        return <Admin/>
      case 'admin-gallery':
        return <AdminGallery/>
      case 'admin-partners':
        return <AdminPartners/>
      case 'admin-seo':
        return <SeoPanel/>
      case 'admin-mail':
        return <AdminMail/>
      default:
        return
    }
  }

  render() {
    return (
      <div>
        <AdminHeader routing={this.changePage} currentPage={this.state.page}/>
       {
         this.changePannel()
       }
        <EquinoxRights/>
      </div>
    )
  }
}
