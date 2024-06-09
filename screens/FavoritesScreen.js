import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, getFavorites, deleteFavorite } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const favs = await getFavorites(user.uid);
        setFavorites(favs);
      }
    };

    fetchFavorites();
  }, []);

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
            setFavorites(favorites.filter((favorite) => favorite.id !== id));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemContent}
        onPress={() =>
          navigation.navigate("FavoritesDetailScreen", { ilan: item })
        }
      >
        <Text style={styles.listItemText}>
          {item.city} - {item.price} TL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Text style={styles.deleteButtonText}>Kaldır</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favori İlanlar</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemContent: {
    flex: 1,
  },
  listItemText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
