import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BasketScreen from "../screens/BasketScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import FavoriteScreen from "../screens/FavoriteScreen";

const BottomBarNavigator = () => {
  const Tab = createBottomTabNavigator();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Basket") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "Favourite") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Basket" && totalQuantity > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#2A59FE",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <Header title="E-Market" {...props} navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <Header title="E-Market" {...props} navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoriteScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <Header title="E-Market" {...props} navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <Header title="E-Market" {...props} navigation={navigation} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
