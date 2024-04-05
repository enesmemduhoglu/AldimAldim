import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Buttons from "../components/Buttons";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/man.png")}
            style={{
              height: 120,
              width: 120,
              position: "absolute",
              top: 30,
              transform: [
                { translateX: 30 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/officer.png")}
            style={{
              height: 130,
              width: 120,
              position: "absolute",
              top: 50,
              left: 100,
              transform: [
                { translateX: 90 },
                { translateY: 50 },
                { rotate: "10deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/man (1).png")}
            style={{
              height: 120,
              width: 120,
              position: "absolute",
              top: 220,
              left: -50,
              transform: [
                { translateX: 90 },
                { translateY: 70 },
                { rotate: "15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/businesswoman.png")}
            style={{
              height: 200,
              width: 200,
              position: "absolute",
              top: 210,
              left: 120,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            bottom: 80,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              bottom: 15,
              color: COLORS.white,
            }}
          >
            Hayalinizdeki
          </Text>
          <Text
            style={{
              fontSize: 52,
              fontWeight: 800,
              bottom: 15,
              color: COLORS.white,
            }}
          >
            Ev
          </Text>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                bottom: 4,
                fontSize: 20,
                color: COLORS.white,
              }}
            >
              Evimiz, Hayalimizin Yuvası
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
              }}
            >
              Senin İçin En Özel Adres!
            </Text>
          </View>

          <Buttons
            title="Şimdi Katıl"
            onPress={() => navigation.navigate("Signup")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: -10,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.white, marginTop: 10 }}>
              Zaten bir hesabın var mı?
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 10,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
