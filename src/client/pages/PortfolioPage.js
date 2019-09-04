import React, { Component } from 'react';
import * as d3 from 'd3';

import Picture from '../media/logo.png';
import '../Styles/Portfolio.css';
import video_arrow from '../media/video_arrow.svg';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { galleryActions } from '../actions/galleryActions';
import { partnersActions } from '../actions/partnersActions';
import { fileUrl } from '../config';
import { seoActions } from '../actions/seoActions';
import { initGA, logPageView } from '../analytics';


//Components

import SEO from '../components/SEO'
import ScrollToTop from '../components/ScrollToTop';
import FullScreenPhoto from '../components/FullScreenPhoto';
import FullScreenVideo from '../components/FullScreenVideo';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Editor from '../components/Editor';



const getSeoByUrl = seoActions.getSeoByUrl;
const getGalleryPosts = galleryActions.getGalleryPosts;
const getPartners = partnersActions.getPartners;


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreenPhoto: true,
      isFullScreenVideo: true,
      fullScreenPhotoUrl: '',
      fullScreenVideoUrl: '',
      fullScreenDescription: '',
      videoPoster: ''
    }
  }

  componentDidMount() { 
    const lang = this.props.location.pathname.includes("/ua") ? "ua" : "ru";
    initGA();
    this.props.getSeoByUrl('portfolio', lang)
      .then(() => {
        try {
          logPageView(this.props.getMetaResult.result.title)
        } catch(e) {
          console.log(e)
        }
      });

    this.props.getGalleryPosts();
    this.props.getPartners();
  }

  componentDidUpdate() {
    this.preSets();
  }

  splitTextFirstHalf = text => {
    let firstHalfArray = text.split(' ');
    let half = firstHalfArray.length > 1 ? firstHalfArray.length / 2 : 1
    let firstHalf = firstHalfArray.slice(0, half).join(' ');
    return firstHalf
  }

  splitTextSecondHalf = text => {
    let secondHalfArray = text.split(' ');
    let half = secondHalfArray.length > 1 ? secondHalfArray.length / 2 : 1
    let secondHalf = secondHalfArray.slice(half, secondHalfArray.length).join(' ');
    return secondHalf
  }

  partnerBlock = (partner) => {
    const lang = !this.props.location.pathname.includes("/ua")
    if (lang) {
      if (partner.hasRu) {
        return (
          <section>
            <div className='portfolio_company_container' key={partner._id}>
              <div className='container'>
                <h2>{partner.companyRu}</h2>
                <div className='portfolio_company_info_box'>
                  <span className='portfolio_company_info_background' />
                  <div className='portfolio_company_title_image_box'>
                    <img src={partner.mainImage.src} alt={partner.mainImage.alt} title={partner.mainImage.title}/>
                  </div>
                  <div className='portfolio_company_main_info'>
                    <Editor text={this.splitTextFirstHalf(partner.descriptionRu)} />
                    {partner.video ? <div className='portfolio_company_video_box'>
                      <h3 className='portfolio_partner_video_name'>{partner.videoNameRu}</h3>
                      <div className='portfolio_video_wrap'>
                        <div className='portfolio_video_button'>
                          <img src={video_arrow} alt='' />
                        </div>
                        <video muted='muted'>
                          <source src={fileUrl + partner.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                          Тег video не поддерживается вашим браузером.
                          <a href="video/duel.mp4">Скачайте видео</a>
                        </video>
                      </div>
                    </div> : null}
                    <div className='portfolio_compant_bottom_description'>
                      <Editor text={this.splitTextSecondHalf(partner.descriptionRu)} />
                    </div>
                  </div>
                  <div className='portfolio_company_gallery_right'>
                    <div className='portfolio_company_gallery_sub_box'>
                      {
                        partner.additionalImages.map((image, i) =>
                        i < partner.additionalImages.length / 2 ?
                            <div className='portfolio_company_gallery_image_small_box' key={image._id}>
                              <img src={image.src} alt={image.alt} title={image.title} />
                            </div> : null
                        )
                      }
                    </div>
                    <div className='portfolio_company_gallery_sub_box'>
                      <div className='portfolio_company_gallery_image_small_box'>
                        <img src={partner.mainImage.src} alt={partner.mainImage.alt} title={partner.mainImage.title}/>
                      </div>
                      {
                        partner.additionalImages.map((image, i) =>
                        i > partner.additionalImages.length / 2 ?
                            <div className={`portfolio_company_gallery_image_${i > 3 ? 'large' : 'small'}_box`} key={image._id}>
                              <img src={image.src} alt={image.alt} title={image.title} />
                            </div> : null
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      } if (!partner.hasRu) return null
    } else if (!lang) {
      return (
        <section>
          <div className='portfolio_company_container' key={partner._id}>
            <div className='container'>
              <h2>{partner.company}</h2>
              <div className='portfolio_company_info_box'>
                <span className='portfolio_company_info_background' />
                <div className='portfolio_company_title_image_box'>
                  <img src={partner.mainImage.src} alt={partner.mainImage.alt} title={partner.mainImage.title}/>
                </div>
                <div className='portfolio_company_main_info'>
                  <Editor text={this.splitTextFirstHalf(partner.description)} />
                  {partner.video ? <div className='portfolio_company_video_box'>
                    <h3 className='portfolio_partner_video_name'>{partner.videoName}</h3>
                    <div className='portfolio_video_wrap'>
                      <div className='portfolio_video_button'>
                        <img src={video_arrow} alt='' />
                      </div>
                      <video muted='muted'>
                        <source src={fileUrl + partner.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                        Тег video не поддерживается вашим браузером.
                    <a href="video/duel.mp4">Скачайте видео</a>
                      </video>
                    </div>
                  </div> : null}
                  <div className='portfolio_compant_bottom_description'>
                    <Editor text={this.splitTextSecondHalf(partner.description)} />
                  </div>
                </div>
                <div className='portfolio_company_gallery_right'>
                  <div className='portfolio_company_gallery_sub_box'>
                    {
                      partner.additionalImages.map((image, i) =>
                        i < partner.additionalImages.length / 2 ?
                          <div className='portfolio_company_gallery_image_small_box' key={image._id}>
                            <img src={image.src} alt={image.alt} title={image.title} />
                          </div> : null
                      )
                    }
                  </div>
                  <div className='portfolio_company_gallery_sub_box'>
                    <div className='portfolio_company_gallery_image_small_box'>
                      <img src={partner.mainImage.src} alt={partner.mainImage.alt} title={partner.mainImage.title}/>
                    </div>
                    {
                      partner.additionalImages.map((image, i) =>
                        i > partner.additionalImages.length / 2 ?
                          <div className={`portfolio_company_gallery_image_${i > 3 ? 'large' : 'small'}_box`} key={image._id}>
                            <img src={image.src} alt={image.alt} title={image.title} />
                          </div> : null
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

  imageBlock = post => {
    const lang = !this.props.location.pathname.includes("/ua")
    if(lang){
      if(post.hasRu){
        return (
        post.image.split('.').pop().toUpperCase() !== 'MP4' ? 
        <div className='portfolio_gallary_photo_box' key={post._id}>
          <img src={post.image} alt={post.imageAlt} title={post.imageTitle}/>
          <div className='portfolio_gallary_info_box'>
            <p>{post.descriptionRu}</p>
            <span className='portfolio_gallary_box_cube'/>
          </div>
          </div>
          :
          <div className='portfolio_gallary_video_box'>
          <div className='portfolio_video_wrap'>
            <div className='portfolio_video_button'>
              <img src={video_arrow} alt=''/>
            </div>
            <video width='100%' height='100%' muted='muted' poster={post.poster ? post.poster : Picture}>
              <source src={fileUrl+post.image} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              Тег video не поддерживается вашим браузером.
              <a href={fileUrl+post.image}>Скачайте видео</a>
            </video>
            
          </div>
        </div>)
      } else {
        return null
      }
    } else {
      return (
        post.image.split('.').pop().toUpperCase() !== 'MP4' ? 
        <div className='portfolio_gallary_photo_box' key={post._id}>
          <img src={fileUrl+post.image} alt={post.imageAlt} title={post.imageTitle}/>
          <div className='portfolio_gallary_info_box'>
            <p>{post.description}</p>
            <span className='portfolio_gallary_box_cube' />
          </div>
          </div>
          :
          <div className='portfolio_gallary_video_box'>
          <div className='portfolio_video_wrap'>
            <div className='portfolio_video_button'>
              <img src={video_arrow} alt=''/>
            </div>
            <video width='100%' height='100%' muted='muted' poster={post.poster ? post.poster : Picture}>
              <source src={fileUrl+post.image} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              Тег video не поддерживается вашим браузером.
              <a href={fileUrl+post.image}>Скачайте видео</a>
            </video>
            <div className='portfolio_gallary_info_box'>
            <p>{post.description}</p>
            <span className='portfolio_gallary_box_cube' />
          </div>
          </div>
        </div>
      )
    }
  }


  showPicture = () => this.setState({ isFullScreenPhoto: !this.state.isFullScreenPhoto });
  showVideo = () => this.setState({ isFullScreenVideo: !this.state.isFullScreenVideo });

  preSets() {

    let that = this;
    that.fullScreenPadding();
    that.setPictureSize();
    that.setCompanyBackground();

    window.addEventListener('resize', function () {
      that.fullScreenPadding();
      that.setCompanyBackground();
      that.setPictureSize();
    });
    d3.selectAll('.portfolio_company_video_box').on('click', function () {
      d3.select(this).call(that.checkCompanyVideo);
    });
    d3.selectAll('.portfolio_gallary_photo_box')
      .on('click', function () {
        d3.select(this).call(that.getFullScreenPhoto, that)
      });
    d3.selectAll('.portfolio_gallary_video_box')
      .on('click', function () {
        d3.select(this).call(that.getFullScreenVideo, that)
      });
  }


  setCompanyBackground() {
    d3.selectAll('.portfolio_company_container')
      .each(function () {
        if (d3.select(this).select('video').node()) {
          let company_description = d3.select(this).node();
          let company_top = company_description.getBoundingClientRect().top;
          let video = d3.select(this).select('.portfolio_video_wrap').node();
          let bottom_video = video.getBoundingClientRect().bottom;
          let height_video = video.getBoundingClientRect().height;
          let middle_video = bottom_video - height_video / 2;
          let background_height = middle_video - company_top;
          d3.select(this).select('.portfolio_company_info_background')
            .style('height', `${background_height}px`);
        } else {
          let window_width = window.innerWidth;
          d3.select(this).select('.portfolio_company_video_box').style('display', 'none');
          d3.select(this).select('.portfolio_partner_video_name').style('display', 'none');
          let company_description = d3.select(this).node();
          let company_top = company_description.getBoundingClientRect().top;
          let text = d3.select(this).select('.portfolio_compant_bottom_description').node();
          let top_text = text.getBoundingClientRect().top;
          let correct_value = 95;
          let background_height = top_text - company_top - correct_value;
          d3.select(this).select('.portfolio_company_info_background')
            .style('height', `${background_height}px`);
        }
      });
  }

  setPictureSize() {
    let window_width = window.innerWidth;
    d3.selectAll('.portfolio_company_gallery_right')
      .each(function () {
        d3.select(this).selectAll('img')
          .on('load', function () {
            let height = d3.select(this).node().height;
            let width = d3.select(this).node().width;
            if (height > width) {
              d3.select(this)
                .style('width', '100%');
            } else {
              d3.select(this)
                .style('height', '100%')
                .style('width', 'unset');
            }
          });
      });
    d3.selectAll('.portfolio_company_title_image_box')
      .each(function () {
        d3.select(this).selectAll('img')
          .on('load', function () {
            let height = d3.select(this).node().height;
            let width = d3.select(this).node().width;
            if (height > width) {
              d3.select(this)
                .style('width', '100%');
            } else {
              d3.select(this)
                .style('height', '100%')
                .style('width', 'unset');
            }
          });
      });
    if (window_width > 1000) {
      d3.selectAll('.portfolio_company_gallery_image_large_box')
        .style('height', '300px')
        .style('width', '300px');
    } else {
      d3.selectAll('.portfolio_company_gallery_image_large_box')
        .style('height', '250px')
        .style('width', '250px');
    }
  }

  fullScreenPadding() {
    if (window.innerWidth > 1000) {
      d3.select('.full_screen_video_box')
        .style('padding-top', `${d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`)
        .style('height', `${window.innerHeight - d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`);
      d3.select('.full_screen_picture_box')
        .style('padding-top', `${d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`)
        .style('height', `${window.innerHeight - d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`);
      d3.select('.full_screen_description_box')
        .style('padding-top', `${d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`)
        .style('height', `${window.innerHeight - d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`);
    } else {
      d3.select('.full_screen_box')
        .style('padding-top', `${d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`)
        .style('height', `${window.innerHeight - d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`);
      d3.select('.full_screen_video_box')
        .style('padding-top', `${d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`)
        .style('height', `${window.innerHeight - d3.select('.header_wrap').node().getBoundingClientRect().bottom}px`);

    }
  }

  checkCompanyVideo(e) {
    if (e.select('video').node().paused) {
      e.select('video').node().play();
      e.select('.portfolio_video_button').style('display', 'none');
    } else {
      e.select('video').node().pause();
      e.select('.portfolio_video_button').style('display', 'flex');
    }
  }

  getFullScreenPhoto(e, that) {
    let url = e.select('img').attr('src');
    let description = e.select('p').node().innerHTML;
    that.setState({ fullScreenPhotoUrl: url });
    that.setState({ fullScreenDescription: description });
    that.showPicture();
  }

  getFullScreenVideo(e, that) {
    let poster = e.select('video').attr('poster');
    let url = e.select('source').attr('src');
    console.log(url)
    that.setState({ fullScreenVideoUrl: url });
    that.setState({ videoPoster: poster });
    that.showVideo();
  }

  render() {
    const lang = !this.props.location.pathname.includes("/ua");
    let metaTags =
        this.props.getMetaResult && this.props.getMetaResult.result;

    const {partners} = this.props;
    return (
      <div>
            <SEO
                    title={metaTags && metaTags.title}
                    description={metaTags && metaTags.description}
                    url={"https://suntown-ukraine.com/portfolio"}
              ></SEO>
        <div className='portfolio'>
        {
          this.props.galleryPosts && console.log(this.props.galleryPosts)
        }
          <Header { ...this.props}/>
          <ScrollToTop />
          <FullScreenPhoto
            url={this.state.fullScreenPhotoUrl}
            description={this.state.fullScreenDescription}
            showPicture={this.showPicture}
            visible={this.state.isFullScreenPhoto ? 'none' : 'flex'}
          />
          <FullScreenVideo
            url={this.state.fullScreenVideoUrl}
            videoPoster={this.state.videoPoster}
            showVideo={this.showVideo}
            visible={this.state.isFullScreenVideo ? 'none' : 'flex'}
          />
          <section className='portfolio_slider_section'>
            <div className='container portfolio_slider_box'>
              <h2>{lang ? 'С нами работают' : 'З нами працюють'}</h2>
              {
                partners.partners && <Slider images={partners.partners} isRu={lang} />
              }
            </div>
          </section>
          <section>
            <div className='portfolio_gallary_box'>
              <div className='container'>
                <h2>{lang ? 'Общая галерея работ' : 'Загальна галерея робіт'}</h2>
                <div className='portfolio_gallery_box'>
                  <div className='portfolio_gallery_line'>
                    {
                      !this.props.gallery.loadingGalleryPost
                      && !this.props.gallery.loadingGalleryPostError
                      && this.props.gallery.galleryPosts
                      && this.props.gallery.galleryPosts.map(post =>
                        this.imageBlock(post)
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
          {
            partners.partners
            && !partners.error
            && partners.partners.map(partner => (
              this.partnerBlock(partner)
            ))
          }

        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    lang: state.lang,
    gallery: state.gallery,
    partners: state.partners,
    getMetaResult: state.seo.getSeoByUrlResult
  }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getGalleryPosts,
    getPartners,
    getSeoByUrl
  }, dispatch)
);

export const loadDataPortfolio = ({ dispatch }, path) =>{
    const lang = path.includes("/ua") ? "ua" : "ru";

    const promises = [
        dispatch(getSeoByUrl("portfolio", lang)),
        dispatch(getGalleryPosts()),
        dispatch(getPartners()),
];

    return Promise.all(promises);
}



export default  connect(mapStateToProps, mapDispatchToProps)(Portfolio)
