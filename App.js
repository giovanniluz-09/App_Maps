import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
        <Marker
        coordinate={{ latitude: -23.55052, longitude: -46.633308 }}
        title={"São Paulo"}
        description={"Capital financeira do Brasil"}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
