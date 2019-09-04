import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import * as d3 from 'd3';
import mail_icon from '../media/mail_icon.png';
import telephone_icon from '../media/telephone_icon.png';
import price_picture from '../media/price_picture.png';
import europe_map from '../media/europe_map.png';
import europe_map_ru from '../media/europe_map_ru.png';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../Styles/Contacts.css';
import { connect } from 'react-redux';
import { seoActions } from '../actions/seoActions';
import { initGA, logPageView } from '../analytics';

const getSeoByUrl = seoActions.getSeoByUrl;

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    initGA();
    const lang = window.location.href.split('/')[3] === 'ua' ? 'ua' : 'ru';
    this.props.getSeoByUrl('contacts', lang)
    .then(() =>  {
      try{
      logPageView(this.props.getMetaResult.result.title)
    } catch(e) {
      console.log('err')
    }
    });

    d3.selectAll('.contacts_icon path').attr('stroke', `${document.body.clientWidth < 800 ? '#9ED831' : '#000'}`);
    d3.selectAll('.contacts_icon line').attr('stroke', `${document.body.clientWidth < 800 ? '#9ED831' : '#000'}`);
    window.addEventListener("resize", function () {
      d3.selectAll('.contacts_icon path').attr('stroke', `${document.body.clientWidth < 800 ? '#9ED831' : '#000'}`);
      d3.selectAll('.contacts_icon line').attr('stroke', `${document.body.clientWidth < 800 ? '#9ED831' : '#000'}`);
    });
  }


  render() {
    const lang = window.location.href.split('/')[3] !== 'ua'
    let metaTags = this.props.getMetaResult && this.props.getMetaResult.result;
    return (
      <div>
        {
        lang ? 
          <MetaTags>
          <title>{metaTags && metaTags.titleRu}</title>
          <meta name="description" content={metaTags && metaTags.descriptionRu} />
          <meta name="keywords" content={metaTags && metaTags.keywordsRu} />
          </MetaTags>
          : 
          <MetaTags>
          <title>{metaTags && metaTags.title}</title>
          <meta name="description" content={metaTags && metaTags.description} />
          <meta name="keywords" content={metaTags && metaTags.keywords} />
        </MetaTags>
      }
        <div className='contacts'>
          <Header />
          <section className='contacts_section'>
            <div className='container contacts_advantages_box'>
              <div className='contacts_advantages'>
                {
                  !lang ? <h2>Дізнайтеся як Ви можете використати <span className='company_color'>переваги</span> нашої системи у своєму бізнесі…</h2>
                    : <h2>Узнайте как Вы можете использовать <span className='company_color'>преимущества</span> нашей системы в своем бизнесе…</h2>

                }
                <div className='contacts_icons_box'>
                  <div>
                    <div className='contacts_icon'>
                      <svg className='contacts_advantages_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.983 73.701">
                        <g transform="translate(0 .003)" opacity="0.581">
                          <path d="M74.484,40.4,37.96,59.135,1.5,40.4" transform="translate(0 -14.251)"
                            fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="3" />
                          <path d="M74.484,26.149,37.96,1.8,1.5,26.149v43.9A2.127,2.127,0,0,0,3.645,72.2H72.339a2.127,2.127,0,0,0,2.145-2.145Z"
                            fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="3" />
                          <path d="M41.8,71l9.084,4.668a4.551,4.551,0,0,0,3.911,0L63.878,71" transform="translate(-14.879 -25.549)"
                            fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
                          <path d="M67.106,46.741V32.8H29.7V46.741" transform="translate(-10.411 -11.445)"
                            fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="3" />
                          <line x2="21.132" transform="translate(27.426 28.104)" fill="none" stroke="#000"
                            strokeMiterlimit="10" strokeWidth="3" />
                          <line x2="21.132" transform="translate(27.426 33.655)" fill="none" stroke="#000"
                            strokeMiterlimit="10" strokeWidth="3" />
                        </g>
                      </svg>
                    </div>
                    <p>sales@suntown-ukraine.com</p>
                  </div>
                  <div>
                    <div className='contacts_icon'>
                      <svg className='contacts_advantages_icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 73.952 73.992'>
                        <path d='M71.2,58.017,59.579,46.4a4.147,4.147,0,0,0-5.879,0l-5.808,5.808a4.317,4.317,0,0,1-5.454.637A68.011,68.011,0,0,1,20.975,31.455,4.484,4.484,0,0,1,21.613,26l5.879-5.879a4.147,4.147,0,0,0,0-5.879L15.875,2.7A4.147,4.147,0,0,0,10,2.7L3.125,9.568A5.5,5.5,0,0,0,1.85,15.447a95.123,95.123,0,0,0,56.6,56.6,5.634,5.634,0,0,0,5.879-1.275L71.2,63.9A4.281,4.281,0,0,0,71.2,58.017Z'
                          transform='translate(.088 .025)' fill='none' stroke='#000' strokeLinecap='round'
                          strokeLinejoin='round' strokeMiterlimit='10' strokeWidth='3' opacity='0.542' />
                      </svg>
                    </div>
                    <p>+38 (050) 533 78 57</p>
                  </div>
                </div>
              </div>
              <div className='contacts_price_image_box'>
                <div className='contacts_background' />
                <img src={price_picture} alt='' />
              </div>
              <Link to={window.location.href.split('/')[3] === 'ua' ? '/ua/form' : '/form'}>
                <div className='contacts_external_puls_ring'>
                  <div className='contacts_internal_puls_ring'>
                    <p>{!lang ? 'Готові замовити' : 'Готовы заказать?'}?</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
          <section className='contacts_section'>
            <div className='container'>
              {
                !lang ? <h2>Місця нашої <span className='company_color'>дислокації</span></h2>
                  : <h2>Места нашей <span className='company_color'>дислокации</span></h2>
              }
              <div className='contacts_position_box'>
                <div className='contacts_map_box'>
                  <img className='contacts_map' src={lang ? europe_map_ru : europe_map} alt='' />
                </div>
                <div className='contacts_map_description'>
                  {
                    !lang ? <h3>Ми прагнемо бути якомога ближче до наших клієнтів. Ви можете знайти наші представництва в <span className='company_color'>Києві, Одесі,Харкові.</span></h3>
                      : <h3>Мы хотим быть как можно ближе к нашим клиентам. Вы можете найти наши представительства в <span className='company_color'>Киеве, Одессе, Харькове.</span></h3>
                  }
                  <span />
                </div>
              </div>
            </div>
          </section>
          <footer className='footer'>
            <div>
              <p>{!lang ? 'Всі права захищені 2019 © SunTown' : 'Все права защищены 2019 © SunTown'}</p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    lang: state.lang,
    getMetaResult: state.seo.getSeoByUrlResult
  };
};

export default connect(mapStateToProps, { getSeoByUrl })(Contacts);