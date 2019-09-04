import React, { Component } from "react";

import { Link } from "react-router-dom";
import "../../Styles/News.css";
import arrow_down_img from "../../media/arrow_down.svg";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import { seoActions } from "../../actions/seoActions";
import { initGA, logPageView } from "../../analytics";

//utils
import { parseDate } from "../../utils/dateUtils";

//components
import SEO from "../../components/SEO";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import Editor from "../../components/Editor";

const getSeoByUrl = seoActions.getSeoByUrl;
const getArticles = userActions.getArticles;

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedNews: 5
        };
    }

    componentDidMount() {
        const lang = this.props.location.pathname.includes("/ua") ? "ua" : "ru";
        initGA();
        this.props.getSeoByUrl("news", lang).then(() => {
            try {
                logPageView(this.props.getMetaResult.result.title);
            } catch (e) {
                console.log("err");
            }
        });

        this.props.getArticles();
    }

    newsBlock = article => {
        const lang = !this.props.location.pathname.includes("/ua");

        if (lang) {
            if (article.hasRu) {
                return (
                    <div className="news_post_box">
                        <div className="news_post_picture_box">
                            <Link
                                to={
                                    this.props.location.pathname.includes("/ua")
                                        ? `/ua/post${article.url}`
                                        : `/post/${article.url}`
                                }
                            >
                                <img
                                    src={article.mainImage.src}
                                    className="news_post_picture"
                                    alt={article.mainImage.alt}
                                    title={article.mainImage.title}
                                />
                            </Link>
                            <div className="news_post_title_box">
                                <span className="news_preview_post_data_box">
                                    {parseDate(article.date).date}
                                </span>
                                <span className="news_preview_post_time_box">
                                    {parseDate(article.date).time}
                                </span>
                            </div>
                        </div>
                        <div className="news_post_text_box">
                            <div>
                                <h3>{article.titleRu}</h3>
                                <p>{article.descriptionRu}</p>
                            </div>
                            <Link
                                to={
                                    this.props.location.pathname.includes("/ua")
                                        ? `/ua/post/${article.url}`
                                        : `/post/${article.url}`
                                }
                            >
                                <span>Читать дальше</span>
                            </Link>
                        </div>
                        <span className="news_post_background" />
                    </div>
                );
            } else if (!article.hasRu) {
                return null;
            }
        } else if (!lang) {
            return (
                <div className="news_post_box">
                    <div className="news_post_picture_box">
                        <Link
                            to={
                                this.props.location.pathname.includes("/ua")
                                    ? `/ua/post/${article.url}`
                                    : `/post/${article.url}`
                            }
                        >
                            <img
                                src={article.mainImage.src}
                                className="news_post_picture"
                                alt={article.mainImage.alt}
                                title={article.mainImage.title}
                            />
                        </Link>
                        <div className="news_post_title_box">
                            <span className="news_preview_post_data_box">
                                {parseDate(article.date).date}
                            </span>
                            <span className="news_preview_post_time_box">
                                {parseDate(article.date).time}
                            </span>
                        </div>
                    </div>
                    <div className="news_post_text_box">
                        <div>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                        </div>
                        <Link
                            to={
                                this.props.location.pathname.includes("/ua")
                                    ? `/ua/post/${article.url}`
                                    : `/post/${article.url}`
                            }
                            style={{ textDecoration: "none" }}
                        >
                            <span>Читати далі</span>
                        </Link>
                    </div>
                    <span className="news_post_background" />
                </div>
            );
        }
    };

    latestBlock = article => {
        const lang = !this.props.location.pathname.includes("/ua");

        if (lang) {
            if (article.hasRu) {
                return (
                    <div className="news_preview_post">
                        <div className="news_preview_background_box" />
                        <Link
                            to={
                                this.props.location.pathname.includes("/ua")
                                    ? `/ua/post/${article.url}`
                                    : `/post/${article.url}`
                            }
                        >
                            <div className="news_preview_post_picture_box">
                                <img
                                    src={article.mainImage.src}
                                    className="news_post_picture"
                                    alt={article.mainImage.alt}
                                    title={article.mainImage.title}
                                />
                                <div className="news_preview_post_title_box">
                                    <h4>{article.titleRu}</h4>
                                    <div>
                                        <span className="news_preview_post_data_box">
                                            {parseDate(article.date).date}
                                        </span>
                                        <span className="news_preview_post_time_box">
                                            {parseDate(article.date).time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="news_preview_post_text_box">
                            <h3>Новости компании</h3>
                            <Editor text={article.descriptionRu} />
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return (
                <div className="news_preview_post">
                    <div className="news_preview_background_box" />
                    <Link
                        to={
                            this.props.location.pathname.includes("/ua")
                                ? `/ua/post/${article.url}`
                                : `/post/${article.url}`
                        }
                    >
                        <div className="news_preview_post_picture_box">
                            <img
                                src={article.mainImage.src}
                                className="news_post_picture"
                                alt={article.mainImage.alt}
                                title={article.mainImage.title}
                            />
                            <div className="news_preview_post_title_box">
                                <h4>{article.title}</h4>
                                <div>
                                    <span className="news_preview_post_data_box">
                                        {parseDate(article.date).date}
                                    </span>
                                    <span className="news_preview_post_time_box">
                                        {parseDate(article.date).time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="news_preview_post_text_box">
                        <h3>Новини компанії</h3>
                        <Editor text={article.description} />
                    </div>
                </div>
            );
        }
    };

    render() {
        const article = this.props.article;
        const lang = !this.props.location.pathname.includes("/ua");
        let metaTags =
            this.props.getMetaResult && this.props.getMetaResult.result;

        return (
            <div>
                <SEO
                    title={metaTags && metaTags.title}
                    description={metaTags && metaTags.description}
                    url={"https://suntown-ukraine.com/news"}
                ></SEO>
                <Header {...this.props} />
                <div className="news">
                    <ScrollToTop />
                    <section>
                        <div className="container news_box">
                            <h2>{lang ? "Новости" : "Новини"}</h2>
                            <div className="news_preview_line">
                                {!article.loadingArtcile &&
                                    article.loadedArticle &&
                                    !article.loadingArtcileError &&
                                    article.articles &&
                                    [...article.articles]
                                        .reverse()
                                        .splice(0, 2)
                                        .map(article =>
                                            this.latestBlock(article)
                                        )}
                            </div>
                            <div className="news_preview_pointer">
                                <span>
                                    {lang
                                        ? "Общий список новостей"
                                        : "Загальний список новин"}
                                </span>
                                <img
                                    className="arrow_down"
                                    src={arrow_down_img}
                                    alt=""
                                />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container post_container">
                            {!article.loadingArtcile &&
                                article.loadedArticle &&
                                !article.loadingArtcileError &&
                                article.articles &&
                                [...article.articles]
                                    .reverse()
                                    .splice(0, this.state.loadedNews)
                                    .map(article => this.newsBlock(article))}
                        </div>
                    </section>
                    <section>
                        <div
                            className="container"
                            onClick={() =>
                                this.setState({
                                    loadedNews: this.state.loadedNews + 5
                                })
                            }
                        >
                            <div className="news_preview_pointer">
                                <span>
                                    {lang ? "Больше новостей" : "Більше новин"}
                                </span>
                                <img
                                    className="arrow_down"
                                    src={arrow_down_img}
                                    alt=""
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.lang,
        article: state.articles,
        getMetaResult: state.seo.getSeoByUrlResult
    };
};

function loadData({ dispatch }, path) {
    console.log("path", path);
    const lang = path.includes("/ua") ? "ua" : "ru";

    const promises = [
        dispatch(getArticles()),
        dispatch(getSeoByUrl("news", lang))
    ];

    return Promise.all(promises);
}

export default {
    loadData,
    component: connect(
        mapStateToProps,
        { getArticles, getSeoByUrl }
    )(News)
};
