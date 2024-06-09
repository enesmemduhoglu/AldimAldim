import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Çıkış işlemi başarılı.");
    } catch (error) {
      console.error("Çıkış işleminde hata oluştu: ", error);
    }
  };

  const handleAddListing = () => {
    navigation.navigate("AddListing");
  };

  const handleMyListings = () => {
    navigation.navigate("MyListings");
  };

  const handleFavorites = () => {
    navigation.navigate("Favorites");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddListing}>
        <Text style={styles.buttonText}>İlan Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMyListings}>
        <Text style={styles.buttonText}>İlanlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFavorites}>
        <Text style={styles.buttonText}>Favorilerim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
