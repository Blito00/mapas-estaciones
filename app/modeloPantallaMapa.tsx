import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface DeviceData {
  _id: string;
  name: {
    original: string;
    custom: string;
  };
  position: {
    geo: {
      type: string;
      coordinates: [number, number];
    };
    altitude: number;
  };
  meta: {
    airTemp: number;
    rh: number;
  };
  info: {
    device_name: string;
  };
}

const MapScreen = () => {
  const [data, setData] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos desde tu API
    const fetchData = async () => {
      try {
        const response = await fetch('https://tu-api-endpoint.com/device-data');
        const jsonData: DeviceData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data) {
    return <View><Text>No data available</Text></View>;
  }

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
        description={`Dispositivo: ${data.info.device_name}, Temp: ${data.meta.airTemp}°C`}
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
