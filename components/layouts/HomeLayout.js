import { View, Text } from 'react-native'
import React from 'react'
import Loader from '../Loader'
import {useSelector} from 'react-redux'

export default function HomeLayout({children}) {
    const {loading} = useSelector(state=>state.auth)
    console.log('loading', loading);
    if(loading){
        return <Loader/>
    }
    else{
        return children
    }
}