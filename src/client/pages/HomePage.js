//Core
import React from "react";

//Components
import Main from "../components/Main";

//Styles
import "../Styles/reset.css";
import "../Styles/App.css";
import "../Styles/style.css";





const Homepage = props => {
    return (
        <div className="App">
            <Main {...props} />
        </div>
    );
};

export default Homepage;
