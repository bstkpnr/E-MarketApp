import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React,{useState,useEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-ui-lib";
import DynamicFormBuilder from "../DynamicForm/DynamicFormBuilder";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FilterModal = ({ visible, onClose, brands, models,onSubmitFilters }) => {
  const formSchema = [
    {
      key: "sortBy",
      title: "Sort By",
      input: {
        type: "radio",
        options: [
          { label: "Old to new", value: "oldToNew" },
          { label: "New to old", value: "newToOld" },
          { label: "Price high to low", value: "priceHighToLow" },
          { label: "Price low to high", value: "priceLowToHigh" },
        ],
      }
    },
    {
      key: "brand",
      title: "Brand",
      input: {
        type: "checkbox",
        options: brands.map((brand) => ({ label: brand, value: brand })),
      },
    },
    {
      key: "models",
      title: "Models",
      input: {
        type: "checkbox",
        options: models.map((model) => ({ label: model, value: model })),
      },
    },
  ];
    const initialValues = {
      brand: [],
      models: []
    };
    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmit = (values) => {
      setFormValues(values)
      onSubmitFilters(values);
      AsyncStorage.setItem("filterValues", JSON.stringify(values));
      onClose();
    };
    
    useEffect(() => {
      const loadFilterValues = async () => {
        const savedValues = await AsyncStorage.getItem("filterValues");
        if (savedValues) {
          setFormValues(JSON.parse(savedValues));
        }
      };
    
      if (visible) {
        loadFilterValues();
      }
    }, [visible]);;

    const clearFilters = async () => {
      setFormValues(initialValues);
      onSubmitFilters(initialValues);
      await AsyncStorage.removeItem("filterValues");
      onClose();
    };
    
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView>
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={clearFilters}  >

            <Text style={{fontSize:24,color:'red'}}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>

          <Formik initialValues={formValues} onSubmit={handleSubmit} enableReinitialize >
            {({ handleSubmit }) => (
<>
                <DynamicFormBuilder
                formSchema={formSchema}
                onSubmit={handleSubmit}
                />
                </>

              )}
              </Formik>
              </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
  
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    minHeight: 80,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    marginVertical: 24,
    
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "black",
  },
  formContainer:{
    padding:18
  }
});
