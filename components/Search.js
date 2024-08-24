import { View, Text } from 'react-native'
import React from 'react'
import { SearchBar } from "@rneui/themed";


export default function Search() {
  return (
    <View>
       <SearchBar
            placeholder="Search for Lecture room"
            style={{backgroundColor:'ghostwhite'}}
            containerStyle={{backgroundColor:'white', borderColor:'white'}}
            inputContainerStyle={{backgroundColor:'ghostwhite'}}
          />
    </View>
  )
}