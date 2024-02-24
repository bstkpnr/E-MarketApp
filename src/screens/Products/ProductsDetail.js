import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomCardComponent from "../../components/Card/CustomCardComponent";
import { getProductsDetail } from "../../api/productsApi";
import { useDispatch } from "react-redux";
import { addToCart, addToCartAsync } from "../../store/actions/cardActions";
import CustomCardDetail from "../../components/Card/CustomCardDetail";
const ProductsDetail = ({ route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  

  const [data, setData] = useState(null);
  useEffect(() => {
    if (id) {
      getProductsDetail(id)
        .then((data) => {
          console.log(setData(data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {data && (
          <CustomCardDetail
            data={data}
            isDescription={true}
            onPressButton={() => handleAddToCart(data)}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
