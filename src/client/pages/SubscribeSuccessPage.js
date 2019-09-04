import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/CancelSubscription.css";
import { apiUrl } from "../config";

import Header from "../components/Header";
import SEO from "../components/SEO";

class SubscribeSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET"
        };

        let query = window.location.search;

        fetch(`${apiUrl}/verify${query}`, requestOptions)
            .then(res => res.json())
            .then(res => {
                document.getElementById("subscription_status").textContent =
                    res.message;
            });
    }

    render() {
        return (
            <div className="cancel_subscription">
                <SEO
                    title={"Подписка на рассылку| SunTown"}
                    description={
                        "Опция на сайте, которая позволяет посетителям получать рассылки компании на указанный email адрес. "
                    }
                    url={"https://suntown-ukraine.com/newsletter/verify"}
                ></SEO>
                <Header {...this.props} />
                <section className="cancel_section">
                    <div className="container cancel_container">
                        <h2 id="subscription_status" className="cancel_text">
                            E-mail адрес успешно подтвержден.
                        </h2>
                        <h2 className="cancel_text">Спасибо!</h2>
                        <Link
                            to={
                                this.props.location.pathname.includes("/ua")
                                    ? "/ua/"
                                    : "/"
                            }
                        >
                            <div className="error_return_button">
                                <span>На главную</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default SubscribeSuccess;
