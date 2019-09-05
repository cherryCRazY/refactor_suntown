import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import Logo_Image from "../media/logo.png";
import "../Styles/Header.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import equinox_desktop from "../media/equinox_desktop.svg";
import equinox_mobile from "../media/equinox_mobile.svg";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuWidth: "0",
            isMenu: false,
            isRu: false /* LANGUAGE FLAG */
        };
    }

    componentDidMount() {
        // const lang = window.location.href.split('/')[3];
        this.preSets();
    }

    changeHrefToUa = () => {
        const locAr = window.location.href.split("/");
        const lang = locAr[3];
        if (lang !== "ua") {
            locAr.splice(3, 0, "ua");
            window.location.href = locAr.join("/");
        }
    };

    changeHrefToRu = () => {
        const locAr = window.location.href.split("/");
        const lang = locAr[3];
        if (lang === "ua") {
            const firstPart = locAr.slice(0, 3);
            const secondPart = locAr.slice(4);


            window.location.href = [...firstPart, ...secondPart].join("/");
        }
    };

    preSets() {
        let that = this;
        let menu_width = d3.select(".header_menu_box").style("width");
        const curLang = window.location.href.split("/")[3] !== "ua";
        that.setState(
            { width_menu: menu_width.substring(0, menu_width.length - 2) },
            that.setMenuWidth
        );
        // window.addEventListener("resize", function(){
        //     menu_width = d3.select('.header_menu_box').style('width');
        //     that.setState({width_menu: menu_width.substring(0, menu_width.length - 2)}, that.setMenuWidth);
        // });
        d3.select(`${curLang ? ".lang_ru" : ".lang_ua"}`)
            .style("color", "#86B82A")
            .style("text-decoration", "underline");
        d3.select(`${curLang ? ".m_lang_ru" : ".m_lang_ua"}`)
            .style("color", "white")
            .style("text-decoration", "underline");
        d3.selectAll(".header_language_box span").on("click", function() {
            let lang = d3.select(this).node().innerHTML;
            d3.select(`${lang === "RU" ? ".lang_ua" : ".lang_ru"}`)
                .style("color", "black")
                .style("text-decoration", "none");
            d3.select(this)
                .style("color", "#86B82A")
                .style("text-decoration", "underline");
            if (lang === "RU") {
                that.setState({ isRu: true });
                that.changeHrefToRu();
                // that.props.changeToRu()
            } else {
                that.setState({ isRu: false });
                that.changeHrefToUa();
                // that.props.changeToUa()
            }
            // lang === 'RU' ? that.setState({isRu: true}) : that.setState({isRu: false});
        });
        d3.selectAll(".m_header_language_box span").on("click", function() {
            let lang = d3.select(this).node().innerHTML;
            d3.select(`${lang === "RU" ? ".m_lang_ua" : ".m_lang_ru"}`)
                .style("color", "#62881d")
                .style("text-decoration", "none");
            d3.select(this)
                .style("color", "white")
                .style("text-decoration", "underline");
            if (lang === "RU") {
                that.setState({ isRu: true });
                that.changeHrefToRu();
                that.props.changeToRu();
            } else {
                that.setState({ isRu: false });
                that.changeHrefToUa();
                that.props.changeToUa();
            }
            // lang === 'RU' ? that.setState({isRu: true}) : that.setState({isRu: false});
        });

        d3.select(".header_menu_button").on("click", that.showMenu.bind(this));
        d3.selectAll(".header_menu_box li")
            .on("mouseover", that.linkSelectedAnimation)
            .on("mouseleave", that.linkUnSelectedAnimation);
    }

    setMenuWidth() {
        let that = this;
        d3.select(".header_menu_box")
            .style("right", `-${that.state.width_menu}px`)
            .style("opacity", "0");
    }

    showMenu() {
        let that = this;
        d3.select(".header_menu_box")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style(
                "right",
                `${that.state.isMenu ? -that.state.width_menu : 0}px`
            )
            .style("opacity", `${that.state.isMenu ? 0 : 1}`);
        d3.select(".header_menu_button span:nth-child(1)")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style("transform", `rotate(${that.state.isMenu ? 0 : 45}deg)`);
        d3.select(".header_menu_button span:nth-child(2)")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style("opacity", `${that.state.isMenu ? 1 : 0}`);
        d3.select(".header_menu_button span:nth-child(3)")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style("transform", `rotate(${that.state.isMenu ? 0 : -45}deg)`);
        this.setState({ isMenu: !this.state.isMenu });
    }

    linkSelectedAnimation() {
        d3.select(this)
            .select("span")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style("width", "100%");
    }

    linkUnSelectedAnimation() {
        d3.select(this)
            .select("span")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style("width", "0%");
    }

    render() {
        const curLang = this.props.location.pathname.includes("/ua");
        return (
            <div className="header">
                <div className="header_wrap">
                    <div className="container header_box">
                        <Link to={curLang ? "/ua/" : "/"}>
                            <img
                                className="header_logo_image"
                                src={Logo_Image}
                                alt="Suntown"
                            />
                        </Link>
                        <div className="header_action_box">
                            <div className="header_language_box">
                                <span className="lang_ua">UA</span>
                                <span className="lang_ru">RU</span>
                            </div>
                            <Link to={curLang ? "/ua/form" : "/form"}>
                                <div className="header_contact_button">
                                    <span>{curLang ? "Зв'язок" : "Связь"}</span>
                                </div>
                            </Link>
                            <div className="header_menu_button">
                                <span className="button_top_line bg_green"></span>
                                <span className="bg_black"></span>
                                <span className="button_bottom_line bg_green"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header_menu_box bg_green">
                    <ul>
                        <li>
                            <Link
                                to={curLang ? "/ua/" : "/"}
                                rel={this.props.isMain ? "nofollow" : ""}
                                disabled={this.props.isMain}
                            >
                                {curLang
                                    ? "Головна сторінка"
                                    : "Главная страница"}
                            </Link>
                            <span />
                        </li>
                        <li>
                            <Link to={curLang ? "/ua/products" : "/products"}>
                                {curLang ? "Продукти" : "Продукты"}
                            </Link>
                            <span />
                        </li>
                        <li>
                            <Link to={curLang ? "/ua/about-us" : "/about-us"}>
                                {curLang ? "Про нас" : "О нас"}
                            </Link>
                            <span />
                        </li>
                        <li>
                            <Link to={curLang ? "/ua/portfolio" : "/portfolio"}>
                                {curLang ? "Наші роботи" : "Наши работы"}
                            </Link>
                            <span />
                        </li>
                        <li>
                            <Link to={curLang ? "/ua/news" : "/news"}>
                                {curLang ? "Новини" : "Новости"}
                            </Link>
                            <span />
                        </li>
                        <li>
                            <Link to={curLang ? "/ua/contacts" : "/contacts"}>
                                {curLang ? "Контакти" : "Контакты"}
                            </Link>
                            <span />
                        </li>
                    </ul>
                    <span className="m_header_language_box">
                        <span className="m_lang_ua">UA</span>
                        <span className="m_lang_ru">RU</span>
                    </span>
                    <a href="https://equinox.company" className="equinox_rules">
                        <img
                            className="equinox_rules_desktop"
                            src={equinox_desktop}
                            alt=""
                        />
                        <img
                            className="equinox_rules_mobile"
                            src={equinox_mobile}
                            alt=""
                        />
                    </a>
                    <span className="header_rules">
                        {curLang
                            ? "Всі права захищені 2019 © SunTown"
                            : "Все права защищены 2019 © SunTown"}
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.lang
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeToRu: () => dispatch({ type: "CHANGE_TO_RU" }),
            changeToUa: () => dispatch({ type: "CHANGE_TO_UA" })
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
