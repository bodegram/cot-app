import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useSelector } from "react-redux";
import { api } from "../utils/api";



export default function Search({ navigation }) {
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

            console.log('results', filteredRooms);
            setResults(filteredRooms);
        } else {
            setResults([]); // Handle empty query or non-array rooms case
        }
    }, [query, rooms]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                marginTop: 2,
                position: 'relative'
            }}>
                <Feather name='search' size={18} color='black' style={{ position: 'absolute', top: 18, zIndex: 1, left: 10 }} />
                <TextInput style={{
                    backgroundColor: 'gainsboro',
                    paddingVertical: 14,
                    paddingHorizontal: 35,
                    borderRadius: 5
                }} cursorColor='black' defaultValue={query} onChangeText={(text) => setQuery(text)} />
            </View>
            {
                query !== '' && (
                    <View style={{ marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Search Results for "{query}"</Text>
                    </View>
                )
            }
            <View>
                <View>
                    {
                        results?.map((item, index) => (
                           <TouchableOpacity onPress={()=>navigation.navigate('Room', {id:item._id})}>
                             <View style={{ marginBottom: 15 }} key={index}>
                                <Text>{item?.name}</Text>
                            </View>
                           </TouchableOpacity>
                        ))
                    }
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 5
    }
})