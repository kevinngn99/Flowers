import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false
    };
  }

  onUsername = (event) => {
    this.setState({username: event.target.value});
  }

  onPassword = (event) => {
    this.setState({password: event.target.value});
  }

  onSumbit = () => {
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/flowers'></Redirect>
    }
    else {
      return <section className="fdb-block py-0">
        <div className="container py-5 my-5" style={{ backgroundImage: 'url(imgs/shapes/10.svg)' }}>
          <div className=" row justify-content-end">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 text-left">
              <div className="fdb-box">
                <div className="row">
                  <div className="col">
                    <h1>Login</h1>
                    <p className="lead"> Southern Sierra Wildflower Club (SSWC) </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-4">
                    <input autoComplete="off" type="text" className="form-control" placeholder="Username" onChange={this.onUsername} />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <input autoComplete="off" type="password" className="form-control" placeholder="Password" onChange={this.onPassword} />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <button className="btn btn-secondary" type="button" onClick={this.onSumbit}> Submit </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    }
  }
}

export default Login
