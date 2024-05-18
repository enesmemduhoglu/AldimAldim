import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DetailScreen = ({ route }) => {
  const { ilan } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: ilan.img }} style={styles.image} />
      <Text style={styles.text}>Banyo: {ilan.bath}</Text>
      <Text style={styles.text}>Yatak: {ilan.bed}</Text>
      <Text style={styles.text}>Ev Fiyatı: {ilan.price} TL</Text>
      <Text style={styles.text}>Şehir: {ilan.city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DetailScreen;
