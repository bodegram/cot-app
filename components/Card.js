import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo';


export default function Card({ backgroundColor, location, name, id, imgIndex }) {
  const images = [
    require('../assets/room1.jpeg'),
    require('../assets/room2.jpeg'),
    require('../assets/room3.jpg'),
    require('../assets/room4.jpg'),
    require('../assets/room6.jpeg'),
    require('../assets/room7.jpg'),
    require('../assets/room8.jpg')
  ]
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Room', { id: id })}>
      <View style={[styles.card]}>
        <Image source={images[imgIndex]} style={{ width: 70, height: 50, borderRadius:5 }} />
        <Text style={{ fontSize: 14, marginBottom: 5, color: 'green', textAlign: 'center', marginTop: 4 }}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'relative',
    marginBottom:5

  }
})