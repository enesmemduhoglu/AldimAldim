// import React from "react";
// import { View, StyleSheet, Button } from "react-native";
// import { signOut } from "firebase/auth";

// import { auth } from "../config";

// export const HomeScreen = () => {
//   const handleLogout = () => {
//     signOut(auth).catch((error) => console.log("Error logging out: ", error));
//   };
//   return (
//     <View style={styles.container}>
//       <Button title="Sign Out" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// import React from "react";
// import {
//   View,
//   StyleSheet,
//   ScrollView,
//   Image,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { signOut } from "firebase/auth";

// import { auth } from "../config";

// export const HomeScreen = () => {
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log("Çıkış işlemi başarılı.");
//     } catch (error) {
//       console.error("Çıkış işleminde hata oluştu: ", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.adsContainer}>
//         <View style={styles.adContainer}>
//           <Image source={require("../assets/ev1.jpg")} style={styles.adImage} />
//           <Text style={styles.adInfo}>Oda Sayısı: 3</Text>
//           <Text style={styles.adInfo}>Ev Fiyatı: 1.234.000 TL</Text>
//           <Text style={styles.adInfo}>Şehir: Bursa</Text>
//         </View>

//         <View style={styles.adContainer}>
//           <Image source={require("../assets/ev2.jpg")} style={styles.adImage} />
//           <Text style={styles.adInfo}>Oda Sayısı: 2</Text>
//           <Text style={styles.adInfo}>Ev Fiyatı: 2.200.000 TL</Text>
//           <Text style={styles.adInfo}>Şehir: İstanbul</Text>
//         </View>

//         <View style={styles.adContainer}>
//           <Image source={require("../assets/ev3.jpg")} style={styles.adImage} />
//           <Text style={styles.adInfo}>Oda Sayısı: 4</Text>
//           <Text style={styles.adInfo}>Ev Fiyatı: 3.600.00 TL</Text>
//           <Text style={styles.adInfo}>Şehir: İzmir</Text>
//         </View>

//         <View style={{ height: 40 }} />

//         <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
//           <Text style={styles.signOutText}>Çıkış Yap</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   adsContainer: {
//     flexGrow: 1,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   adContainer: {
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//   },
//   adImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   adInfo: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   signOutButton: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "#007AFF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   signOutText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { auth, db } from "../config"; // db, Firestore bağlantısı için kullanılacak

export const HomeScreen = () => {
  const [ilanlar, setIlanlar] = useState([]);

  useEffect(() => {
    const getIlanlar = async () => {
      try {
        const ilanlarCollection = collection(db, "ilanlar");
        const ilanlarSnapshot = await getDocs(ilanlarCollection);
        const ilanlarData = ilanlarSnapshot.docs.map((doc) => doc.data());
        setIlanlar(ilanlarData);
      } catch (error) {
        console.error("Firestore veri alma hatası: ", error);
      }
    };

    getIlanlar();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Çıkış işlemi başarılı.");
    } catch (error) {
      console.error("Çıkış işleminde hata oluştu: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.adsContainer}>
        {ilanlar.map((ilan, index) => (
          <View style={styles.adContainer} key={index}>
            {/* Şehir */}
            <Text style={styles.adInfo}>Şehir: {ilan.city}</Text>
            {/* Eyalet */}
            <Text style={styles.adInfo}>Eyalet: {ilan.state}</Text>
            {/* Durum */}
            <Text style={styles.adInfo}>Durum: {ilan.status}</Text>
          </View>
        ))}

        <View style={{ height: 40 }} />

        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
          <Text style={styles.signOutText}>Çıkış Yap</Text>
        </TouchableOpacity>
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
  adInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  signOutText: {
    color: "white",
    fontSize: 16,
  },
});
