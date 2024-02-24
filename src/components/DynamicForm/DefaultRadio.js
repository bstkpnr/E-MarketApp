import React from "react";
import { View, Text, RadioButton, RadioGroup } from "react-native-ui-lib";
import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";

const DefaultRadio = ({ item }) => {
  const formik = useFormikContext();

  return (
    <View style={{ margin: 12 }}>
      <RadioGroup
        onValueChange={(value) => formik.setFieldValue(item.key, value)}
        value={formik.values[item.key]}
      >
        {item.input.options.map((option) => (
          <RadioButton
            key={option.value}
            value={option.value}
            label={option.label}
            style={{ borderColor: "#2A59FE", margin: 3 }}
          />
        ))}
      </RadioGroup>
    </View>
  );
};

export default DefaultRadio;

const styles = StyleSheet.create({
  title: { fontSize: 12, fontWeight: "400", padding: 5 },
});
