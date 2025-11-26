import { ActivityIndicator, StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/home";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    TitleFont: require("./assets/fonts/TT-Firs-Neue-Bold.ttf"),
    TextFont: require("./assets/fonts/Soin-Sans-Pro-Roman.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
