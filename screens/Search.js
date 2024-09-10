import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import Map from '../components/Map'
import SearchBar from '../components/Searchbar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { api } from "../utils/api";
import { useSelector } from "react-redux";



export default function Search({navigation}) {
    const { data: accessToken } = useSelector(state => state.auth)
    const [rooms, setRooms] = useState(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const fetchRooms = async () => {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        const { data } = await api.get('/classrooms')
        setRooms(data?.data)
      }
    
      useEffect(() => {
        fetchRooms()
      }, [])

   

      useEffect(() => {
        if (query !== '' && Array.isArray(rooms)) {
            // Convert query to lowercase for case-insensitive comparison
            const lowerCaseQuery = query.toLowerCase();

            // Filter rooms that are strings and start with the lowercase query
            const filteredRooms = rooms.filter(room =>
                typeof room === 'object' && room?.name?.toLowerCase().startsWith(lowerCaseQuery)
            );

            setResults(filteredRooms);
        } else {
            setResults([]); // Handle empty query or non-array rooms case
        }
    }, [query, rooms]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SearchBar query={query} setQuery={setQuery} />
                {
                    query === '' && (
                        <>
                            <Map />
            
                        </>
                    )
                }
                {
                query !== '' && (
                    <View style={{ marginTop: 5, marginBottom: 10, paddingHorizontal:10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Search Results for "{query}"</Text>
                    </View>
                )
            }

            <View>
                <View style={{paddingHorizontal:10}}>
                    {
                        results?.map((item, index) => (
                           <TouchableOpacity onPress={()=>navigation.navigate('Room', {id:item._id})}>
                             <View style={{ marginBottom: 15 }} key={item?._id}>
                                <Text>{item?.name}</Text>
                            </View>
                           </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
