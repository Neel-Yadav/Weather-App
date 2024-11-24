import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import back from "../assets/backgrounds/back_01.jpg";
import NavBar from "@/components/NavBar";
import WeatherSummary from "@/components/WeatherSummary";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const isAndroid = Platform.OS === "android";
  const [data, setData] = useState<any>(null);
  const [queryName, setQueryName] = useState("");
  const [country, setCountry] = useState("");
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("chandigarh");

  const key = "9cf0e34396a348ab809190032242311";
  const defaultLocation = "London";

  // Interface for loading data
  interface LoadDataType {
    key: string;
  }

  const loadData = async ({ key }: LoadDataType) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Data loaded:", value);
        return value;
      } else {
        console.log("No data found for this key.");
        return null;
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const loadedQueryName = await loadData({ key: "QueryName" });
      const location = loadedQueryName || query || defaultLocation;

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=1&aqi=yes&alerts=no`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const json = await response.json();
      if (json.error) {
        throw new Error(json.error.message);
      }

      setQueryName(json.location.name);
      setCountry(json.location.country);
      setData(json.current);
      setForecast(json.forecast.forecastday[0]?.hour || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!data || !forecast) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff5100" />{" "}
        {/* Orange or Blue */}
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={{ width: "100%", height: "60%", position: "relative" }}>
        <Image
          source={back}
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: "100%",
            zIndex: -1,
            position: "absolute",
          }}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            marginTop: isAndroid ? 35 : 10,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <NavBar placeName={queryName} country={country} />
          <WeatherSummary
            temp={data?.temp_c}
            heatindex={data?.heatindex_c}
            dewpoint={data?.dewpoint_c}
            conditionText={data?.condition.text}
            wind_kph={data?.wind_kph}
            humidity={data?.humidity}
            feelslike={data?.feelslike_c}
          />
          {/* Render hourly forecast in Footer */}
          <Footer forecasts={forecast} />
        </View>
      </View>
      <View style={{ width: "100%", height: "40%" }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929", // Dark background to contrast with loading spinner
  },
  loadingText: {
    color: "#fff", // White text for "Loading..."
    marginTop: 10, // Spacing between the spinner and text
    fontWeight: "600", // Bold text for emphasis
  },
});

export default App;
