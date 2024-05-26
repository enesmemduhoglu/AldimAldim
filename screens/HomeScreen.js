import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useilanlarListener } from "../config/firebase";

const HomeScreen = () => {
  const ilanlar = useilanlarListener();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const scrollViewRef = useRef(null);

  const navigation = useNavigation();

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const currentItems = paginate(ilanlar, itemsPerPage, currentPage);

  const renderPageNumbers = () => {
    let pages = [];
    const visiblePages = 3;
    const totalPages = Math.ceil(ilanlar.length / itemsPerPage);

    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.paginationButton,
            currentPage === i && styles.activePageButton,
          ]}
          onPress={() => setCurrentPage(i)}
        >
          <Text
            style={[
              styles.paginationText,
              currentPage === i && styles.activePageText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <TouchableOpacity
            key={"ellipsis-end"}
            style={styles.paginationButton}
            disabled={true}
          >
            <Text style={styles.paginationText}>...</Text>
          </TouchableOpacity>
        );
      }
      pages.push(
        <TouchableOpacity
          key={totalPages}
          style={styles.paginationButton}
          onPress={() => setCurrentPage(totalPages)}
        >
          <Text style={styles.paginationText}>{totalPages}</Text>
        </TouchableOpacity>
      );
    }

    return pages;
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.adsContainer}
      >
        {currentItems.map((ilan, index) => (
          <TouchableOpacity
            key={index}
            style={styles.adContainer}
            onPress={() => navigation.navigate("DetailScreen", { ilan })}
          >
            <Image source={{ uri: ilan.img }} style={styles.adImage} />
            <Text style={styles.adInfo}>Banyo: {ilan.bath}</Text>
            <Text style={styles.adInfo}>Yatak: {ilan.bed}</Text>
            <Text style={styles.adInfo}>Ev Fiyatı: {ilan.price} TL</Text>
            <Text style={styles.adInfo}>Şehir: {ilan.city}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.paginationContainer}>{renderPageNumbers()}</View>
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    flexWrap: "wrap",
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  paginationText: {
    fontSize: 16,
  },
  activePageButton: {
    backgroundColor: "tomato",
  },
  activePageText: {
    color: "white",
    fontWeight: "bold",
  },
  inactivePageButton: {
    backgroundColor: "#007AFF",
  },
});

export default HomeScreen;
