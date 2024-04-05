import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome } from "./screens";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCA265g95_TEfYkhb-kHqL1TXlRYk9kzDY",
  authDomain: "muygulama-23773.firebaseapp.com",
  projectId: "muygulama-23773",
  storageBucket: "muygulama-23773.appspot.com",
  messagingSenderId: "842073864629",
  appId: "1:842073864629:web:a087a11800e1deb57241fc",
  measurementId: "G-QK7CVBVGQM",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
