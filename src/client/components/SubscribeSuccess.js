import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../Styles/CancelSubscription.css';
import { apiUrl } from '../config';

class SubscribeSuccess extends Component {
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

    fetch(`${apiUrl}/verify${query}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        document.getElementById('subscription_status')
          .textContent = res.message;
      });
  }

  render() {
    return (
      <div className='cancel_subscription'>
        <Header />
        <section className='cancel_section'>
          <div className='container cancel_container'>
            <h2 id='subscription_status' className='cancel_text'>
              E-mail адрес успешно подтвержден.
            </h2>
            <h2 className='cancel_text'>
              Спасибо!
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

export default SubscribeSuccess;