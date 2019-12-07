import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return <footer className="fdb-block footer-large bg-dark">
      <div className="container">
        <div className="row align-items-top text-center text-md-left">
          <div className="col-12 col-sm-6 col-md-4">
            <h3><strong>Gainesville, Florida</strong></h3>
            <p>UFID: 2119-6741<br />Kevin Nguyen</p>
            <p>+44 827 312 5002</p>
            <p><a href="/">kevinnguyen1@ufl.com</a></p>
          </div>

          <div className="col-12 col-md-4 mt-5 mt-md-0 text-md-left">
            <h3><strong>About Us</strong></h3>
            <p> Southern Sierra Wildflower Club (SSWC) is an organization whose members
                are interested in observing wildflowers in their native habitat in the
                southern part of the Sierra Nevada mountains of California. Login today
                to create, update and delete flowers from the SSWC database.
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col text-center"> © 2019 SSWC. All Rights Reserved </div>
        </div>
      </div>
    </footer>
  }
}

export default Footer
