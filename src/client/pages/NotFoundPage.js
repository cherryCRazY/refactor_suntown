import React, { Component } from "react";

import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../Styles/Error.css";
import { connect } from "react-redux";
import BackgroundLines from "../media/404_lines.svg";

class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { staticContext } = this.props;
        staticContext = staticContext ? staticContext : {};
        staticContext.notFound = true;
        return (
            <div className="error">
                <Header {...this.props} />
                <section className="error_section">
                    <div className="container error_container">
                        <img
                            src={BackgroundLines}
                            className="error_section_lines"
                            alt=""
                        />
                        <span className="error_text_404">404</span>
                        <p className="error_description">
                            {this.props.lang.isRu
                                ? "К сожалению, была введена неверная страница. Попробуйте еще раз."
                                : "На жаль, була введена невірна сторінка. Спробуйте ще раз."}
                        </p>
                        <Link
                            to={
                                this.props.location.pathname.includes("/ua")
                                    ? "/ua/"
                                    : "/"
                            }
                        >
                            <div className="error_return_button">
                                <span>
                                    {this.props.lang.isRu
                                        ? "На главную"
                                        : "На головну"}
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.lang
    };
};

export default connect(mapStateToProps)(Error);
