import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import CustomCardComponent from "../components/Card/CustomCardComponent";
import { useSelector } from "react-redux";
import { addToFavorites } from "../store/actions/cardActions";
import { useDispatch } from "react-redux";

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const removeToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };
  const favoriteItems = useSelector((state) => state.favorites.favoriCartItems);
  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <CustomCardComponent
          data={item}
          addToFavori={() => removeToFavorites(item)}
        />
        
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
