import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Navbar from "./navbar";
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      venues: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  getVenues = async () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "",
      client_secret: "",
      query: this.state.search,
      near: "Financial District, NY",
      limit: 20,
      radius: 250,
      v: "20180323"
    };

    const queryResults = await axios.get(
      endPoint + new URLSearchParams(parameters)
    );
    if (this.state.search.length > 0) {
      this.setState({
        venues: queryResults.data.response.groups[0].items,
        search: ""
      });
    }
  };

  getMCD = async () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "KUZ0H02M1VQNYUNKV40GFCICQUYGHRZJQVFLFS4MK01IHFYE",
      client_secret: "ESQTWW5FJSPUDTTCM5JWQ1EO3T1GXNRVMS5XTKR3AKC4GNVJ",
      query: "mcdonalds",
      near: "New York, NY",
      limit: 50,
      radius: 500,
      v: "20180323"
    };

    const queryResults = await axios.get(
      endPoint + new URLSearchParams(parameters)
    );
    this.setState({
      venues: queryResults.data.response.groups[0].items
    });
  };

  render() {
    return (
      <div>
        <Navbar
          getVenues={this.getVenues}
          search={this.state.search}
          handleChange={this.handleChange}
          getMCD={this.getMCD}
        />
        <Map
          google={this.props.google}
          zoom={13}
          style={{
            width: "100%",
            height: "95%"
          }}
          initialCenter={{
            lat: 40.7128073,
            lng: -74.0097476
          }}
          center={{ lat: 40.7482916, lng: -73.9883262 }}
        >
          {this.state.venues.map(current => {
            let lat = current.venue.location.lat;
            let lng = current.venue.location.lng;
            return (
              <Marker
                key={current.venue.id}
                position={{ lat: lat, lng: lng }}
                onClick={this.onMarkerClick}
                name={current.venue.name}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
