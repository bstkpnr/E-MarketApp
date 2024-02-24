import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomCardComponent from "../components/Card/CustomCardComponent";
import {
  getProducts,
  getProductsBrand,
  getProductsModel,
} from "../api/productsApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart, addToCartAsync, addToFavorites } from "../store/actions/cardActions";
import CustomButtonComponent from "../components/CustomButtonComponent";
import FilterModal from "../components/Modal/FilterModal";
import CustomSearchBar from "../components/SearchBar/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const dispatch = useDispatch();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [basketToProducts, setBasketToProducts] = useState([]);

  const openFilterModal = () => {
    setShowFilterModal(true);
  };
  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setAllProducts(data);
      await AsyncStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("ERRORRRR", error);
    }
  };
  useEffect(() => {
    const loadProducts = async () => {
      const savedProducts = await AsyncStorage.getItem("products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
        setAllProducts(JSON.parse(savedProducts));
      } else {
        fetchProducts();
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getProductsBrand();
        setBrands(brands);
      } catch (error) {
        console.error("ERRORRRR ", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getProductsModel();
        setModels(models);
      } catch (error) {
        console.error("ERRORRRR ", error);
      }
    };

    fetchModels();
  }, []);

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
  const savedBasketItems = await AsyncStorage.getItem("cartItems");
  const currentBasketItems = savedBasketItems ? JSON.parse(savedBasketItems) : [];
  
  const newBasketItems = [...currentBasketItems, { ...product, quantity: 1 }];
  await AsyncStorage.setItem("cartItems", JSON.stringify(newBasketItems));
  };

  useEffect(() => {
    const loadBasketProductsItems = async () => {
      const savedBasketItems = await AsyncStorage.getItem("cartItems");
      if (savedBasketItems) {
        const items = JSON.parse(savedBasketItems);
        items.forEach((item) => dispatch(addToCart(item)));
      }
    };
  
    loadBasketProductsItems();
  }, [dispatch]);
  
  

  const handleAddToFavori = (product) => {
    dispatch(addToFavorites(product));
  };
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  const sortProducts = (sortBy, products) => {
    let sortedProducts = [...products];

    switch (sortBy) {
      case "oldToNew":
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "newToOld":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
    }

    return sortedProducts;
  };
  const handleFilterSubmit = async (values) => {
    const { brand, models, sortBy } = values;

    let filteredProducts = allProducts.filter(
      (product) =>
        (!brand || brand.length === 0 || brand.includes(product.brand)) &&
        (!models || models.length === 0 || models.includes(product.model))
    );

    filteredProducts = sortProducts(sortBy, filteredProducts);

    setProducts(filteredProducts);
  };
  const renderCardList = ({ item }) => {
    return (
      <CustomCardComponent
        data={item}
        addToFavori={() => handleAddToFavori(item)}
        onPressButton={() => handleAddToCart(item)}
        onPress={() =>
          navigation.navigate("ProductsDetail", {
            id: item.id,
            name: item.name,
          })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomSearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View
        style={styles.filterContainer}
      >
        <Text>Filters:</Text>
        <CustomButtonComponent
          onPressButton={openFilterModal}
          label={"Select Filter"}
          labelStyle={{ color: "black", fontWeight: "400" }}
          containerStyle={{ backgroundColor: "#d9dbda", padding: 10 }}
        />
      </View>
      <FilterModal
        visible={showFilterModal}
        onClose={closeFilterModal}
        onSubmitFilters={handleFilterSubmit}
        brands={brands}
        models={models}
      />
      <FlatList
        data={filterProducts}
        renderItem={renderCardList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  }
});
