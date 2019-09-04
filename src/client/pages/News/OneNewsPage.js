import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import ButtonReturn from "../../media/news_return.svg";
import ButtonClose from "../../media/news_close_button.svg";
import ButtonUp from "../../media/button_up.svg";
import animateScrollTo from "animated-scroll-to";
import "../../Styles/NewsView.css";

import { userActions } from "../../actions";
import { seoActions } from "../../actions/seoActions";
import { Redirect } from "react-router";
import { initGA, logPageView } from "../../analytics";

//utils
import { parseDate } from "../../utils/dateUtils";

//components
import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Editor from "../../components/Editor";

const getArticleSeoByUrl = seoActions.getArticleSeoByUrl;
const getArticles = userActions.getArticles;

class NewsView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            backgroundVisible: true
        };
    }

    topButtonStyle = {
        position: "relative",
        top: 0,
        cursor: "pointer",
        transitionDuration: "0.5s",
        transitionTimingFunction: "linear",
        transitionDelay: "0s"
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (
            !nextProps.article.error &&
            nextProps.article.articles &&
            nextProps.article.selectedArticleByUrl === undefined &&
            !nextProps.article.doneSorting
        ) {
            this.props.getSelectedArticleByUrl(this.props.match.params.url);
        }
    }

    componentDidMount() {
        initGA();
        let path = this.props.location.pathname;

        const lang = !this.props.location.pathname.includes("/ua");
        const postUrl = path.substring(lang ? 6 : 9, path.length);

        this.props.getArticleSeoByUrl(postUrl).then(() => {
            try {
                logPageView(this.props.getMetaResult.result.title);
            } catch (e) {
                console.log(e);
            }
        });
        this.props.getArticles();
    }

    render() {
        const lang = !this.props.location.pathname.includes("/ua");

        if (this.props.article.selectedArticleByUrl) {
            if (lang) {
                if (!this.props.article.selectedArticleByUrl.hasRu) {
                    return (
                        <Redirect
                            to={
                                !this.props.location.pathname.includes("/ua")
                                    ? "/ua/news"
                                    : "/news"
                            }
                        />
                    );
                }
            }
            let metaTags =
                this.props.getMetaResult && this.props.getMetaResult.result;
            const article = this.props.article.selectedArticleByUrl;
            return (
                <div>
                    <SEO
                        title={metaTags && metaTags.title}
                        description={metaTags && metaTags.description}
                        url={"https://suntown-ukraine.com/news"}
                    ></SEO>
                    <div className="news_view">
                        <Header {...this.props} />
                        <section className="d_news_title_picture_box">
                            <div className="container">
                                <img
                                    className="d_news_title_picture"
                                    src={article.mainImage.src}
                                    alt={article.mainImage.alt}
                                    title={article.mainImage.title}
                                />
                            </div>
                        </section>
                        <section className="m_news_title_picture_box">
                            <img
                                className="m_news_view_title_picture"
                                src={article.mainImage.src}
                                alt={article.mainImage.alt}
                                title={article.mainImage.title}
                            />
                            <div className="m_news_view_title_box">
                                <div className="m_news_view_title_left_box">
                                    <span className="m_news_view_date_point" />
                                    <div className="m_news_date_box">
                                        <span>
                                            {parseDate(article.date).date}
                                        </span>
                                        <span>
                                            {parseDate(article.date).time}
                                        </span>
                                    </div>
                                </div>
                                <div className="m_news_view_title_right_box">
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="container news_view_container">
                                <div className="news_view_top_box">
                                    <h2>
                                        {lang ? article.titleRu : article.title}
                                    </h2>
                                    <div className="news_view_date_box">
                                        <span className="news_view_date_point" />
                                        <span className="news_view_date">
                                            {parseDate(article.date).date}
                                        </span>
                                        <span className="news_view_time">
                                            {parseDate(article.date).time}
                                        </span>
                                    </div>
                                    <span className="blur_background" />
                                    <Link
                                        to={
                                            !this.props.location.pathname.includes(
                                                "/ua"
                                            )
                                                ? "/ua/news"
                                                : "/news"
                                        }
                                    >
                                        <img
                                            src={ButtonReturn}
                                            className="news_view_return"
                                            alt=""
                                        />
                                    </Link>
                                    <div className="news_view_top_decoration_circle">
                                        <span />
                                        <span />
                                    </div>
                                </div>
                                <div className="news_view_middle_box">
                                    <div className="news_view_middle_decorate">
                                        <span />
                                    </div>
                                    <div className="news_view_middle_text">
                                        <p>
                                            {lang
                                                ? article.descriptionRu
                                                : article.description}
                                        </p>
                                    </div>
                                    <span className="blur_background" />
                                </div>
                                <div className="news_view_bottom_box">
                                    <div className="m_view_bottom_text_top_line">
                                        <div />
                                        <div />
                                    </div>
                                    <div className="news_view_bottom_text">
                                        <Editor
                                            text={
                                                lang
                                                    ? article.contentRu
                                                    : article.content
                                            }
                                        />
                                    </div>
                                    <span className="blur_background" />
                                </div>
                                <div className="news_view_control_panel">
                                    <div
                                        onClick={() => {
                                            animateScrollTo(0);
                                        }}
                                        className="news_view_button_box"
                                    >
                                        <img src={ButtonUp} alt="" />
                                    </div>
                                    <div className="news_view_button_box">
                                        <Link
                                            to={
                                                !this.props.location.pathname.includes(
                                                    "/ua"
                                                )
                                                    ? "/ua/news"
                                                    : "/news"
                                            }
                                        >
                                            <img src={ButtonClose} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer className="footer">
                            <div>
                                <p>
                                    {lang
                                        ? "Все права защищены 2019 © SunTown"
                                        : "Всі права захищені 2019 © SunTown"}
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            );
        } else if (!this.props.article.doneSorting) {
            return null;
        } else {
            // return <Redirect to='/error' />
        }
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles,
        lang: state.lang,
        getMetaResult: state.seo.getArticleSeoByUrlResult
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getArticles,
            getArticleSeoByUrl,
            getSelectedArticleByUrl: url =>
                dispatch({ url, type: "GET_SELECTED_ARTICLE_BY_URL" })
        },
        dispatch
    );

export function loadDataNewsView({ dispatch }, path) {
    const lang = !path.includes("/ua");

    const url = path.substring(lang ? 6 : 9);

    const promises = [
        dispatch(getArticles()),
        dispatch(getArticleSeoByUrl(url))
    ];

    return Promise.all(promises);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsView);
