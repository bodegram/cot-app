import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";

export default function Loader() {
  return (
      <View style={styles.overlay}>
        <ActivityIndicator color="green" size={50} />
      </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
  },
});
