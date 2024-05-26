import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, getUserIlanlar, deleteIlan } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

const MyListingsScreen = () => {
  const [ilanlar, setIlanlar] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchIlanlar = async () => {
      const user = auth.currentUser;
      if (user) {
        const userIlanlar = await getUserIlanlar(user.uid);
        setIlanlar(userIlanlar);
      }
    };

    fetchIlanlar();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "İlanı Sil",
      "Bu ilanı silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Sil",
          onPress: async () => {
            await deleteIlan(id);
            setIlanlar(ilanlar.filter((ilan) => ilan.id !== id));
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
          navigation.navigate("ProfileDetailScreen", { ilan: item })
        }
      >
        <Text style={styles.listItemText}>
          {item.city} - {item.price} TL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>İlanlarım</Text>
      <FlatList
        data={ilanlar}
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

export default MyListingsScreen;
