import React, { useState ,useEffect} from 'react';
import { View, Checkbox } from 'react-native-ui-lib';
import { useFormikContext } from 'formik';
import CustomSearchBar from '../SearchBar/SearchBar';
import { StyleSheet } from 'react-native';

const DefaultCheckbox = ({ item }) => {
  const formik = useFormikContext();
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(item.input.options);

  
  useEffect(() => {
    if (searchPhrase === '') {
      setFilteredOptions(item.input.options);
    } else {
      const filtered = item.input.options.filter((option) =>
        option.label.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchPhrase, item.input.options]);


  const handleCheckboxChange = (optionValue) => {
    const currentValues = Array.isArray(formik.values[item.key]) ? formik.values[item.key] : [];
    const newValue = currentValues.includes(optionValue)
      ? currentValues.filter(value => value !== optionValue)
      : [...currentValues, optionValue];
    formik.setFieldValue(item.key, newValue);
  };

  return (
    <View>
    <CustomSearchBar 
      searchPhrase={searchPhrase} 
      setSearchPhrase={setSearchPhrase} 
      clicked={clicked} 
      setClicked={setClicked} 
    />
    {filteredOptions.map((option) => (
      <Checkbox 
        key={option.value}
        value={formik.values[item.key] && formik.values[item.key].includes(option.value)} 
        onValueChange={() => handleCheckboxChange(option.value)} 
        label={option.label} 
        style={{ borderColor: '#2A59FE', margin: 2 }}
      />
    ))}
  </View>
  );
};

export default DefaultCheckbox;
const styles=StyleSheet.create({
  title:{fontSize:12, fontWeight:'400', padding:5}
})