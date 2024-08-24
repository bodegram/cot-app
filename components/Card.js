import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';


export default function Card({ backgroundColor, location, name, id }) {
  const navigation = useNavigation()
  return (
    <ImageBackground source={require('../assets/classroom2.jpg')} style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Room', { id: id })}>
        <View style={[styles.card]}>
          <Text style={{ fontSize: 17, marginBottom: 5, color: 'white' }}>{name}</Text>
          <Text style={{ color: "white" }}>{location}</Text>
          <View style={{position:'absolute', top:0}}>
            <Entypo name="dot-single" size={50} color={backgroundColor} />
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  }
})