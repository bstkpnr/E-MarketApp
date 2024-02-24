import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomBarNavigator from "./BottomBarNavigator";
import ProductsDetail from "../screens/Products/ProductsDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header/Header";
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomBarNavigator}
        options={({navigation})=>({ header: (props) => <Header title="E-Market" {...props}  navigation={navigation}/> })}
      />
      <Stack.Screen
        name="ProductsDetail"
        component={ProductsDetail}
        options={({ route, navigation }) => ({
            header: () => (
              <Header
                title={route.params?.name || "E-Market"}
                navigation={navigation}
              />
            ),
          })}
        />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
