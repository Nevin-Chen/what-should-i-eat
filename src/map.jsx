import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Navbar from "./navbar.jsx";
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: []
    };
  }

  getVenues = async () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: '',
      client_secret: '',
      query: "sushi",
      near: "New York",
      v: "20180323"
    };

    const qResults = await axios.get(
      endPoint + new URLSearchParams(parameters)
    );
    console.log(qResults.data.response.groups[0].items);
    // this.setState({
    //     venues: qResults.data.response.groups[0].items
    // })
  };

  render() {
    return (
      <div>
        <Navbar getVenues={this.getVenues}/>
        <Map
          google={this.props.google}
          zoom={14}
          style={{
            width: "100%",
            height: "100%"
          }}
          initialCenter={{
            lat: 40.7482916,
            lng: -73.9883262
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
