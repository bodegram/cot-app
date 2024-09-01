import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useSelector } from "react-redux";
import { api } from "../utils/api";
import Ionicons from '@expo/vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';




export default function SearchBar({query, setQuery}) {
  
    const navigation = useNavigation()

    // const fetchRooms = async () => {
    //     api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    //     const { data } = await api.get('/classrooms')
    //     setRooms(data?.data)
    // }

    // useEffect(() => {
    //     fetchRooms()
    // }, [])




    // useEffect(() => {
    //     if (query !== '' && Array.isArray(rooms)) {
    //         // Convert query to lowercase for case-insensitive comparison
    //         const lowerCaseQuery = query.toLowerCase();

    //         // Filter rooms that are strings and start with the lowercase query
    //         const filteredRooms = rooms.filter(room =>
    //             typeof room === 'object' && room?.name?.toLowerCase().startsWith(lowerCaseQuery)
    //         );

    //         console.log('results', filteredRooms);
    //         setResults(filteredRooms);
    //     } else {
    //         setResults([]); // Handle empty query or non-array rooms case
    //     }
    // }, [query, rooms]);

    return (
            <View style={{
                marginTop: 2,
                flexDirection: 'row',
                gap: 4,
                paddingHorizontal:10,
            }}>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Feather name='search' size={18} color='black' style={{ position: 'absolute', top: 18, zIndex: 1, left: 10 }} />
                    <TextInput style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'gainsboro',
                        paddingVertical: 10,
                        paddingHorizontal: 35,
                        borderRadius: 30
                    }} cursorColor='black' defaultValue={query} placeholder='Search' onChangeText={(text) => setQuery(text)} />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    map: {
        width: '100%',
        height: '100%',
    },
})