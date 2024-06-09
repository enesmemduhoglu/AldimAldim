import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { deleteFavorite } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const FavoritesDetailScreen = ({ route }) => {
  const { ilan } = route.params;
  const navigation = useNavigation();

  const handleRemoveFavorite = (id) => {
    Alert.alert(
      "Favoriden Kaldır",
      "Bu ilanı favorilerinizden kaldırmak istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Kaldır",
          onPress: async () => {
            await deleteFavorite(id);
            navigation.navigate("ProfileScreen");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: ilan.img }} style={styles.image} />
      <Text style={styles.text}>Banyo: {ilan.bath}</Text>
      <Text style={styles.text}>Yatak: {ilan.bed}</Text>
      <Text style={styles.text}>Ev Fiyatı: {ilan.price} TL</Text>
      <Text style={styles.text}>Şehir: {ilan.city}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFavorite(ilan.id)}
      >
        <Text style={styles.deleteButtonText}>Favorilerden Kaldır</Text>
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
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FavoritesDetailScreen;
