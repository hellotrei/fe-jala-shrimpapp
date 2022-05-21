import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import {API_URL} from "@env";

const ModalDiseaseScreen = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: `${API_URL}diseases/${route.params.id}` }}
      />
    </SafeAreaView>
  );
};

export default ModalDiseaseScreen;

const styles = StyleSheet.create({});
