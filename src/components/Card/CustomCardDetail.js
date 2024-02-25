import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButtonComponent from "../CustomButtonComponent";
import { useSelector } from "react-redux";

const CustomCardDetail = ({ data, onPress, onPressButton, addToFavori }) => {
  const { name, image, price, description } = data;

  const favorites = useSelector((state) => state.favorites.favoriCartItems);
  const isFavorite = favorites.some((item) => item.id === data.id);

  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.cardContainer}>
        <View style={{ rowGap: 12, padding: 12 }}>
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{ height: "40%", width: "100%" }}
          />
          <TouchableOpacity onPress={addToFavori} style={styles.favIcon}>
            <Ionicons
              name="star"
              size={24}
              color={isFavorite ? "#FFB800" : "#D9D9D9"}
            />
          </TouchableOpacity>

          <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
            {name}
          </Text>
          <Text style={styles.descText}>{description}</Text>
          <View style={styles.priceContainer}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#2A59FE" }}>Price:</Text>
              <Text style={styles.priceText}>{price}</Text>
            </View>
            <CustomButtonComponent
              label={"Add to cart"}
              onPressButton={onPressButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardDetail;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    height: "auto",
    paddingVertical: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  favIcon: { top: 0, position: "absolute", right: 0 },
  descText: { color: "black", fontSize: 12, fontWeight: "400" },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  priceText: { color: "black", fontSize: 14, fontWeight: "500" },
});
