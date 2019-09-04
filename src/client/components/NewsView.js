import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Header from './Header';
import { Link } from 'react-router-dom';
import ButtonReturn from '../media/news_return.svg';
import ButtonClose from '../media/news_close_button.svg';
import ButtonUp from '../media/button_up.svg';
import animateScrollTo from 'animated-scroll-to';
import '../Styles/NewsView.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../actions';
import { parseDate } from '../utils/dateUtils';
import Editor from './Editor';
import { seoActions } from '../actions/seoActions';
import { Redirect } from 'react-router';
import { initGA, logPageView } from '../analytics';

const getArticleSeoByUrl = seoActions.getArticleSeoByUrl;
const getArticles = userActions.getArticles;

class NewsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundVisible: true
    }
  }

  topButtonStyle = {
    position: 'relative',
    top: 0,
    cursor: 'pointer',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s'
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!nextProps.article.error && nextProps.article.articles && nextProps.article.selectedArticleByUrl === undefined && !nextProps.article.doneSorting) {
      this.props.getSelectedArticleByUrl(this.props.match.params.url);
    }
  }

  componentDidMount() {
    // if(!this.props.article.selectedArticleByUrl.hasRu){
    //   if(lang)
    //   return
    // }
    initGA();
    let path = window.location.pathname;
    const lang = window.location.href.split('/')[3] !== 'ua'
    const postUrl = path.substring(lang ? 6 : 9 , path.length)
    console.log(postUrl)
    this.props.getArticleSeoByUrl(postUrl)
      .then(() => {
        try {
          logPageView(this.props.getMetaResult.result.title)
        } catch(e) {
          console.log(e)
        }        
      }
      );
    this.props.getArticles();
    this.preSets();
  }

  preSets() {
    let that = this;
  }

  render() {
    const lang = window.location.href.split('/')[3] !== 'ua'
    if (this.props.article.selectedArticleByUrl) {
      if(lang){
        if(!this.props.article.selectedArticleByUrl.hasRu){
          return <Redirect to={window.location.href.split('/')[3] !== 'ua' ? '/ua/news' : '/news'}/>
        }
      }
      let metaTags = this.props.getMetaResult && this.props.getMetaResult.result;
      const article = this.props.article.selectedArticleByUrl;
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
          <div className='news_view'>
            <Header />
            <section className='d_news_title_picture_box'>
              <div className='container'>
                <img className='d_news_title_picture' src={article.mainImage.src} alt={article.mainImage.alt} title={article.mainImage.title}/>
              </div>
            </section>
            <section className='m_news_title_picture_box'>
              <img className='m_news_view_title_picture' src={article.mainImage.src} alt={article.mainImage.alt} title={article.mainImage.title}/>
              <div className='m_news_view_title_box'>
                <div className='m_news_view_title_left_box'>
                  <span className='m_news_view_date_point' />
                  <div className='m_news_date_box'>
                    <span>
                      {parseDate(article.date).date}
                    </span>
                    <span>
                      {parseDate(article.date).time}
                    </span>
                  </div>
                </div>
                <div className='m_news_view_title_right_box'>
                  <span />
                  <span />
                </div>
              </div>
            </section>
            <section>
              <div className='container news_view_container'>
                <div className='news_view_top_box'>
                  <h2>{lang ? article.titleRu : article.title}</h2>
                  <div className='news_view_date_box'>
                    <span className='news_view_date_point' />
                    <span className='news_view_date'>
                      {parseDate(article.date).date}
                    </span>
                    <span className='news_view_time'>
                      {parseDate(article.date).time}
                    </span>
                  </div>
                  <span className='blur_background' />
                  <Link to={window.location.href.split('/')[3] === 'ua' ?'/ua/news' : '/news'}>
                    <img src={ButtonReturn} className='news_view_return' alt='' />
                  </Link>
                  <div className='news_view_top_decoration_circle'>
                    <span />
                    <span />
                  </div>
                </div>
                <div className='news_view_middle_box'>
                  <div className='news_view_middle_decorate'>
                    <span />
                  </div>
                  <div className='news_view_middle_text'>
                    <p>{lang ? article.descriptionRu : article.description}</p>
                  </div>
                  <span className='blur_background' />
                </div>
                <div className='news_view_bottom_box'>
                  <div className='m_view_bottom_text_top_line'>
                    <div />
                    <div />
                  </div>
                  <div className='news_view_bottom_text'>
                    <Editor text={lang ? article.contentRu : article.content} />
                  </div>
                  <span className='blur_background' />
                </div>
                <div className='news_view_control_panel'>
                  <div onClick={() => { animateScrollTo(0) }} className='news_view_button_box'>
                    <img src={ButtonUp} alt='' />
                  </div>
                  <div className='news_view_button_box'>
                    <Link to={window.location.href.split('/')[3] === 'ua' ? '/ua/news' : '/news'}>
                      <img src={ButtonClose} alt='' />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <footer className='footer'>
              <div>
                <p>{lang ? 'Все права защищены 2019 © SunTown' : 'Всі права захищені 2019 © SunTown'}</p>
              </div>
            </footer>
          </div>
        </div>
      )
    } else if (!this.props.article.doneSorting) {
      return null
    } else {
      // return <Redirect to='/error' />
    }
  }
}


const mapStateToProps = (state) => {
  return {
    article: state.articles,
    lang: state.lang,
    getMetaResult: state.seo.getArticleSeoByUrlResult
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getArticles,
    getArticleSeoByUrl,
    getSelectedArticleByUrl: url => dispatch({ url, type: 'GET_SELECTED_ARTICLE_BY_URL' }),
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(NewsView);

