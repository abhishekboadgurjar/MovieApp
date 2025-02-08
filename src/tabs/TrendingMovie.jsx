import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const OMDB_API_KEY = "b3978b6a";

const TrendingMovie = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=2023`
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

export default TrendingMovie;
