import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtonComponent = ({label,onPressButton,containerStyle,labelStyle}) => {
  return (
    <TouchableOpacity onPress={onPressButton} style={[styles.buttonContainer,containerStyle]}>
      <Text style={[styles.label,labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButtonComponent

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:'#2A59FE',
        borderRadius:4,
        padding:4,
        marginTop:6

    },
    label:{
        color:'white',
        fontSize:12,
        fontWeight:'bold',
        textAlign:'center'
    }
})