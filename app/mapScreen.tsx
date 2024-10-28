import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  // Datos hardcodeados
  const data = {
    _id: "6716ec79a4894d50e5d205a3",
    name: {
      original: "00210E60",
      custom: "El Colorado (EAPAA #4)"
    },
    position: {
      altitude: 93,
      geo: {
        type: "Point",
        coordinates: [-59.35484, -26.257476]
      },
      timezoneCode: "America/Argentina/Buenos_Aires"
    },
    meta: {
      airTemp: 28.71,
      rh: 40.29,
      solarRadiation: 1060,
      rain_last: 0,
      windSpeed: 0.3,
      battery: 6844,
      solarPanel: 10055
    },
    info: {
      device_name: "iMetos 3.3"
    }
  };

  // Extraer las coordenadas de los datos
  const { coordinates } = data.position.geo;
  const [longitude, latitude] = coordinates;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{ latitude, longitude }}
        title={data.name.custom || data.name.original}
        description={`Dispositivo: ${data.info.device_name}, Temp: ${data.meta.airTemp}°C, Humedad: ${data.meta.rh}%`}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
