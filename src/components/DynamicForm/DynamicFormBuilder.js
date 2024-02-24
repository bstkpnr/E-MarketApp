import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultCheckbox from "./DefaultCheckbox";
import DefaultRadio from "./DefaultRadio";
import { useFormikContext } from "formik";
import CustomButtonComponent from "../CustomButtonComponent";

const DynamicFormBuilder = ({ formSchema, onSubmit }) => {
  const { values } = useFormikContext();
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    setFormValues(values);
  }, [values]);
  return (
    <View>
      {formSchema.map((item, index) => {
        switch (item.input.type) {
          case "checkbox":
            return (
              <View key={index} style={styles.sectionContainer}>
                <View style={styles.separator} />
                <Text style={styles.sectionTitle}>{item.title}</Text>

                <ScrollView style={{flexGrow:0}}
                  showsVerticalScrollIndicator={true}>
                  <DefaultCheckbox item={item} />
                </ScrollView>
              </View>
            );
          case "radio":
            return (
              <View key={index} >
                <Text style={styles.sectionTitle}>{item.title}</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <DefaultRadio item={item} />
                </ScrollView>
              </View>
            );
          default:
            return null;
        }
      })}
      <CustomButtonComponent
        label="Submit"
        onPressButton={onSubmit}
        containerStyle={{ backgroundColor: "#2A59FE", padding: 15, margin: 5 }}
      />
    </View>
  );
};

export default DynamicFormBuilder;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    height: 400,
    marginHorizontal:12
  },
  sectionTitle:{
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
    marginBottom: 10,
  },
});
