import React, { Component } from 'react'
import MetaTags from "react-meta-tags";
import * as d3 from "d3";


import SmartTAG_HD_110 from "../media/prices/SmartTAG_HD_110.png";
import SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE from "../media/prices/SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE.png";
import SmartTAG_HD_M_FREEZER from "../media/prices/SmartTAG_HD_M_FREEZER.png";
import SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH from "../media/prices/SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH.png";
import SmartTAG_HD_200 from "../media/prices/SmartTAG_HD_200.png";
import SmartTAG_HD_T_E_PAPER_LABELS from "../media/prices/SmartTAG_HD_T_E_PAPER_LABELS.png";



import "../Styles/AboutUs.css";
import { connect } from "react-redux";
import localizationUA from "../localization/UA/AboutUsUA";
import localizationRU from "../localization/RU/AboutUsRU";
import { seoActions } from "../actions/seoActions";
import {Link} from 'react-router-dom';
import { initGA, logPageView } from '../analytics';

import hd110 from '../media/presentations/hd110.pdf'
import freezer from '../media/presentations/freezer.pdf';
import paper from '../media/presentations/paper.pdf';
import hd200 from '../media/presentations/hd200.pdf';
import SmartTAG_HD_SM_L from '../media/presentations/SmartTAG_HD_SM_L.pdf';
import specsheetsmlssen170314 from '../media/presentations/specsheetsmlssen170314.pdf';
import smarttaghdmfreezer_en from '../media/presentations/smarttaghdmfreezer_en.pdf';
import e_paper from '../media/presentations/e_paper.pdf';


//Components
import SEO from '../components/SEO'
import ScrollToTop from '../components/ScrollToTop';
import Header from '../components/Header';


const getSeoByUrl = seoActions.getSeoByUrl;

class Products extends Component {
  componentDidMount() {
    const lang = this.props.location.pathname.includes("/ua") ? "ua" : "ru";
    initGA();
    this.props.getSeoByUrl("products", lang)
    .then(() =>  {
      try{
      logPageView(this.props.getMetaResult.result.title)
    } catch(e) {
      console.log('err')
    }
    });
    this.preSets();
    let that = this;
    if (window.innerWidth > 800) {
      d3.selectAll(".about_us_offer_line")
        .style("background", "#86B82A")
        .on("mouseover", that.mouseOverOffer)
        .on("mouseleave", that.mouseLeaveOffer);
      d3.selectAll(".about_us_product_picture_box").style("width", "0px");
    }
  }

  preSets() {
    let that = this;
    console.log(window.innerWidth);
    d3.selectAll(".offer_preview_button svg").style("right", "-60px");
    d3.selectAll(".offer_preview_button")
      .on("mouseover", that.overButton)
      .on("mouseleave", that.leaveButton);
  }

  leaveButton() {
    d3.select(this)
      .select("svg")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("right", "-60px");
  }

  overButton() {
    d3.select(this)
      .select("svg")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("right", "0px");
  }

  mouseLeaveOffer() {
    d3.select(this)
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .style("background", "#86B82A")
      .style("color", "#000");
    d3.select(this)
      .select(".about_us_product_picture_box")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("width", "0px");
  }

  mouseOverOffer() {
    d3.select(this)
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .style("background", "#1D1D1D")
      .style("color", "#fff");
    d3.select(this)
      .select(".about_us_product_picture_box")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("width", "350px");
  }

  svgButton() {
    return (
      <svg
        className="arrow_right_img"
        xmlns="http://www.w3.org/2000/svg"
        width="46.932"
        height="23.774"
        viewBox="0 0 46.932 23.774"
      >
        <path
          d="M3250.754,4531.5h43.932l-14.434-10.6,14.434,10.6-14.434,10.171"
          transform="translate(-3249.254 -4519.397)"
          fill="none"
          stroke="#86b82a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    );
  }

  getTopPosition(e) {
    return e.getBoundingClientRect().top - 70;
  }

  render() {
    const lang = !this.props.location.pathname.includes("/ua");
    let metaTags =
        this.props.getMetaResult && this.props.getMetaResult.result;

    return (
      <div>
            <SEO
                    title={metaTags && metaTags.title}
                    description={metaTags && metaTags.description}
                    url={"https://suntown-ukraine.com/products"}
            ></SEO>
        <div className="about_us">
        <Header {...this.props}/>
        <ScrollToTop />
        <section className="about_us_offers">
            <div className="offer_title_container">
              <h2>
                {lang
                  ? "Предлагаемые продукты"
                  : "Пропоновані продукти"}
              </h2>
            </div>
            <div className="about_us_offers_box ">
              <div className="about_us_offer_line">
                <div className="container">
                  <h3>SmartTAG HD 110 Large graphic label with smartflash</h3>
                  <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                    
                      <span>
                        <a style={{textDecoration: 'none'}} href="/product/hd110.pdf" >
                            {lang ? "Просмотреть" : "Переглянути"}
                        </a>
                      </span>
                      {this.svgButton()}
                    </div>
                    <div className="offer_container">
                      {lang
                        ? localizationRU.first_about_us_offer_text_box()
                        : localizationUA.first_about_us_offer_text_box()}
   
                    </div>
                    <div className="about_us_product_picture_box">
                    
                      <img src={SmartTAG_HD_110} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD S, M+, L ETIQUETTES E-PAPER NOIR, BLANC, ROUGE</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                     
                        <span>
                            <a style={{textDecoration: 'none'}} href="/product/SmartTAG_HD_SM_L.pdf" >
                                {lang ? "Просмотреть" : "Переглянути"}
                            </a>
                        </span>
                        {this.svgButton()}
                    
                      </div>
                      {lang
                        ? localizationRU.second_about_us_offer_text_box()
                        : localizationUA.first_about_us_offer_text_box()}
             
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD M+ FREEZER</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                      
                        <span>
                            <a style={{textDecoration: 'none'}} href="/product/freezer.pdf" >
                                {lang ? "Просмотреть" : "Переглянути"}
                            </a>
                        </span>
                        {this.svgButton()}
                      
                      </div>
                      {lang
                        ? localizationRU.third_about_us_offer_text_box()
                        : localizationUA.third_about_us_offer_text_box()}
           
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_M_FREEZER} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD S, M+, L</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                   
                      <span>
                        <a style={{textDecoration: 'none'}} href="/product/paper.pdf" >
                                {lang ? "Просмотреть" : "Переглянути"}
                        </a>
                      </span>
                      {this.svgButton()}
                  
                    </div>
                      {lang
                        ? localizationRU.fourth_about_us_offer_text_box()
                        : localizationUA.fourth_about_us_offer_text_box()}
                      <div className="about_us_product_picture_box">
                        <img
                        
                          src={SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD 200</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                    
                      <span>
                        <a style={{textDecoration: 'none'}} href="/product/hd200.pdf" >
                                {lang ? "Просмотреть" : "Переглянути"}
                        </a>
                      </span>
                      {this.svgButton()}
                
                    </div>
                      {lang
                        ? localizationRU.fifth_about_us_offer_text_box()
                        : localizationUA.fifth_about_us_offer_text_box()}
     
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HT T E-PAPER LABELS</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                      
                        <span>
                            <a style={{textDecoration: 'none'}} href="/product/e_paper.pdf" >
                                {lang ? "Просмотреть" : "Переглянути"}
                            </a>
                        </span>
                        {this.svgButton()}
                      </div>
                      {lang
                        ? localizationRU.new_price_about_us_offer_text_box()
                        : localizationUA.new_price_about_us_offer_text_box()}
      
                      <div className="about_us_product_picture_box">
                        <img src={SmartTAG_HD_T_E_PAPER_LABELS} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>Pricer SmartFlash</h3>
                    <div className="about_us_offer_flex_box">

                      {lang
                        ? localizationRU.sixth_about_us_offer_text_box()
                        : localizationUA.sixth_about_us_offer_text_box()}
        
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Геолокация - продается отдельно"
                        : "Геолокація – продається окремо"}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.seventh_about_us_offer_text_box()
                        : localizationUA.seventh_about_us_offer_text_box()}
            
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "SmartFlash ГЕОЛОКАЦИЯ"
                        : "SmartFlash і геолокація"}
                    </h3>
                    <div className="about_us_offer_flex_box">

                      {lang
                        ? localizationRU.eighth_about_us_offer_text_box()
                        : localizationUA.eighth_about_us_offer_text_box()}
        
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Осмотр дополнительных функций"
                        : "Огляд додаткових функцій"}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.nineth_about_us_offer_text_box()
                        : localizationUA.nineth_about_us_offer_text_box()}
                  
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>Pricer Poster</h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.tenth_about_us_offer_text_box()
                        : localizationUA.tenth_about_us_offer_text_box()}
          
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Многофункциональные решения для повышения продаж"
                        : "Багатофункціональні рішення для підвищення продажів."}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.eleventh_about_us_offer_text_box()
                        : localizationUA.eleventh_about_us_offer_text_box()}
               
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.lang,
    getMetaResult: state.seo.getSeoByUrlResult
  };
};


export function loadDataProducts({ dispatch }, path) {
    const lang = path.includes("/ua") ? "ua" : "ru";

    const promises = [dispatch(getSeoByUrl("products", lang))];

    return Promise.all(promises);
}



export default connect(
        mapStateToProps,
        { getSeoByUrl }
    )(Products)

