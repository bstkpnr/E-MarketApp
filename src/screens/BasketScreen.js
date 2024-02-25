import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "../store/actions/cardActions";
import CustomButtonComponent from "../components/CustomButtonComponent";
import { AntDesign } from "@expo/vector-icons";

const BasketScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{`${item.price} ₺`}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleDecreaseQuantity(item.id)}
                >
                  <Text style={styles.text}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityText}>
                  <Text style={[styles.text, { color: "white" }]}>
                    {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => handleIncreaseQuantity(item.id)}
                >
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}> BASKET IS EMPTY</Text>
        )}
        <View style={styles.totalContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalText}>{`${totalPrice} ₺`}</Text>
          </View>
          <CustomButtonComponent label={"Complete"} />
        </View>
      </ScrollView>
    </View>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 13,
    color: "#2A59FE",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    backgroundColor: "#F6F5F5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },

  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  quantityText: { backgroundColor: "#2A59FE", padding: 8 },
  totalText:{
    color: "#2A59FE", fontSize: 18
  }
});
