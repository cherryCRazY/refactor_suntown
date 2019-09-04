import React, { Component } from 'react';
import { apiUrl } from '../../config'


export default class AdminMail extends Component {
  constructor(props){
    super(props);
    this.state = {
      subEmail: '',
      subName: '',
      deletionDate: null,
      success: false
    }
  }

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.id] : e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('subEmail', this.state.email)
    // formData.append('subName', this.state.subName)
    fetch(`${apiUrl}/subscribeMail`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(this.state)
    }).then((e) => this.setState({subEmail: '', subName: '', success: true}))
  }

  render() {
    return (
      <div className="admin">
        <form action="" onSubmit={this.onSubmit}>
        {
          this.state.success &&
          <div style={{color: 'green'}}>
            <h1>Пользователь добавлен!</h1>
          </div>
        }
          <div className='admin_input_line'>
              <h2>Email</h2>
              <input
                className='admin_gallary_input'
                type="email" 
                id="subEmail"
                required
                value={this.state.subEmail} 
                onChange={this.onChange}
              />
            </div>

            <div className='admin_input_line'>
            <h2>Имя</h2>
            <input
              className='admin_gallary_input'
              type="text" 
              id="subName"
              required
              value={this.state.subName} 
              onChange={this.onChange}
            />
          </div>
          <button className="action_button">Click</button>
        </form>
      </div>
    )
  }
}
