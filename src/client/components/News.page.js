import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import { Link } from 'react-router-dom';
import '../Styles/News.css';
import arrow_down_img from '../media/arrow_down.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../actions';
import { parseDate } from '../utils/dateUtils';
import Editor from './Editor';
import { seoActions } from '../actions/seoActions';
import { initGA, logPageView } from '../analytics';

const getSeoByUrl = seoActions.getSeoByUrl;
const getArticles = userActions.getArticles;

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedNews: 5
    }
  }

  componentDidMount() {
    const lang = window.location.href.split('/')[3] === 'ua' ? 'ua' : 'ru';
    initGA();
    this.props.getSeoByUrl('news', lang)
    .then(() =>  {
      try{
      logPageView(this.props.getMetaResult.result.title)
    } catch(e) {
      console.log('err')
    }
    });

    this.props.getArticles();
  }

  componentDidUpdate() {
    let that = this;
    // d3.selectAll('.news_post_text_box p, .news_preview_post_text_box')
    //   .each(function(){
    //     let full_text = d3.select(this).node().innerHTML;
    //     let min_text
    //     full_text.length > 300 ?
    //     min_text = full_text.substring(0, 300) :
    //     min_text = full_text;
    //     d3.select(this).node().innerHTML = `${min_text}...`;
    //   });
  }

  newsBlock = article => {
    const lang = window.location.href.split('/')[3] !== 'ua'
    if (lang) {
      if (article.hasRu) {
        return (
          <div className='news_post_box'>
            <div className='news_post_picture_box'>
            <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post${article.url}` : `/post/${article.url}`}><img src={article.mainImage.src} className='news_post_picture' alt={article.mainImage.alt} title={article.mainImage.title} /></Link>
              <div className='news_post_title_box'>
                <span className='news_preview_post_data_box'>
                  {parseDate(article.date).date}
                </span>
                <span className='news_preview_post_time_box'>
                  {parseDate(article.date).time}
                </span>
              </div>
            </div>
            <div className='news_post_text_box'>
              <div>
                <h3>{article.titleRu}</h3>
                <p>{article.descriptionRu}</p>
              </div>
              <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post/${article.url}` :`/post/${article.url}`}><span>Читать дальше</span></Link>
            </div>
            <span className='news_post_background' />
          </div>
        )
      } else if (!article.hasRu) {
        return null
      }
    } else if (!lang) {
      return (
        <div className='news_post_box'>
          <div className='news_post_picture_box'>
          <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post/${article.url}` :`/post/${article.url}`}><img src={article.mainImage.src} className='news_post_picture' alt={article.mainImage.alt} title={article.mainImage.title} /></Link>
            <div className='news_post_title_box'>
              <span className='news_preview_post_data_box'>
                {parseDate(article.date).date}
              </span>
              <span className='news_preview_post_time_box'>
                {parseDate(article.date).time}
              </span>
            </div>
          </div>
          <div className='news_post_text_box'>
            <div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post/${article.url}` :`/post/${article.url}`}  style={{textDecoration: 'none'}}><span>Читати далі</span></Link>
          </div>
          <span className='news_post_background' />
        </div>
      )
    }
  }

  latestBlock = article => {
    const lang = window.location.href.split('/')[3] !== 'ua'
    if (lang) {
      if (article.hasRu) {
        return (
          <div className='news_preview_post'>
            <div className='news_preview_background_box' />
            <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post/${article.url}` :`/post/${article.url}`}>
              <div className='news_preview_post_picture_box'>
                <img src={article.mainImage.src} className='news_post_picture' alt={article.mainImage.alt} title={article.mainImage.title} />
                <div className='news_preview_post_title_box'>
                  <h4>{article.titleRu}</h4>
                  <div>
                    <span className='news_preview_post_data_box'>
                      {parseDate(article.date).date}
                    </span>
                    <span className='news_preview_post_time_box'>
                      {parseDate(article.date).time}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <div className='news_preview_post_text_box'>
              <h3>Новости компании</h3>
              <Editor text={article.descriptionRu} />
            </div>
          </div>
        )
      } else {
        return null
      }
    } else {
      return (
        <div className='news_preview_post'>
          <div className='news_preview_background_box' />
          <Link to={window.location.href.split('/')[3] === 'ua' ? `/ua/post/${article.url}` :`/post/${article.url}`}>
            <div className='news_preview_post_picture_box'>
            <img src={article.mainImage.src} className='news_post_picture' alt={article.mainImage.alt} title={article.mainImage.title} />
              <div className='news_preview_post_title_box'>
                <h4>{article.title}</h4>
                <div>
                  <span className='news_preview_post_data_box'>
                    {parseDate(article.date).date}
                  </span>
                  <span className='news_preview_post_time_box'>
                    {parseDate(article.date).time}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className='news_preview_post_text_box'>
            <h3>Новини компанії</h3>
            <Editor text={article.description} />
          </div>
        </div>
      )
    }
  }

  render() {
    const lang = window.location.href.split('/')[3] !== 'ua'
    const article = this.props.article;
    let metaTags = this.props.getMetaResult && this.props.getMetaResult.result;
    return (
      <div>
          <MetaTags>
          <title>{metaTags && metaTags.title}</title>
          <meta name="description" content={metaTags && metaTags.description} />
          <meta name="keywords" content={metaTags && metaTags.keywords} />
        </MetaTags>
        <div className='news'>
          <Header />
          <ScrollToTop />
          <section>
            <div className='container news_box'>
              <h2>{lang ? 'Новости' : 'Новини'}</h2>
              <div className='news_preview_line'>
                {
                  !article.loadingArtcile
                  && article.loadedArticle
                  && !article.loadingArtcileError
                  && article.articles
                  && [...article.articles].reverse().splice(0, 2).map(article =>
                    this.latestBlock(article)
                  )

                }
              </div>
              <div className="news_preview_pointer">
                <span>{lang ? 'Общий список новостей' : 'Загальний список новин'}</span>
                <img className="arrow_down" src={arrow_down_img} alt='' />
              </div>
            </div>
          </section>
          <section>
            <div className='container post_container'>
              {
                !article.loadingArtcile
                && article.loadedArticle
                && !article.loadingArtcileError
                && article.articles
                && [...article.articles].reverse().splice(0, this.state.loadedNews).map(article =>
                  this.newsBlock(article)
                )
              }
            </div>
          </section>
          <section>
            <div className='container' onClick={() => this.setState({ loadedNews: this.state.loadedNews + 5 })} >
              <div className="news_preview_pointer">
                <span>{lang ? 'Больше новостей' : 'Більше новин'}</span>
                <img className="arrow_down" src={arrow_down_img} alt='' />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
    article: state.articles,
    getMetaResult: state.seo.getSeoByUrlResult
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getArticles,
    getSeoByUrl
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(News);