import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setAppReady } from "../redux/slices/appSlice";
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    key: 1,
    text: "Description.\nSay something cool",
    image: require("../assets/funaab.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    text: "Other cool stuff",
    image: require("../assets/funaab.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../assets/funaab.png"),
    backgroundColor: "#22bcb5",
  },
];

export default function Intro() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {isAppReady} = useSelector(state=>state.app)
    console.log('app intro', isAppReady);
   
  const _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" />
        <View style={styles.slide}>
          <Image source={item.image} style={{ alignSelf: "center" }} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };

  const _onDone = () => {
   dispatch(setAppReady())
    navigation.navigate('Login')
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
       <AntDesign name="arrowright" size={24} color="black" />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Entypo name="check" size={24} color="black" />
      </View>
    );
  };
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      onDone={_onDone}
      activeDotStyle={{backgroundColor:'green'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    marginTop: 40,
    color: "black",
  },
  slide: {
    marginTop: 50,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
