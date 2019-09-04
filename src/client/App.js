import React from "react";
import { renderRoutes } from "react-router-config";

const App = ({ route }) => {
    return <div> {renderRoutes(Routes)}</div>;
};

export default App;
