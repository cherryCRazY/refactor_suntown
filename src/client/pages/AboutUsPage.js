import React, { Component } from "react";
import * as d3 from "d3";

import animateScrollTo from "animated-scroll-to";
import preview_img from "../media/about_prev_img.png";
import arrow_down_img from "../media/arrow_down.svg";
import pricer_logo from "../media/pricer_logo_white.png";
import task_img from "../media/task_picture.png";
import advantages_img from "../media/advantages_picture.png";

import "../Styles/AboutUs.css";
import { connect } from "react-redux";
import localizationUA from "../localization/UA/AboutUsUA";
import localizationRU from "../localization/RU/AboutUsRU";
import { seoActions } from "../actions/seoActions";

import { initGA, logPageView } from "../analytics";

//components
import SEO from "../components/SEO";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const getSeoByUrl = seoActions.getSeoByUrl;

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const lang = this.props.location.pathname.includes("/ua") ? "ua" : "ru";
        initGA();
        this.props.getSeoByUrl("about-us", lang).then(() => {
            try {
                logPageView(this.props.getMetaResult.result.title);
            } catch (e) {
                console.log("err");
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
                    url={"https://suntown-ukraine.com/about-us"}
                ></SEO>
                <div className="about_us">
                    <Header {...this.props} />
                    <ScrollToTop />
                    <section className="about_us_preview about_us_prev_normal">
                        {lang
                            ? localizationRU.container_about_us_preview_box(
                                  preview_img
                              )
                            : localizationUA.container_about_us_preview_box(
                                  preview_img
                              )}

                        <div className="main_preview_pointer">
                            <span
                                onClick={() => {
                                    animateScrollTo(
                                        this.getTopPosition(
                                            d3.select(".about_us_offers").node()
                                        )
                                    );
                                }}
                            >
                                {lang
                                    ? "Ознакомиться с списком продуктов"
                                    : "Ознайомитись з списком продуктів"}
                            </span>
                            <img
                                className="arrow_down"
                                src={arrow_down_img}
                                alt=""
                            />
                        </div>
                    </section>
                    <section className="about_us_preview about_us_prev_reverse">
                        <div className="container about_us_description_box">
                            {lang
                                ? localizationRU.about_us_preview_description_top()
                                : localizationUA.about_us_preview_description_top()}

                            <img
                                className="pricer_logo_white"
                                src={pricer_logo}
                                alt=""
                            />
                            {lang
                                ? localizationRU.about_us_preview_description_bottom()
                                : localizationUA.about_us_preview_description_bottom()}
                        </div>
                    </section>
                    <section className="about_us_task">
                        {lang
                            ? localizationRU.about_us_task_box(task_img)
                            : localizationUA.about_us_task_box(task_img)}
                    </section>
                    <section>
                        {lang
                            ? localizationRU.about_us_advantages(advantages_img)
                            : localizationUA.about_us_advantages(
                                  advantages_img
                              )}
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.lang,
        getMetaResult: state.seo.getSeoByUrlResult
    };
};

export function loadDataAboutUs({ dispatch }, path) {
    const lang = path.includes("/ua") ? "ua" : "ru";

    const promises = [dispatch(getSeoByUrl("about-us", lang))];

    return Promise.all(promises);
}

export default connect(
    mapStateToProps,
    { getSeoByUrl }
)(AboutUs);
