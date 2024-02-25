import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButtonComponent from "../CustomButtonComponent";
import { useSelector } from "react-redux";


const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 4 - 10;
const cardHeight = cardWidth * 1.9;


const CustomCardComponent = ({
  data,
  onPress,
  onPressButton,
  addToFavori,
  customStyle = {},}) => {
  const { name, image, price } = data;
 
  const favorites = useSelector((state) => state.favorites.favoriCartItems);
  const isFavorite = favorites.some((item) => item.id === data.id);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, customStyle.wrapper]}>
      <View style={[styles.cardContainer, customStyle.cardContainer]}>
      
        <View >
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={{ height: "60%", }}
          />
          <TouchableOpacity
            onPress={addToFavori}
            style={styles.favIcon}
          >
            <Ionicons
              name="star"
              size={24}
              color={isFavorite ? "#FFB800" : "#D9D9D9"}
            />
          </TouchableOpacity>
          <Text style={styles.priceText}>
          {price}
        </Text>
        <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
          {name}
        </Text>
        </View>
        <CustomButtonComponent
          label={"Add to cart"}
          onPressButton={onPressButton}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardComponent;

const styles = StyleSheet.create({
  cardContainer:{
  
      backgroundColor: "white",
      padding: 5,
      height: cardHeight,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    
  },
  wrapper:{
    width: cardWidth, margin: 5
  },
  favIcon:{
     top: 0, position: "absolute", right: 0 
  },
  priceText:{
    color: "#2A59FE", fontSize: 14, fontWeight: "500"
  }
});
