import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';


export default function Card({ backgroundColor, location, name, id }) {
  const navigation = useNavigation()
  return (
      <TouchableOpacity onPress={() => navigation.navigate('Room', { id: id })}>
        <View style={[styles.card]}>
          <Text style={{ fontSize: 17, marginBottom: 5, color: 'green' }}>{name}</Text>
          <Text style={{ color: "green" }}>{location}</Text>
          <View style={{position:'absolute', top:0}}>
            <Entypo name="dot-single" size={50} color={backgroundColor} />
          </View>
          <View style={{position:'absolute', bottom:10, right:10}}>
            <Image source={require('../assets/funaablogo.jpg')} style={{width:50, height:50}}/>
          </View>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom:5,
    marginTop:5,
    position:'relative',
    backgroundColor:'white'
    
  }
})