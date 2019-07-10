import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Navbar } from './navbar';
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
      center: { lat: 40.7050957, lng: -74.009168 },
      bounds: { lat: 40.7050957, lng: -74.009168 },
      coordinates: { lat: 40.7050957, lng: -74.009168 },
      currQuery: ""
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(async res => {
      const { coords } = res;
      this.setState({
        center: { lat: coords.latitude, lng: coords.longitude },
        coordinates: { lat: coords.latitude, lng: coords.longitude }
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPlace !== prevState.selectedPlace) {
      let { lat } = this.state.selectedPlace.position;
      let { lng } = this.state.selectedPlace.position;
      this.setState({ center: { lat: lat, lng: lng } });
    }
    if (this.state.venues !== prevState.venues) {
      let bounds = new this.props.google.maps.LatLngBounds();
      bounds.extend({ lat: this.state.center.lat, lng: this.state.center.lng });
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

  onSubmit = evt => {
    evt.preventDefault();
    this.getVenues();
  }

  getVenues = async () => {
    const { data } = await axios.get(`/${this.state.search}?lng=${this.state.coordinates.lng}&lat=${this.state.coordinates.lat}`);
    if (this.state.search.length > 0) {
      this.setState({
        venues: data.response.groups[0].items,
        search: "",
        currQuery: ""
      });
    }
  };

  getMCD = async () => {
    const { data } = await axios.get(`/McDonalds?lng=${this.state.coordinates.lng}&lat=${this.state.coordinates.lat}`);
    this.setState({
      venues: data.response.groups[0].items,
      currQuery: ""
    });
  };

  getRandom = async () => {
    const { data } = await axios.get(`/random?lng=${this.state.coordinates.lng}&lat=${this.state.coordinates.lat}`);

    this.setState({
      currQuery: data.response.query,
      venues: data.response.groups[0].items
    });
  };

  render() {
    return (
      <div>
        <Navbar
          search={this.state.search}
          handleChange={this.handleChange}
          getMCD={this.getMCD}
          getRandom={this.getRandom}
          currQuery={this.state.currQuery}
          onSubmit={this.onSubmit}
        />
        <Map
          google={this.props.google}
          style={{
            width: "100%",
            height: "95%"
          }}
          initialCenter={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}
          center={this.state.center}
          bounds={this.state.bounds}
          zoom={16}
        >
          <Marker
            position={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}
            onClick={this.onMarkerClick}
            name={"Current Location"}
            icon={{
              url: "https://i.imgur.com/etAYbLC.png",
              scaledSize: new this.props.google.maps.Size(50, 75)
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
