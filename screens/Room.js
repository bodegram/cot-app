import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { api } from '../utils/api';
import Loader from '../components/Loader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Room() {
    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useRoute().params

    const images = [
        require('../assets/room1.jpeg'),
        require('../assets/room2.jpeg'),
        require('../assets/room3.jpg'),
        require('../assets/room4.jpg'),
        require('../assets/room6.jpeg'),
        require('../assets/room7.jpg'),
        require('../assets/room8.jpg')
      ]

    const random =   Math.floor(Math.random() * 6) + 1;
    console.log(random);
    

    const fetchRoom = async () => {
        try {
            const { data } = await api.get(`/classrooms/${id}`)

            setRoom(data.data)
        }
        catch (error) {
            console.log(error.response.data.message);

        }
    }

    useEffect(() => {
        fetchRoom()
    }, [id])

    const bookRoom = async () => {
        try {
            setLoading(true)
            const { data } = await api.get(`/classrooms/${id}/book`)
            setLoading(false)
            fetchRoom()
        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }

    const unbookRoom = async () => {
        try {
            setLoading(true)
            const { data } = await api.get(`/classrooms/${id}/unbook`)
            setLoading(false)

            fetchRoom()

        }
        catch (error) {
            console.log(error.response.data.message)
        }
    }
    return (
        <>
            {loading && <Loader />}
            {room === null && <Loader />}
            <SafeAreaView style={styles.container}>
                <View style={{ paddingHorizontal: 10, marginTop:15 }}>
                    <Image source={images[random]} style={{ width: '100%', height: 180, borderRadius: 20 }}  />
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    marginTop: 15,
                    backgroundColor: 'ghostwhite',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    marginHorizontal: 10,
                    borderRadius: 10
                }}>
                    <View>
                        <Text>Capacity - {room?.capacity}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{room?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 2 }}>
                        <View>
                            {
                                room?.isOccupied ? (
                                    <TouchableOpacity style={styles.activebtn} onPress={unbookRoom}>
                                        <Text style={{ textAlign: 'center', color: "white" }}>Not Available</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.inactivebtn} onPress={bookRoom}>
                                        <Text style={{ textAlign: 'center', color: "white" }}>Available</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View>
                        <MaterialIcons name="location-on" size={34} color="black" />
                    </View>
                    </View>
                   
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    activebtn: {
        backgroundColor: 'red',
        borderRadius: 30,
        padding: 10,
        width: 120
    },
    inactivebtn: {
        backgroundColor: 'green',
        borderRadius: 30,
        padding: 10,
        width: 120
    }
})