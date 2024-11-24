import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Search = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const key = "9cf0e34396a348ab809190032242311";

  const handlePress = () => {
    router.push("/");
  };

  const getAllLocations = async () => {
    setLoading(true); // Start loading
    setError(""); // Reset error
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${key}&q=${
          query || "London"
        }`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const json = await response.json();
      if (json.error) {
        throw new Error(json.error.message);
      }

      setData(json);
      setError(""); // Clear previous errors
    } catch (err) {
      setError(err.message || "An unknown error occurred");
      setData([]); // Clear data on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const SaveData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log("Data saved successfully");
      handlePress();
    } catch (err) {
      console.error("Failed to save data", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor={"#fff"}
          placeholder="Enter Your Place Name ..."
          value={query}
          onChangeText={(text) => setQuery(text)}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={getAllLocations}>
          <FontAwesome5 name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#ff5100"
          style={styles.loadingIndicator}
        />
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>
        {data.length > 0
          ? data.map((place, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() => {
                  SaveData("QueryName", place.name);
                }}
              >
                <FontAwesome6
                  name="location-crosshairs"
                  size={20}
                  color="white"
                />
                <Text
                  style={styles.resultText}
                >{`${place.name}, ${place.region}, ${place.country}`}</Text>
              </TouchableOpacity>
            ))
          : !loading && <Text style={styles.noResults}>No results found</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  textInput: {
    color: "#fff",
    fontWeight: "600",
    width: "75%",
    height: 50,
    backgroundColor: "#292929",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#ff5100",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  resultsContainer: {
    width: "100%",
    height: "80%",
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  resultItem: {
    width: "100%",
    height: 50,
    backgroundColor: "#242424",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  resultText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  noResults: {
    color: "#aaa",
    marginTop: 20,
  },
});

export default Search;
