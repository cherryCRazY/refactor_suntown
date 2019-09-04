import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import Header from "./Header";
import * as d3 from "d3";
import ScrollToTop from "./ScrollToTop";
import animateScrollTo from "animated-scroll-to";
import arrow_down_img from "../media/arrow_down.svg";
import main_prev_line from "../media/main_prev_line.png";
import main_prices_img from "../media/prices.png";
import main_world_map_img from "../media/world_map.png";
import pricer_logo from "../media/pricer_logo.png";
import about_pricer_line from "../media/about_pricer_line.png";
import description_img from "../media/description_img.png";
import monopoly_img from "../media/monopoly.png";
import charts_img from "../media/charts.png";
import building_img from "../media/building.png";
import retail_img from "../media/retail.png";
import network_trade_img from "../media/network_trade.png";
import pharmacy_img from "../media/pharmacy.png";
import _industry_img from "../media/_industry.png";
import industry_img from "../media/industry.png";
import refueling_img from "../media/refueling.png";
import scope_first_line from "../media/scope_first_line.svg";
import scope_second_line from "../media/scope_second_line.svg";
import suntown_circle from "../media/suntown_circle.svg";
import localizationUA from "../localization/UA/HomeUA";
import localizationRU from "../localization/RU/HomeRU";
import { connect } from "react-redux";
import { seoActions } from "../actions/seoActions";
import "../Styles/Main.css";
import { initGA, logPageView } from "../analytics";

import SEO from "./SEO";

import axios from "axios";

const getSeoByUrl = seoActions.getSeoByUrl;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scope: false,
            isRu: false
        };
    }

    componentDidMount() {
        const lang = this.props.location.pathname.includes("/ua") ? "ua" : "ru";
        initGA();

        this.props.getSeoByUrl("main", lang).then(data => {
            try {
                console.log("data", data);
                logPageView(this.props.getMetaResult.result.title);
            } catch (e) {
                console.log("err");
            }
        });

        this.preSets();
    }

    changeLang = val =>
        this.setState({ isRu: val }, () => console.log(this.state));

    preSets() {
        let that = this;
        d3.selectAll(".button_preview svg").style("right", "-60px");
        d3.selectAll(".button_preview")
            .on("mouseover", that.overButton)
            .on("mouseleave", that.leaveButton);
        // d3.select('.main_scope_section .container')
        //     .style('padding', '0px');
        d3.select(".main_scope_drop_section").style("max-height", "5000px");
        // d3.select('.main_open_scope_button').on('click', that.checkScope.bind(this))
    }

    checkScope() {
        let that = this;
        d3.select(".main_scope_drop_section")
            .transition()
            .duration(5000)
            .ease(d3.easeLinear)
            .style("max-height", "5000px");
        d3.select(".main_scope_section .container").style(
            "padding",
            "25px 20px 25px 20px"
        );
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

    getTopPosition(e) {
        return e.getBoundingClientRect().top - 70;
    }

    render() {
        console.log("this.props", this.props);

        const lang = !this.props.location.pathname.includes("/ua");
        let metaTags =
            this.props.getMetaResult && this.props.getMetaResult.result;

        return (
            <div>
                <SEO
                    title={metaTags && metaTags.title}
                    description={metaTags && metaTags.description}
                    url={"https://suntown-ukraine.com/"}
                ></SEO>
                <div className="main">
                    <Header
                        lang={this.changeLang}
                        isMain={true}
                        {...this.props}
                    />
                    <ScrollToTop />
                    <section className="main_preview">
                        <div className="container">
                            {lang
                                ? localizationRU.main_preview_title_box()
                                : localizationUA.main_preview_title_box()}
                            <div
                                className="main_preview_suntown_circle_box"
                                onClick={() => {
                                    animateScrollTo(
                                        this.getTopPosition(
                                            d3.select(".main_about").node()
                                        )
                                    );
                                }}
                            >
                                <img
                                    src={suntown_circle}
                                    className="main_preview_suntown_circle"
                                    alt="SUNTOWN icon"
                                />
                                <span className="main_preview_suntown_pulse" />
                            </div>
                            <div className="main_preview_pointer">
                                <span
                                    onClick={() => {
                                        animateScrollTo(
                                            this.getTopPosition(
                                                d3.select(".main_about").node()
                                            )
                                        );
                                    }}
                                >
                                    {lang
                                        ? "Детальнее про нас"
                                        : "Детальніше про нас"}
                                </span>
                                <img
                                    className="arrow_down"
                                    src={arrow_down_img}
                                    alt="SUNTOWN arrow down"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="main_about">
                        <div className="container">
                            <div className="main_new_technology_box">
                                {lang
                                    ? localizationRU.main_new_technology_text()
                                    : localizationUA.main_new_technology_text()}
                                <div className="main_new_technology_images">
                                    <img
                                        className="main_about_img main_prev_line"
                                        src={main_prev_line}
                                        alt="SUNTOWN about img"
                                    />
                                    <img
                                        className="main_about_img main_prices_img"
                                        src={main_prices_img}
                                        alt="SUNTOWN about img"
                                    />
                                </div>
                            </div>
                            <div className="main_about_bottom_info_box">
                                <div className="main_world_map_box">
                                    <img
                                        className="main_world_map_img"
                                        src={main_world_map_img}
                                        alt="SUNTOWN about img"
                                    />
                                </div>
                                {lang
                                    ? localizationRU.main_abou_bottom_left_text(
                                          about_pricer_line
                                      )
                                    : localizationUA.main_abou_bottom_left_text(
                                          about_pricer_line
                                      )}
                                {lang
                                    ? localizationRU.main_abou_bottom_text(
                                          pricer_logo
                                      )
                                    : localizationUA.main_abou_bottom_text(
                                          pricer_logo
                                      )}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <h2>{lang ? "" : "Опис послуги"}</h2>
                            <div className="main_description">
                                {lang
                                    ? localizationRU.main_description_text_box()
                                    : localizationUA.main_description_text_box()}
                                <div className="main_description_img_box">
                                    <img
                                        className="description_img"
                                        src={description_img}
                                        alt="SunTown опис послуги "
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container main_advantages">
                            <h2>{lang ? "Преимущества" : "Переваги"}</h2>
                            <img
                                className="main_advantages_monopoly"
                                src={monopoly_img}
                                alt="SunTown Преимущества"
                            />
                            <div className="main_advantages_column_box">
                                <div className="main_advantages_right_box">
                                    <div className="main_advantages_line_box">
                                        <div className="main_advantages_right_text_box">
                                            <span>1</span>
                                            {lang
                                                ? localizationRU.first_main_advantages_test()
                                                : localizationUA.first_main_advantages_test()}
                                        </div>
                                        <div className="main_advantages_right_text_box">
                                            <span>2</span>
                                            {lang
                                                ? localizationRU.second_main_advantages_test()
                                                : localizationUA.second_main_advantages_test()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="main_advantages_right_text_box">
                                            <span>3</span>
                                            {lang
                                                ? localizationRU.third_main_advantages_test()
                                                : localizationUA.third_main_advantages_test()}
                                        </div>
                                    </div>
                                </div>
                                <div className="main_advantages_left_box">
                                    <div className="main_advantages_text_left_box">
                                        <span>4</span>
                                        {lang
                                            ? localizationRU.fourth_main_advantages_test()
                                            : localizationUA.fourth_main_advantages_test()}
                                    </div>
                                    <div className="main_advantages_text_left_box">
                                        <span>5</span>
                                        {lang
                                            ? localizationRU.fifth_main_advantages_test()
                                            : localizationUA.fifth_main_advantages_test()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="main_chart">
                        <div className="container charts_box">
                            <img
                                className="main_chart_img"
                                src={charts_img}
                                alt=""
                            />
                            <div className="main_chart_text_box">
                                {lang
                                    ? localizationRU.first_main_chart_text()
                                    : localizationUA.first_main_chart_text()}
                                {lang
                                    ? localizationRU.second_main_chart_text()
                                    : localizationUA.second_main_chart_text()}
                                {lang
                                    ? localizationRU.third_main_chart_text()
                                    : localizationUA.third_main_chart_text()}
                                {lang
                                    ? localizationRU.fourth_main_chart_text()
                                    : localizationUA.fourth_main_chart_text()}
                                {lang
                                    ? localizationRU.fifth_main_chart_text()
                                    : localizationUA.fifth_main_chart_text()}
                                {lang
                                    ? localizationRU.sixth_main_chart_text()
                                    : localizationUA.sixth_main_chart_text()}
                            </div>
                        </div>
                    </section>
                    <section className="main_scope">
                        <div className="container main_scope_box">
                            {lang
                                ? localizationRU.main_scope_text()
                                : localizationUA.main_scope_text()}
                            <img
                                className="main_building_img"
                                src={building_img}
                                alt=""
                            />
                        </div>
                    </section>
                    <section className="main_scope_section">
                        <div className="container">
                            <div className="main_scope_drop_section">
                                <h2>
                                    {lang
                                        ? "Сферы применения"
                                        : "Сфери застосування"}
                                </h2>
                                {lang
                                    ? localizationRU.first_main_scope_line(
                                          retail_img
                                      )
                                    : localizationUA.first_main_scope_line(
                                          retail_img
                                      )}
                                {lang
                                    ? localizationRU.second_main_scope_line(
                                          network_trade_img
                                      )
                                    : localizationUA.second_main_scope_line(
                                          network_trade_img
                                      )}
                                {lang
                                    ? localizationRU.third_main_scope_line(
                                          scope_first_line,
                                          refueling_img
                                      )
                                    : localizationUA.third_main_scope_line(
                                          scope_first_line,
                                          refueling_img
                                      )}
                                {lang
                                    ? localizationRU.fourth_main_scope_line(
                                          pharmacy_img
                                      )
                                    : localizationUA.fourth_main_scope_line(
                                          pharmacy_img
                                      )}
                                {lang
                                    ? localizationRU.fifth_main_scope_line(
                                          scope_second_line,
                                          industry_img
                                      )
                                    : localizationUA.fifth_main_scope_line(
                                          scope_second_line,
                                          industry_img
                                      )}
                                {lang
                                    ? localizationRU.sixth_main_scope_line(
                                          _industry_img
                                      )
                                    : localizationUA.sixth_main_scope_line(
                                          _industry_img
                                      )}
                            </div>
                        </div>
                    </section>
                    {lang ? localizationRU.footer() : localizationUA.footer()}
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

export function loadDataMain({ dispatch }, path) {
    const lang = path.includes("/ua") ? "ua" : "ru";

    const promises = [dispatch(getSeoByUrl("main", lang))];

    return Promise.all(promises);
}

export default connect(
    mapStateToProps,
    { getSeoByUrl }
)(Main);
