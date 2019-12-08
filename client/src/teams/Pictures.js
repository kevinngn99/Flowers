import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import EditText from '../components/EditText.js';
import SightingsEditText from '../components/SightingsEditText.js';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
const axios = require('axios');

class Pictures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            sightings: [],
            genus: [],
            species: [],
            name: [],
            files: [
                'california-flannelbush.jpg',
                'ithuriels-spear.jpg',
                'primrose-monkeyflower.jpg',
                'sheltons-violet.jpg',
                'showy-jacobs-ladder.jpg',
                'douglas-dustymaiden.jpg',
                'pale-owls-clover.jpg',
                'death-camas.jpg',
                'broad-seeded-rock-cress.jpg',
                'one-seeded-pussypaws.jpg',
                'varied-leaved-jewelflower.jpg',
                'leopard-lily.jpg',
                'torreys-lomatium.jpg',
                'alpine-penstemon.jpg',
                'woodland-star.jpg',
                'rangers_buttons.jpg',
                'doves-foot-geranium.jpg',
                'globe-gilia.jpg',
                'canyon-dudleya.jpg',
                'large-false-solomons-seal.jpg',
                'hartwegs-wild-ginger.jpg',
                'alpine-lewisia.jpg',
                'cow-parsnip.jpg',
                'bridges-gilia.jpg',
                'alpine-sheep-sorrel.jpg',
                'sierra-nevada-rush.jpg',
                'mud-sedge.jpg',
                'draperia.jpg',
                'showy-milkweed.jpg',
                'butter-and-eggs.jpg',
                'sierra-stonecrop.jpg',
                'hoary-buckwheat.jpg',
                'sierra-angelica.jpg',
                'snow-plant.jpg',
                'sierra-daisy.jpg',
                'alpine-columbine.jpg',
                'kings-sandwort.jpg',
                'woolly-sunflower.jpg',
                'one-sided-wintergreen.jpg',
                'red-mountain-heather.jpg',
                'condensed-phlox.jpg',
                'diamond-clarkia.jpg',
                'large-leaved-lupine.jpg',
                'purple-penstemon.jpg',
                'fireweed.jpg',
                'oak-violet.jpg',
                'water-groundsel.jpg',
                'tinkers-penny.jpg',
                'yellow-and-white-monkeyflower.jpg',
                'lovage.jpg'
            ]
        };

        axios.post('/api/flowers')
            .then((res, err) => {
                if (!err) {
                    var g = [];
                    var s = [];
                    var n = [];

                    for (var i = 0; i < res.data.length; i++) {
                        g.push(res.data[i]['GENUS']);
                        s.push(res.data[i]['SPECIES']);
                        n.push(res.data[i]['COMNAME']);
                    }

                    this.setState({ genus: g });
                    this.setState({ species: s });
                    this.setState({ name: n });
                    this.setState({ loaded: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });

            this.sightingsFunction();
    }

    sightingsFunction = () => {
        axios.post('/api/sightings')
        .then((res, err) => {
            if (!err) {
                var m = [];

                for (var j = 0; j < res.data.length; j++) {
                    m.push(res.data[j]);
                }

                this.setState({ sightings: m });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const Toggle = (props) => {
            var onToggle = useAccordionToggle(props.eventKey);
            return <button eventKey="0" className="btn btn-outline-primary" type="button" onClick={onToggle}> View </button>
        }

        const Sight = (props) => {
            if (this.state.loaded) {
                var chunk = this.state.sightings.map((obj, index) => {
                    if (obj['NAME'] === props.name) {
                        return (
                            <div>
                                <div>
                                    Sighting: #{index + 1}
                                    <div style={{color: "#8892a0"}}> 
                                        <SightingsEditText update={this.sightingsFunction} name={obj['NAME']} person={obj['PERSON']} location={obj['LOCATION']} date={obj['SIGHTED']} change="person"></SightingsEditText>
                                        <SightingsEditText update={this.sightingsFunction} name={obj['NAME']} location={obj['LOCATION']} person={obj['PERSON']} date={obj['SIGHTED']} change="location"></SightingsEditText>
                                        <SightingsEditText update={this.sightingsFunction} name={obj['NAME']} date={obj['SIGHTED']} person={obj['PERSON']} location={obj['LOCATION']} change="date"></SightingsEditText>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        );
                    }
                    else {
                        return <div></div>
                    }
                });
                return chunk;
            }
            else {
                return <div></div>
            }
        }

        var block = this.state.files.map((file, index) => {
            if (this.state.loaded) {
                var path = './imgs/flowers/' + file;
                return <div className="col-sm-3 text-left">
                    <div className="fdb-box p-0">
                        <img key={file} alt="img" className="img-fluid rounded-0" src={path} />
                        <div className="content">
                            <div className="p-3">
                                <div> <h3><strong> <EditText input={this.state.name[index]} change="name"></EditText> </strong></h3> </div>
                                <div><EditText input={this.state.genus[index]} change="genus"></EditText></div>
                                <div><EditText input={this.state.species[index]} change="species"></EditText></div>
                            </div>
                            <Accordion>
                                <Card style={{ borderBottomColor: "#FFFFFF", borderRightColor: "#FFFFFF", borderLeftColor: "#FFFFFF" }}>
                                    <div className="p-3">
                                        <Toggle style={{ float: "left" }} eventKey="0"></Toggle>
                                        <button style={{ float: "right" }} className="btn btn-outline-secondary" type="button" > Delete </button>
                                    </div>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body> <Sight name={this.state.name[index]}></Sight> </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                    <div className="row-50"></div>
                </div>
            }
            else {
                return <div></div>
            }
        });

        return <section className="fdb-block team-1">
            <div className="container">
                <div className="row text-center justify-content-center">
                    <div className="col-8">
                        <h1>SSWC Flower Database</h1>
                        <p className="lead">View beautiful flowers from the Southern Sierra Wildflower Club.</p>
                    </div>
                </div>

                <div className="row-50"></div>

                <div className="row">
                    <div className="col-sm-3 text-left">
                        <div className="fdb-box p-0">
                            <img style={{ padding: "20px" }} alt="img" className="img-fluid rounded-0" src="./imgs/flowers/add.png" />
                            <div className="content">
                                <div className="p-3">
                                    <h3><strong>Common Name</strong></h3>
                                    <p> Genus <br /> Species <br /> </p>
                                </div>
                                <Accordion>
                                    <Card style={{ borderBottomColor: "#FFFFFF", borderRightColor: "#FFFFFF", borderLeftColor: "#FFFFFF" }}>
                                        <div className="p-3">
                                            <button className="btn btn-outline-success" type="button" > Add </button>
                                        </div>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body> <p> Sighting Number: <br /> Sighted By: <br /> Location: <br /> Date: </p> </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                        <div className="row-50"></div>
                    </div>
                    {block}
                </div>
            </div>
        </section>

    }
}

export default Pictures
