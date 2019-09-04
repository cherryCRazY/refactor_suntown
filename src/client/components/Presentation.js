import React, { Component } from 'react'
import Header from './Header';
import { connect } from 'react-redux';
import MetaTags from 'react-meta-tags';
import { bindActionCreators } from 'redux';
import localizationUA from '../localization/UA/HomeUA';
import localizationRU from '../localization/RU/HomeRU';
import hd110 from '../media/presentations/hd110.pdf'
import SmartTAG_HD_SM_L from '../media/presentations/SmartTAG_HD_SM_L.pdf';
import freezer from '../media/presentations/freezer.pdf';
import paper from '../media/presentations/paper.pdf';
import hd200 from '../media/presentations/hd200.pdf';
import e_paper from '../media/presentations/e_paper.pdf';
import { seoActions } from "../actions/seoActions";
import { initGA, logPageView } from '../analytics';

const getSeoByUrl = seoActions.getSeoByUrl;


const presentationsSrcs = {
  'hd110': hd110,
  'SmartTAG_HD_SM_L': SmartTAG_HD_SM_L,
  'freezer' : freezer,
  'paper' : paper,
  'hd200' : hd200,
  'e_paper' : e_paper
}


class Presentation extends Component {
  componentDidMount(){
    const lang = window.location.href.split('/')[3] === 'ua' ? 'ua' : 'ru';
    initGA();
    this.props.getSeoByUrl(this.props.match.url.split('/').pop(), lang)
    .then(() =>  {
      try{
      logPageView(this.props.getMetaResult.result.title)
    } catch(e) {
      console.log('err')
    }
  });
  }
  render() {
    let metaTags = this.props.getMetaResult && this.props.getMetaResult.result;
    const lang = window.location.href.split('/')[3] !== 'ua'
    return (
        <div>
          <MetaTags>
          <title>{metaTags && metaTags.title}</title>
          <meta name="description" content={metaTags && metaTags.description} />
          <meta name="keywords" content={metaTags && metaTags.keywords} />
        </MetaTags>
          <Header/>
          <iframe src={ presentationsSrcs[this.props.match.url.split('/').pop()] } style={{width: '100%', height: '100vh'}} frameborder="0"></iframe>
          {
            lang ? localizationRU.footer() : localizationUA.footer()
          }
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

export default connect(
  mapStateToProps,
  { getSeoByUrl }
)(Presentation);
