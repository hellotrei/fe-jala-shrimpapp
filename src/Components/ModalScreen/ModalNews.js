import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import {API_URL} from "@env";

const ModalNewsScreen = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `${API_URL}web_view/posts/${route.params.id}`,
        }}
      />
    </SafeAreaView>
  );
};

export default ModalNewsScreen;

const styles = StyleSheet.create({});
