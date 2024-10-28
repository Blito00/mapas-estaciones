import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, Icon, Card, Badge } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import Carousel from "react-native-reanimated-carousel";

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [mapType, setMapType] = useState<
    "standard" | "satellite" | "hybrid" | "terrain"
  >("standard");
  // Datos hardcodeados
  const data = [
    {
      _id: "1234567890",
      name: {
        original: "Example Device 1",
        custom: "Example Custom Name 1",
      },
      meta: {
        airTemp: 25.0,
        rh: 50.0,
        solarRadiation: 900,
      },
      position: {
        altitude: 100.5,
        geo: {
          type: "Point",
          coordinates: [-100.123456, 50.123456],
        },
      },
    },
    {
      _id: "6716ec79a4894d50e5d205a6",
      name: {
        original: "00210E69",
        custom: "Laguna Yema (CEDEVA)",
      },
      meta: {
        airTemp: 35.4,
        rh: 17.74,
        solarRadiation: 1023,
      },
      position: {
        altitude: 164.4,
        geo: {
          type: "Point",
          coordinates: [-61.243916, -24.271166],
        },
      },
    },
  ];

  // Extraer las coordenadas de los datos
  const { coordinates } = data[0].position.geo;
  const [longitude, latitude] = coordinates;

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleMarkerPress = (coordinate: LatLng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -25.0588787,
          longitude: -59.5118815,
          latitudeDelta: 5.0922,
          longitudeDelta: 5.0421,
        }}
        zoomControlEnabled={true}
        mapType={mapType}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={data[0].name.custom || data[0].name.original}
          description={`Temp: ${data[0].meta.airTemp}°C, Humedad: ${data[0].meta.rh}%`}
        />
        <Circle
          center={{ latitude, longitude }}
          radius={100000}
          strokeColor="red"
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={["3%", "45%"]}
        handleStyle={styles.bottomSheetHandle}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Carousel
            data={data} // Cambiado de [data] a data
            renderItem={({ item }) => (
              <Card style={styles.carouselItem}>
                <Card.Title
                  title={item.name.custom}
                  titleVariant="titleLarge"
                  left={(props) => (
                    <Icon
                      source="map-marker-radius"
                      color={"black"}
                      size={40}
                    />
                  )}
                />
                <Card.Content>
                  <Text style={styles.subtext}>
                    Temperatura: {item.meta.airTemp}°C
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      handleMarkerPress({
                        latitude: item.position.geo.coordinates[1],
                        longitude: item.position.geo.coordinates[0],
                      })
                    }
                  >
                    Ir a ubicación
                  </Button>
                </Card.Actions>
              </Card>
            )}
            loop
            width={400}
          />
        </BottomSheetView>
      </BottomSheet>
      {/* <View style={styles.controls}>
       <Button title="Standard" onPress={() => setMapType('standard')} />
        <Button title="Satellite" onPress={() => setMapType('satellite')} />
        <Button title="Hybrid" onPress={() => setMapType('hybrid')} />
        <Button title="Terrain" onPress={() => setMapType('terrain')} />
    </View> */}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  controls: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
  },
  carouselContainer: {
    position: "absolute",
  },
  carouselItem: {
    marginTop: "10@ms0.5",
    width: "90%",
    height: "200@ms0.5",
    marginLeft: "20@ms",
    marginRight: "20@ms",
    borderRadius: 10,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(197, 197, 197, 0.5)",
  },
  text: {
    fontSize: "16@ms",
    marginBottom: "15@ms",
    textAlign: "center",
  },
  subtext: {
    fontSize: "14@ms",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "green",
    color: "white",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSheetHandle: {
    backgroundColor: "rgba(197, 197, 197, 0.5)",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
});

export default MapScreen;
