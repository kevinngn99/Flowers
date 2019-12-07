import React, { Component } from 'react';

import Teams01 from './teams/Teams01.jsx';
import Teams02 from './teams/Teams02.jsx';
import Teams03 from './teams/Teams03.jsx';
import Teams04 from './teams/Teams04.jsx';
import Teams05 from './teams/Teams05.jsx';
import Teams06 from './teams/Teams06.jsx';
import Teams07 from './teams/Teams07.jsx';
import Teams08 from './teams/Teams08.jsx';

class Teams extends Component {
  render() {
    return (
      <div>
        <Teams01></Teams01>
        <Teams02></Teams02>
        <Teams03></Teams03>
        <Teams04></Teams04>
        <Teams05></Teams05>
        <Teams06></Teams06>
        <Teams07></Teams07>
        <Teams08></Teams08>
      </div>
    )
  }
}

export default Teams