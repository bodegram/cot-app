import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

export default function Notifications() {
  return (
   <SafeAreaView style={styles.container}>
     <View>
      <Text>No Notifications</Text>
    </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:10
    }
})