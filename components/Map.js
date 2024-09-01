import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')

export default function Map() {
    
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 7.1704,
        longitude: 3.4587,
        latitudeDelta: 0.05,  // Adjust this delta value to fit your needs
        longitudeDelta: 0.05, // Adjust this delta value to fit your needs
    }}
    
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height/2,
  },
});
