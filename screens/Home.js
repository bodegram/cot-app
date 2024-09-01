import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { api } from "../utils/api";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";




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
    <>
    {rooms === null && <Loader/>}
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='green' />
      <ScrollView refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      />} >
        <View style={{marginTop:10, marginBottom:20}}>
          <Image source={require('../assets/funaabLibrary.jpeg')}  style={{width:'100%',height:150, borderRadius:20 }}/>
          <Text style={{fontSize:18, fontWeight:'bold', marginTop:15}}>FUNAAB Campus</Text>
          <Text style={{color:'gray', marginBottom:10, fontSize:10}}>Abeokuta, Alabata Road, Ogun state</Text>
          <View style={{ borderBottomColor:'green', borderBottomWidth:5, width:100, borderRadius:10}}></View>
        </View>
        <View>
          <Text style={{fontSize:16, fontWeight:'bold', marginTop:15, marginBottom:15}}>Classrooms</Text>
          <View style={{flexDirection:'row', justifyContent:"space-between", flexWrap:'wrap'}}>
          {
           rooms?.map((item, index)=>{
            return(
              <Card backgroundColor={item?.isOccupied ? 'red' : 'green'} name={item?.name} location={item?.location} id={item?._id}  key={index} imgIndex={index} />
            )
           })
        }
          </View>
        </View>

      
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10
  },
});
