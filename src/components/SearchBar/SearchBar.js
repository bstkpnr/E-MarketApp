import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {Feather,Entypo} from '@expo/vector-icons'

const CustomSearchBar = ({ searchPhrase, setSearchPhrase, clicked, setClicked }) => {

  return (
    <View style={styles.container}>
        <View style={clicked ? styles.searchBarClicked : styles.searchBarUnClicked}>
         <Feather name='search' size={20} color={'black'} style={{marginLeft:1}} />
         <TextInput style={styles.input} placeholder='Search' value={searchPhrase} onChangeText={text=>setSearchPhrase(text)} onFocus={()=>{
            setClicked(true)
         }} />
         {
            clicked && (

                <Entypo name='cross' size={20} color={'black'} style={{padding:1}} onPress={()=>{
                    setSearchPhrase("")
                }} />
            )
         }
        </View>
        {
            clicked && (
                <View>
                    <Button title='Cancel' onPress={()=>{Keyboard.dismiss();setClicked(false)}} />
                    </View>
            )
        }
    </View>
  )
}

export default CustomSearchBar

const styles = StyleSheet.create({
    container:{
        margin:15,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:'90%'
    },
    searchBarUnClicked:{
        padding:10,
        flexDirection:'row',
        width:'95%',
        backgroundColor:'#d9dbda',
        borderRadius:15,
        alignItems:'center',
    },
    searchBarClicked:{
        padding:10,
        flexDirection:'row',
        width:'80%',
        backgroundColor:'#d9dbda',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    input:{
        fontSize:20,
        marginLeft:10,
        width:'90%'
    }
})