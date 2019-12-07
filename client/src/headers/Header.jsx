import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return <header>
      <div className="container">
        <nav className="navbar navbar-expand-md">
          <a className="navbar-brand" href="/">
            <img src="./imgs/logo.png" height="30" alt="img" />
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav1">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Team</a>
              </li>
            </ul>

            <ul className="navbar-nav justify-content-end d-none d-lg-flex ml-md-auto">
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="fab fa-slack"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="fab fa-twitter"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/kevinngn99/Flowers"><i className="fab fa-github"></i></a>
              </li>
            </ul>

            <a className="btn btn-outline-primary ml-md-3" href="/">Login</a>
          </div>
        </nav>
      </div>
    </header>
  }
}

export default Header
