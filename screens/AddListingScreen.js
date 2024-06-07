import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { addIlan, auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const AddListingScreen = () => {
  const [bath, setBath] = useState("");
  const [bed, setBed] = useState("");
  const [city, setCity] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");

  const bathInputRef = useRef(null);
  const bedInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const imgInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const stateInputRef = useRef(null);

  const navigation = useNavigation(); // Add this line

  const handleAddListing = async () => {
    try {
      const user = auth.currentUser;
      await addIlan(bath, bed, city, img, price, state, user.uid);
      console.log("İlan Eklendi");
      Alert.alert("Başarılı", "İlan ekleme işlemi başarılı!", [
        {
          text: "Tamam",
          onPress: () => navigation.navigate("ProfileScreen"), // Navigate to ProfileScreen
        },
      ]);
    } catch (error) {
      console.error("İlan eklenirken hata oluştu: ", error);
      Alert.alert("Hata", "İlan eklenirken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Banyo Sayısı</Text>
      <TextInput
        style={styles.input}
        value={bath}
        onChangeText={setBath}
        returnKeyType="next"
        onSubmitEditing={() => bedInputRef.current.focus()}
        ref={bathInputRef}
      />
      <Text style={styles.label}>Yatak Odası Sayısı</Text>
      <TextInput
        style={styles.input}
        value={bed}
        onChangeText={setBed}
        returnKeyType="next"
        onSubmitEditing={() => cityInputRef.current.focus()}
        ref={bedInputRef}
      />
      <Text style={styles.label}>Şehir</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        returnKeyType="next"
        onSubmitEditing={() => imgInputRef.current.focus()}
        ref={cityInputRef}
      />
      <Text style={styles.label}>Görsel URL</Text>
      <TextInput
        style={styles.input}
        value={img}
        onChangeText={setImg}
        returnKeyType="next"
        onSubmitEditing={() => priceInputRef.current.focus()}
        ref={imgInputRef}
      />
      <Text style={styles.label}>Fiyat</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => stateInputRef.current.focus()}
        ref={priceInputRef}
      />
      <Text style={styles.label}>Eyalet</Text>
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={setState}
        returnKeyType="done"
        onSubmitEditing={handleAddListing}
        ref={stateInputRef}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddListing}>
        <Text style={styles.buttonText}>İlan Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddListingScreen;
