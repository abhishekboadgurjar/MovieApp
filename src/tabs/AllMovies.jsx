import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const OMDB_API_KEY = "b3978b6a";

const AllMovies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = "Marvel") => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={() => fetchMovies(search)}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieCard}
            onPress={() =>
              navigation.navigate("MovieDetails", { movieId: item.imdbID })
            }
          >
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <View>
              <Text style={styles.movieTitle}>{item.Title}</Text>
              <Text style={styles.movieYear}>{item.Year}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  poster: { width: 50, height: 75, marginRight: 10 },
  movieTitle: { fontSize: 16, fontWeight: "bold" },
  movieYear: { fontSize: 14, color: "#666" },
});

export default AllMovies;
