import React, { Component } from 'react';
import * as d3 from 'd3';
import Header from './Header';
import '../Styles/Form.css';
import SelectorImg from '../media/selector_arrow.svg';
import CloseButton from '../media/close_button.svg';
import DecorationCircles from '../media/decoration_circles.svg';
import FormDecorationLine from '../media/form_decoration_line.svg';
import { handleError } from '../services/serviceUtils';
import { apiUrl, captchaSiteKey } from '../config';
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from 'react-redux';

const initialState = {
  captcha: null,
  isSubscribed: false,
  mailData: {
    email: '',
    firstName: '',
    secondName: '',
    companyName: '',
    phone: '',
    position: '',
    city: '',
    mailSubject: '',
    message: '',
    attachment: ''
  },
  agreement: false,
  reasonsBoxVisibility: false,
  citiesBoxVisibility: false,
  isSending: false
};

const recaptchaRef = React.createRef();

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: null,
      isSubscribed: false,
      mailData: {
        email: '',
        firstName: '',
        secondName: '',
        companyName: '',
        phone: '',
        position: '',
        city: '',
        mailSubject: '',
        message: ''
      },
      agreement: false,
      reasonsBoxVisibility: false,
      citiesBoxVisibility: false,
      isSending: false
    };
  }

  goBack = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    this.preSets();
  }

  preSets() {
    let that = this;

    that.setCaptchaSize();

    window.addEventListener('resize', function(){
      that.setCaptchaSize();
    })
    d3.select('.d_error_text_success')
      .style('opacity', '0');

    d3.selectAll('.form_check_flag')
      .style('opacity', '0')
      .style('transform', 'scale(1.5)');
    
    d3.select('.form_submit_error')
        .style('display', 'none')
        .style('opacity', '0');

    d3.select('.form_check_box_agreement')
      .on('click', that.checkAgreement.bind(this))
      .on('mouseover', that.mouseOverAgreement.bind(this))
      .on('mouseleave', that.mouseLeaveAgreement.bind(this));

    d3.select('.form_check_box_distribution')
      .on('click', that.checkDistribution.bind(this))
      .on('mouseover', that.mouseOverDistribution.bind(this))
      .on('mouseleave', that.mouseLeaveDistribution.bind(this));
    
    d3.selectAll('.selector_box ul').style('max-height', '0px');
    
    d3.select('.form_reason_selector')
      .on('click', that.checkReasonsBox.bind(this));

    d3.select('.form_city_selector')
      .on('click', that.checkCitiesBox.bind(this));

    d3.selectAll('.form_reasons_box li').on('click', function(){
      d3.select(this).call(that.setReasonValue, 'reason');
      that.checkReasonsBox();
    });
    d3.selectAll('.form_cities_box li').on('click', function(){
      d3.select(this).call(that.setReasonValue, 'city');
      that.checkCitiesBox();
    })
  }

  setCaptchaSize(){
    let window_width = window.innerWidth;
    d3.select('.rc-anchor-normal')
      .style('width', `${window_width > 1200 ? '100%' : '77%'}`);
  }

  sendingAnimationStart = () => {
    let that = this;
    d3.select('.form_sending_box')
      .style('display', 'flex');
    d3.select('.d_erorr_circle').style('display', 'block');
    d3.select('.d_error_text_loading').style('display', 'block');
    d3.select('.form_section')
      .transition().duration(300).ease(d3.easeLinear)
      .style('filter', 'blur(5px)')
      .style('-webkit-filter', 'blur(5px)');
    let totalLength = d3.select('.d_erorr_circle').node().getTotalLength();
    that.setState({ isSending: true }, () => {
      d3.select('.d_erorr_circle').call(that.sendingMail, totalLength, 0, that);
    });
  }

  sendingMail(e, start, end, that){
    if(that.state.isSending){
      e
      .transition().duration(1000).ease(d3.easeLinear)
      .attr("stroke-dasharray", `${start} ${start}`)
      .attr("stroke-dashoffset", start)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on('end', function(){
        d3.select(this).call(that.sendingMail, start, end, that);
      });
    }else{
      d3.select('.d_erorr_circle').style('display', 'none');
      d3.select('.d_error_text_loading').style('display', 'none');
      d3.select('.d_error_text_success')
        .transition().duration(300).ease(d3.easeLinear)
        .style('opacity', '1')
        .on('end', function(){
            d3.timeout(function(){
              d3.select('.d_error_text_success')
              .transition().duration(500).ease(d3.easeLinear)
              .style('opacity', '0')
              .on('end', function(){
                d3.select('.form_sending_box')
                  .style('display', 'none');
                d3.select('.form_section')
                  .transition().duration(300).ease(d3.easeLinear)
                  .style('filter', 'unset')
                  .style('-webkit-filter', 'unset');
              })
            }, 2000);
          });
    }
  }

  showSubmitError(){  /* SUBMIT ERROR  */
    d3.select('.form_submit_error')
        .style('display', 'flex')
        .transition().duration(300).ease(d3.easeLinear)
        .style('opacity', '1')
    d3.timeout(function(){
      d3.select('.form_submit_error')
        .transition().duration(300).ease(d3.easeLinear)
        .style('opacity', '0')
        .on('end', function(){
          d3.select(this).style('display', 'none');
        })
    }, 2000);
  }

  setReasonValue(e, type){
    let selectedValue = e.node().innerHTML;
    d3.select(`${'reason' === type ? '.form_select_reason_box' : '.form_select_city_box' }`)
      .node().innerHTML = selectedValue;
  }

  checkReasonsBox(){ 
    let that = this;

    d3.select('.form_reasons_box')
      .transition().duration(300).ease(d3.easeLinear)
      .style('max-height', `${that.state.reasonsBoxVisibility ? 0 : 150}px`);

    this.setState({reasonsBoxVisibility: !this.state.reasonsBoxVisibility});
  }

  checkCitiesBox(){
    let that = this;

    d3.select('.form_cities_box')
      .transition().duration(300).ease(d3.easeLinear)
      .style('max-height', `${that.state.citiesBoxVisibility ? 0 : 150}px`);

    this.setState({citiesBoxVisibility: !this.state.citiesBoxVisibility});
  }

  mouseOverAgreement() {
    let that = this;
    d3.select('.form_check_box_agreement .form_check_flag')
      .style('opacity', `${that.state.agreement ? 1 : 0.5}`);
  }

  mouseLeaveAgreement() {
    let that = this;
    d3.select('.form_check_box_agreement .form_check_flag')
      .style('opacity', `${that.state.agreement ? 1 : 0}`);
  }

  checkAgreement() {
    let that = this;
    d3.select('.form_check_box_agreement .form_check_flag')
      .transition().duration(100).ease(d3.easeLinear)
      .style('opacity', `${that.state.agreement ? 0 : 1}`)
      .style('transform', `${that.state.agreement ? 'scale(1.5)' : 'scale(1)'}`);
    this.setState({ agreement: !this.state.agreement });
  }

  mouseOverDistribution() {
    let that = this;
    d3.select('.form_check_box_distribution .form_check_flag')
      .style('opacity', `${that.state.isSubscribed ? 1 : 0.5}`);
  }

  mouseLeaveDistribution() {
    let that = this;
    d3.select('.form_check_box_distribution .form_check_flag')
      .style('opacity', `${that.state.isSubscribed ? 1 : 0}`);
  }

  checkDistribution() {
    let that = this;
    d3.select('.form_check_box_distribution .form_check_flag')
      .transition().duration(100).ease(d3.easeLinear)
      .style('opacity', `${that.state.isSubscribed ? 0 : 1}`)
      .style('transform', `${that.state.isSubscribed ? 'scale(1.5)' : 'scale(1)'}`);
    this.setState({ isSubscribed: !this.state.isSubscribed });
  }

  handleChange = event => {
    this.setState({
      mailData: {
        ...this.state.mailData,
        [event.target.name]: event.target.value
      }
    });
  };

  handleCitySelect = event => {
    this.setState({
      mailData: {
        ...this.state.mailData,
        city: event.target.textContent
      }
    });
  };

  handleReasonSelect = event => {
    this.setState({
      mailData: {
        ...this.state.mailData,
        mailSubject: event.target.textContent
      }
    });
  };

  handleCaptcha = res => {
    this.setState({
      captcha: res
    });
  };

  isFormValid = (captcha, agreement, mailData) => {
    
    let mailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let formErrorMessage = document.getElementById('form_error_msg');
    if (mailData.email === '') {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Введіть e-mail.';
      else
        formErrorMessage.textContent = 'Введите e-mail.';
      document.getElementById('email_error_point').style = 'display: block';
      return false;
    } else if (!mailRe.test(mailData.email)) {
      if(!this.props.lang)
        formErrorMessage.textContent = 'E-mail введено некоректно.';
      else
        formErrorMessage.textContent = 'E-mail введен некорректно.';
      document.getElementById('email_error_point').style = 'display: block';
      return false;
    } else if (mailData.firstName === '') {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Введіть ім\'я.';
      else
        formErrorMessage.textContent = 'Введите имя.';
      document.getElementById('first_name_error_point').style = 'display: block';
      return false;
    } else if (mailData.secondName === '') {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Введіть прізвище.';
      else
        formErrorMessage.textContent = 'Введите фамилию.';
      document.getElementById('second_name_error_point').style = 'display: block';
      return false;
    } else if (mailData.companyName === '') {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Введіть назву компанії.';
      else
        formErrorMessage.textContent = 'Введите название компании.';
      document.getElementById('company_name_error_point').style = 'display: block';
      return false;
    } else if (!captcha) {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Підтвердіть, що Ви не робот.';
      else
        formErrorMessage.textContent = 'Подтвердите, что Вы не робот.';
      return false;
    } else if (!agreement) {
      if(!this.props.lang)
        formErrorMessage.textContent = 'Необхідне погодження.';
      else
        formErrorMessage.textContent = 'Необходимо соглашение.';
      return false;
    }
    return true;
  }

  uncheckButtons = () => {
    if (this.state.agreement)
      this.checkAgreement();
    if (this.state.isSubscribed)
      this.checkDistribution();
    d3.select('.form_select_reason_box')
      .node().innerHTML = '';
    d3.select('.form_select_city_box')
      .node().innerHTML = '';
  }

  resetForm = () => {
    for (let pointNode of document.getElementsByClassName('form_error_point'))
      pointNode.style = 'display: none';
    this.uncheckButtons();
    this.setState(initialState);
    recaptchaRef.current.reset();
  }

  handleSubmit = event => {
    event.preventDefault();
    for (let pointNode of document.getElementsByClassName('form_error_point'))
      pointNode.style = 'display: none';
    if(!this.isFormValid(this.state.captcha, this.state.agreement, this.state.mailData)) {
      this.showSubmitError();
      return;
    }
    if (this.state.agreement && this.state.captcha) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          captcha: this.state.captcha,
          isSubscribed: this.state.isSubscribed,
          mailData: this.state.mailData
        })
      };

      let sendStatusEl = document.getElementById('send_status');
      this.sendingAnimationStart();
      return fetch(`${apiUrl}/send-form`, requestOptions)
        .then(res => res.json())
        .then(status => {
          console.log(status);        
          sendStatusEl
            .textContent = !this.props.lang ? 
              'Ваше повідомлення відправлено!' :
              'Ваше сообщение отправлено!';
          this.resetForm();
        })
        .catch(err => {
          console.log(err);
          sendStatusEl
            .textContent = !this.props.lang ? 
              'Сталася помилка при відправці.' :
              'Произошла ошибка при отправлении';
          this.setState({
            isSending: false
          });
          handleError(err);
        });
    }
  };

  render() {
    const lang = window.location.href.split('/')[3] !== 'ua'
    return (
      <div className='form'>
        <Header />
        <div className='form_sending_box'>
            <svg className="d_error_circle_box" viewBox="0 0 250 250">
              <path d="M240.5,108.5" transform="translate(-115 -78)" />
              <path
                className="d_erorr_circle"
                stroke="#86B82A"
                fill="transparent"
                strokeWidth="30"
                transform="translate(-115 -78)"
                d="M334.5,203.5a94.46,94.46,0,1,1,0-1"
              />
              <text className="d_error_text_loading" x="24%" y="52.5%">
                Відправка...
              </text>
              <text id='send_status' className='d_error_text_success' x='-75%' y='52.5%'>
                Ваше повідомлення відправлено!
              </text>
            </svg>
          </div>
        <section className='form_section'>
          <div className='container form_container'>
            <div className='form_box'>
              <h2>{this.props.lang ? 'Свяжитесь с нами':'Зв\'яжіться з Нами'}</h2>
              <div className='form_top_right_decoration_box'>
                <span/>
                <img className='form_close_button' src={CloseButton} onClick={this.goBack} alt=''/>
              </div>
              <img src={DecorationCircles} className='form_bottom_left_decoration_circles' alt=''/>
              <img src={FormDecorationLine} className='form_decoration_line' alt=''/>
              {
                this.props.lang ? <p className='form_description'>Если у Вас есть вопросы или предложение, мы всегда рады Вам помочь</p>
                :  <p className='form_description'>Якщо у Вас є питання чи пропозиції, ми завжди раді Вам допомогти</p>
              }
              <div className='form_inputs_container'>
                <div className='form_inputs_column form_column_3'>
                  <div className='form_input_box'>
                    <label htmlFor='mail'>{this.props.lang ? 'Электронный адрес*' : 'Електронна адреса*'}</label>
                    <input 
                      type='email' 
                      id='mail' 
                      name='email' 
                      value={this.state.mailData.email}
                      onChange={this.handleChange}
                    />
                    <span className='form_error_point' id='email_error_point' style={{ display: 'none' }}/>
                  </div>
                  <div className='form_input_box'>
                    <label htmlFor='firstname'>{this.props.lang ? 'Имя*' : 'Ім\'я*'}</label>
                    <input 
                      type='text' 
                      id='firstname' 
                      name='firstName' 
                      value={this.state.mailData.firstName}
                      onChange={this.handleChange}
                    />
                    <span className='form_error_point' id='first_name_error_point' style={{ display: 'none' }}/>
                  </div>
                  <div className='form_input_box'>
                    <label htmlor='lastname'>{this.props.lang ? 'Фамилия*' : 'Прізвище*'}</label>
                    <input 
                      type='text' 
                      id='lastname' 
                      name='secondName' 
                      value={this.state.mailData.secondName}
                      onChange={this.handleChange}
                    />
                    <span className='form_error_point' id='second_name_error_point' style={{ display: 'none' }}/>
                  </div>
                  <div className='form_input_box'>
                    <label htmlFor='company_name'>{this.props.lang ? 'Название Вашей компании*' : 'Назва вашої компанії*'}</label>
                    <input 
                      type='text' 
                      id='company_name' 
                      name='companyName' 
                      value={this.state.mailData.companyName}
                      onChange={this.handleChange}
                    />
                    <span className='form_error_point' id='company_name_error_point' style={{ display: 'none' }}/>
                  </div>
                  <div className='form_input_box'>
                    <label htmlFor='telephone'>{this.props.lang ? 'Контактный номер' : 'Контактний номер'}</label>
                    <input 
                      type='tel' 
                      id='telephone' 
                      name='phone' 
                      value={this.state.mailData.phone}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='form_inputs_column form_column_3'>
                  <div className='form_input_box'>
                    <label htmlFor='position'>{this.props.lang ? 'Должность' : 'Посада'}</label>
                    <input 
                      id='position'
                      name='position' 
                      value={this.state.mailData.position}
                      onChange={this.handleChange} 
                    />
                  </div>
                  <div className='form_input_box selector_box'>
                    <label>{this.props.lang ? 'Выберите Ваш город' : 'Оберіть ваше місто'}</label>
                    <div className='form_city_selector form_selector_line'>
                      <span className='form_select_city_box'></span>
                      <img src={SelectorImg} alt=''/>
                    </div>
                    <ul className='form_cities_box form_selection_box'>
                      <li onClick={this.handleCitySelect}>Винницкая область, Винница</li>
                      <li onClick={this.handleCitySelect}>Волынская область, Луцк</li>
                      <li onClick={this.handleCitySelect}>Днепропетровская область, Днепр (бывш. Днепропетровск)</li>
                      <li onClick={this.handleCitySelect}>Донецкая область, Донецк</li>
                      <li onClick={this.handleCitySelect}>Житомирская область, Житомир</li>
                      <li onClick={this.handleCitySelect}>Закарпатская область, Ужгород</li>
                      <li onClick={this.handleCitySelect}>Запорожская область, Запорожье</li>
                      <li onClick={this.handleCitySelect}>Ивано-Франковская область, Ивано-Франковск</li>
                      <li onClick={this.handleCitySelect}>Киевская область, Киев</li>
                      <li onClick={this.handleCitySelect}>Кировоградская область, Кропивницкий (бывш. Кировоград)</li>
                      <li onClick={this.handleCitySelect}>Луганская область, Луганск</li>
                      <li onClick={this.handleCitySelect}>Львовская область, Львов</li>
                      <li onClick={this.handleCitySelect}>Николаевская область, Николаев</li>
                      <li onClick={this.handleCitySelect}>Одесская область, Одесса</li>
                      <li onClick={this.handleCitySelect}>Полтавская область, Полтава</li>
                      <li onClick={this.handleCitySelect}>Ровненская область, Ровно</li>
                      <li onClick={this.handleCitySelect}>Сумская область, Сумы</li>
                      <li onClick={this.handleCitySelect}>Тернопольская область, Тернополь</li>
                      <li onClick={this.handleCitySelect}>Харьковская область, Харьков</li>
                      <li onClick={this.handleCitySelect}>Херсонская область, Херсон</li>
                      <li onClick={this.handleCitySelect}>Хмельницкая область, Хмельницкий</li>
                      <li onClick={this.handleCitySelect}>Черкасская область, Черкассы</li>
                      <li onClick={this.handleCitySelect}>Черниговская область, Чернигов</li>
                      <li onClick={this.handleCitySelect}>Черновицкая область, Черновцы</li>
                    </ul>
                  </div>
                  <div className='captcha_box'>  {/*Captcha box*/}
                    <br />
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={captchaSiteKey}
                      onChange={this.handleCaptcha}
                    />
                  </div>
                </div>
                <div className='form_inputs_column form_column_4'>
                  <div className='form_input_box selector_box'>
                    <label>{this.props.lang ? 'По какому поводу обращаетесь' : 'З приводу чого звертаєтесь'}</label>
                    <div className='form_reason_selector form_selector_line'>
                      <span className='form_select_reason_box'></span>
                      <img src={SelectorImg} alt=''/>
                    </div>
                    <ul className='form_reasons_box form_selection_box'>
                      <li onClick={this.handleReasonSelect}>Связаться с sales-представителем</li>
                      <li onClick={this.handleReasonSelect}>Получить документы (документацию)</li>
                      <li onClick={this.handleReasonSelect}>Связаться с технической поддержкой (обратиться в техподдержку)</li>
                      <li onClick={this.handleReasonSelect}>Стать партнёром (предложить партнёрство)</li>
                      <li onClick={this.handleReasonSelect}>Другое</li>
                    </ul>
                  </div>
                  <div className='form_input_box'>
                    <label htmlFor='message'>{this.props.lang ? 'Введите Ваше сообщение' : 'Введіть ваше повідомлення...'}</label>
                    <textarea 
                      id='message'
                      name='message' 
                      value={this.state.mailData.message}
                      onChange={this.handleChange}
                    >
                    </textarea>
                  </div>
                  <div className='form_agreement_box'>
                    <div className='form_check_box form_check_box_agreement'>
                      <div className='form_check_flag'></div>
                    </div>
                    <label>{this.props.lang ? 'Вы согласны с использованием Ваших персональных данных в соответствии с условиями документа?' : 'Ви погоджуєтесь з використанням ваших персональних данних згідно з умовами'} <a href='#'>документу</a> ?</label>
                  </div>
                  <div className='form_agreement_box'>
                    <div className='form_check_box form_check_box_distribution'>
                      <div className='form_check_flag'></div>
                    </div>
                    <label>{this.props.lang ? 'Хочу быть в курсе последних событий' : 'Хочу бути в курсі останніх новин.'}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className='form_submit_button' onClick={this.handleSubmit}>
              <div className='form_submit_error'>
                <p id='form_error_msg'>{this.props.lang ? 'Вы ввели некорректные данные' : 'Ви ввели некоректні данні'}</p>
              </div>
              <span>{this.props.lang ? 'Отправить' : 'Відправити'}</span>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { 
    lang: state.lang,
  }
};


export default connect(mapStateToProps)(Form);