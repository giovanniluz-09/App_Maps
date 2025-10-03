import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão negada para acessar localização');
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLocation(current.coords);

      } catch (e) {
        setErrorMsg(e.message);
      }
    })();

  }, []);

  const initialRegion = {
    latitude: location ? location.latitude : -22.90556,
    longitude: location ? location.longitude : -47.06083,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
        >

          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={'Você'}
              pinColor={'red'}
            />
          )}
        </MapView>

        {errorMsg && (
          <View style={styles.error}>
            <Text style={{ color: 'red' }}>{errorMsg}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loading: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  error: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
});
