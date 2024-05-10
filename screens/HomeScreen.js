import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useilanlarListener } from "../config/firebase";

export const HomeScreen = () => {
  const ilanlar = useilanlarListener();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Veri kümesini belirli bir sayfa numarasına ve sayfa boyutuna göre filtreleyen fonksiyon
  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  // Geçerli sayfadaki ilanları al
  const currentItems = paginate(ilanlar, itemsPerPage, currentPage);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.adsContainer}>
        {currentItems.map((ilan, index) => (
          <View key={index} style={styles.adContainer}>
            <Image source={{ uri: ilan.img }} style={styles.adImage} />
            <Text style={styles.adInfo}>Banyo: {ilan.bath}</Text>
            <Text style={styles.adInfo}>Yatak: {ilan.bed}</Text>
            <Text style={styles.adInfo}>Ev Fiyatı: {ilan.price} TL</Text>
            <Text style={styles.adInfo}>Şehir: {ilan.city}</Text>
          </View>
        ))}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => setCurrentPage(currentPage - 1)}
          >
            <Text style={styles.paginationText}>Önceki Sayfa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => setCurrentPage(currentPage + 1)}
          >
            <Text style={styles.paginationText}>Sonraki Sayfa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  adsContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  adContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  adImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  adInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  paginationButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  paginationText: {
    color: "white",
    fontSize: 16,
  },
});
