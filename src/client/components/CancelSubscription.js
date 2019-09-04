import React, { Component } from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../Styles/CancelSubscription.css';
import { apiUrl } from '../config';
import axios from "axios"

class CancelSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET'
    };

    let query = window.location.search;
    

    axios(`${apiUrl}/verify${query}`, requestOptions)
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className='cancel_subscription'>
        <Header />
        <section className='cancel_section'>
          <div className='container cancel_container'>
            <h2 className='cancel_text'>
              Вы отписаны от новостей <span className='company_color'>Сантаун</span>
            </h2>
            <h2 className='cancel_text'>
              Жаль, что Вы больше не с нами.
            </h2>
            <Link to={window.location.href.split('/')[3] === 'ua' ? '/ua/' : '/'}>
              <div className='error_return_button'>
                <span>На главную</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

export default CancelSubscription;