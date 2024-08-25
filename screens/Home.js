import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { api } from "../utils/api";
import { useSelector } from "react-redux";
export default function Home() {
  const {data:accessToken} = useSelector(state=>state.auth)
  const [rooms, setRooms] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  
  const fetchRooms = async () => {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    const { data } = await api.get('/classrooms')
    setRooms(data?.data)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const onRefresh = () =>{
    setRefreshing(true)
    setTimeout(()=>{
      const fetchRooms = async () => {
        const { data } = await api.get('/classrooms')
        setRooms(data?.data)
      }
  
      fetchRooms()
      setRefreshing(false)
  
    }, 1000)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='green' />
      <ScrollView refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      />} >

        {
           rooms?.map((item, index)=>{
            return(
              <Card backgroundColor={item?.isOccupied ? 'red' : 'green'} name={item?.name} location={item?.location} id={item?._id}  key={index}/>
            )
           })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
});
