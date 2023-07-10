import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Arit from "./Arit";
import Sdgs from './Sdgs';

const App = () => {
    return (
        <Router>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/arit" element={<Arit endPoint="https://www.soccersuck.com" />} />
                <Route path="/sdgs" element={<Sdgs endPoint="https://sdgs.rmutsv.ac.th/graphql"/>} />
            </Routes>
        </Router>
    )
}

export default App