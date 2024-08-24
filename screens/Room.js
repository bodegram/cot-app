import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { api } from '../utils/api';
import Loader from '../components/Loader';

export default function Room() {
    const [room, setRoom] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useRoute().params

    const fetchRoom = async () => {
        try {
            const { data } = await api.get(`/classrooms/${id}`)
            console.log(data.data);

            setRoom(data.data)
        }
        catch (error) {
            console.log(error.response.data.message);

        }
    }

    useEffect(() => {
        fetchRoom()
    }, [id])

    const bookRoom = async() =>{
        try{
            setLoading(true)
            const {data} = await api.get(`/classrooms/${id}/book`)
            setLoading(false)
            fetchRoom()
        }
        catch(error){
            console.log(error.response.data.message)
        }
    }

    const unbookRoom = async() =>{
        try{
            setLoading(true)
            const {data} = await api.get(`/classrooms/${id}/unbook`)
            setLoading(false)

            fetchRoom()

        }
        catch(error){
            console.log(error.response.data.message)
        }
    }
    return (
      <>
        {loading && <Loader/>} 
        {room === null && <Loader/>}
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Image source={require('../assets/classroom2.jpg')} style={{width:'100%', height:180}}/>
                </View>
                <View style={{ paddingHorizontal: 10, marginTop:15 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>Venue</Text>
                        <Text style={{ marginBottom: 10 }}>{room?.name}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>Capacity</Text>
                        <Text style={{ marginBottom: 10 }}>{room?.capacity}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>Location</Text>
                        <Text style={{ marginBottom: 10 }}>{room?.location}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>Availability</Text>
                        <Text style={{ marginBottom: 10 }}>{room?.isOccupied ? 'Occupied': 'Available'}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', left: 5, right: 5, bottom: 0, width: "auto" }}>
                {
                    room?.isOccupied ? (
                        <TouchableOpacity style={styles.activebtn} onPress={unbookRoom}>
                            <Text style={{ textAlign: 'center', color: "white" }}>Unbook</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.inactivebtn} onPress={bookRoom}>
                            <Text style={{ textAlign: 'center', color: "white" }}>Book</Text>
                        </TouchableOpacity>
                    )
                }
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
        padding: 15
    },
    inactivebtn: {
        backgroundColor: 'green',
        borderRadius: 30,
        padding: 15
    }
})