import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { addFavorite } from "../config/firebase";

const DetailScreen = ({ route }) => {
  const { ilan } = route.params;

  const handleAddFavorite = () => {
    addFavorite(ilan);
    alert("Favorilere eklendi!");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: ilan.img }} style={styles.image} />
      <Text style={styles.text}>Banyo: {ilan.bath}</Text>
      <Text style={styles.text}>Yatak: {ilan.bed}</Text>
      <Text style={styles.text}>Ev Fiyatı: {ilan.price} TL</Text>
      <Text style={styles.text}>Şehir: {ilan.city}</Text>
      <TouchableOpacity onPress={handleAddFavorite}>
        <Text style={styles.favorite}>⭐ Favorilere Ekle</Text>
      </TouchableOpacity>
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
  favorite: {
    fontSize: 18,
    color: "blue",
    marginTop: 16,
  },
});

export default DetailScreen;
