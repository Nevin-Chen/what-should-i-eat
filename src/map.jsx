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
      bounds.extend({ lat: 40.7050957, lng: -74.009168 })
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
    console.log(this.state.search)
    const queryResults = await axios.get(`/${this.state.search}`);
    if (this.state.search.length > 0) {
      this.setState({
        venues: queryResults.data.response.groups[0].items,
        search: "",
        currQuery: ""
      });
    }
  };

  getMCD = async () => {
    const queryResults = await axios.get("/McDonalds");
    this.setState({
      venues: queryResults.data.response.groups[0].items,
      currQuery: ""
    });
  };

  getRandom = async () => {
    const randomQueries = () => {
      let cuisines = [
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

      let randomInt = Math.floor(
        Math.random() * Math.floor(cuisines.length)
      );

      return cuisines[randomInt];
    };

    await this.setState({currQuery: `${randomQueries()}`
    });

    const queryResults = await axios.get(`/${this.state.currQuery}`);

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
          zoom={16}
        >
        <Marker position={{ lat: 40.7050957, lng: -74.009168 }}
                onClick={this.onMarkerClick}
                name={'Current Location'}
                icon={{
                  url: "https://i.imgur.com/Cx0QiNQ.png",
                  scaledSize: new this.props.google.maps.Size(32,32)
                }}
              />
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
