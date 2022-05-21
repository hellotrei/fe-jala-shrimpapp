import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const ModalDiseaseScreen = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: `https://app.jala.tech/diseases/${route.params.id}` }}
      />
    </SafeAreaView>
  );
};

export default ModalDiseaseScreen;

const styles = StyleSheet.create({});
