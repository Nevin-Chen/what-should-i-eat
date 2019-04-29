import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Navbar from "./Navbar";
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      venues: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      center: {},
      bounds: {},
      currQuery: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPlace !== prevState.selectedPlace) {
      let { lat } = this.state.selectedPlace.position;
      let { lng } = this.state.selectedPlace.position;
      this.setState({ center: { lat: lat, lng: lng } });
    }
    if (this.state.venues !== prevState.venues) {
      let bounds = new this.props.google.maps.LatLngBounds();
      this.state.venues.map(current => {
        let lat = current.venue.location.lat;
        let lng = current.venue.location.lng;
        return bounds.extend({ lat, lng });
      });
      this.setState({ bounds: bounds });
    }
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false
      });
    }
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  getVenues = async () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "KUZ0H02M1VQNYUNKV40GFCICQUYGHRZJQVFLFS4MK01IHFYE",
      client_secret: "ESQTWW5FJSPUDTTCM5JWQ1EO3T1GXNRVMS5XTKR3AKC4GNVJ",
      query: this.state.search,
      near: "Financial District, NY",
      limit: 25,
      radius: 50,
      section: "food",
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

  getRandom = async () => {
    let randomQueries = [
      "Japanese",
      "Korean",
      "Vietnamese",
      "Chinese",
      "Shanghainese",
      "Taiwanese",
      "Thai",
      "Indian",
      "Mexican",
      "Jamaican",
      "Italian",
      "French",
      "German",
      "Mediterranean",
      "Greek",
      "Moroccan",
      "Filipino",
      "Hawaiian",
      "Burgers",
      "Lobster",
      "Fried Chicken",
      "Poke",
      "Pizza"
    ];

    function randomInt() {
      return Math.floor(Math.random() * Math.floor(randomQueries.length));
    };

    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "KUZ0H02M1VQNYUNKV40GFCICQUYGHRZJQVFLFS4MK01IHFYE",
      client_secret: "ESQTWW5FJSPUDTTCM5JWQ1EO3T1GXNRVMS5XTKR3AKC4GNVJ",
      query: randomQueries[randomInt()],
      near: "Financial District, NY",
      limit: 10,
      radius: 10,
      v: "20180323"
    };

    const queryResults = await axios.get(
      endPoint + new URLSearchParams(parameters)
    );

    this.setState({
      venues: queryResults.data.response.groups[0].items,
      currQuery: parameters.query
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
          getRandom={this.getRandom}
          currQuery={this.state.currQuery}
        />
        <Map
          google={this.props.google}
          style={{
            width: "100%",
            height: "95%"
          }}
          initialCenter={{
            lat: 40.7050957,
            lng: -74.009168
          }}
          center={this.state.center}
          bounds={this.state.bounds}
          zoom={14}
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
  apiKey: "AIzaSyDKuup9rkE1YPzfcSvki3ing2TzfJj7ufE"
})(MapContainer);
