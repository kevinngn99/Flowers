import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import Login from './forms/Login.jsx';
import Header from './headers/Header.jsx';
import Flowers from './components/Flowers.jsx';
import Pictures from './teams/Pictures.jsx';
import Footer from './footers/Footer.jsx';

import {Route, BrowserRouter as Router} from "react-router-dom";
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Header></Header>
            <Route exact path="/" component={Login} />
            <Route exact path="/pictures" component={Pictures} />
            <Route exact path="/flowers" component={Flowers} />
            <Footer></Footer>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
