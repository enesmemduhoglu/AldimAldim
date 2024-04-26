import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="İlanlar"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};
