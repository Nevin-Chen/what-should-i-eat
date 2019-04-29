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
      selectedPlace: {},
      center: {},
      bounds: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPlace !== prevState.selectedPlace) {
      let {lat} = this.state.selectedPlace.position
      let {lng} = this.state.selectedPlace.position
      this.setState({center: {lat:lat, lng:lng}})
    }
    if (this.state.venues !== prevState.venues) {
      let bounds = new this.props.google.maps.LatLngBounds();
      this.state.venues.map(current => {
        let lat = current.venue.location.lat;
        let lng = current.venue.location.lng;
        return bounds.extend({ lat, lng });
      })
      this.setState({bounds: bounds})
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
      client_id: "",
      client_secret: "",
      query: this.state.search,
      near: "Financial District, NY",
      limit: 25,
      radius: 50,
      section: 'food',
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
      client_id: "",
      client_secret: "",
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
  apiKey: ""
})(MapContainer);
