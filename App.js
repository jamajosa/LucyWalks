import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import React from 'react';
import {getDistance, getPreciseDistance} from 'geolib';

export default class App extends React.Component {


  oldstate = {
    oldlongitude:0,
    oldLatitude:0,
    longitude: 0,
    latitude: 0,
    errorMessage: ''
  }
  state = {
    //location: {},
    longitude: 0,
    latitude: 0,
    errorMessage: ''
  };
  dis =0.0;
  color = 'green';
  text = "";

  componentDidMount() {
    this._getLocation()
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === 'granted') {
      this._updateLocation(0);
  }
    if(status !== 'granted'){
      console.log ('Permission not granted!');
      this.setState({
        errorMessage: 'We hebben geen toegang tot uw locatie.'
      })
    }
  }

//   getAngle(lat1,lat2,long1,long2) {
//     const dLon = (long2 - long1);
//     const y = Math.sin(dLon) * Math.cos(lat2);
//     const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
//             * Math.cos(lat2) * Math.cos(dLon);
//     let brng = Math.atan2(y, x);
//     brng = brng * 180 / Math.PI;
//     brng = (brng + 360) % 360;
//     brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise
//     return brng;
// }

  calculateDistance(){
    const dis2 = this.dis
    this.dis = getPreciseDistance(
      {latitude: 51.493280, longitude: 4.294605 },
      {latitude: this.state.latitude, longitude: this.state.longitude},
    );


    this.text = this.getAngle(this.state.latitude, 51.493280, this.state.longitude, 4.294605);

    this.setBackgroundColor();
  };
 

  _updateLocation = async()=>{
    const timers = require('timers-promises')
    await timers.setTimeout(1500);
    const userLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true}).then((data) =>
    {
      this.setState({
        oldlongitude:this.state.longitude,
        oldLatitude:this.state.latitude,
        //location: data,
        longitude: data.coords.longitude,
        latitude: data.coords.latitude
      })
      this.calculateDistance();
      this._updateLocation();
    })
  }
  setBackgroundColor = () => {
    
    if (this.dis === 0) {
      this.color = '';
    } else if (this.dis >= 1 && this.dis < 20) {
      if (this.color !='red'){
        const interval = setInterval(() => Vibration.vibrate(), 5000);
        setTimeout(() => clearInterval(interval), 5000);
        this.color = 'red';
      }
      this.color = 'red';
    } else if (this.dis >= 20 && this.dis < 35) {
      if (this.color !='orange'){
        const interval = setInterval(() => Vibration.vibrate(), 5000);
        setTimeout(() => clearInterval(interval), 2000);
        this.color = 'orange';
      }
    } else if (this.dis >= 35 && this.dis < 50) {
      if (this.color !='yellow'){
        const interval = setInterval(() => Vibration.vibrate(), 5000);
        setTimeout(() => clearInterval(interval), 1000);
        this.color = 'yellow';
      }
    } else if (this.dis >= 50) {
      this.color = 'green';
    }
};
  render() { return (
    <View style={[styles.container,{backgroundColor: this.color}]}>
      {/* <Text>longitude: {this.state.longitude}</Text>
      <Text>latitude: {this.state.latitude}</Text>
      <Text>{this.dis}</Text> */
      <Text style={styles.text}>{this.dis} METER {this.text}</Text>
      }
      <StatusBar style="auto" />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color:'white',
  }
});
