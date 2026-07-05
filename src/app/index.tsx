import { Text, View, FlatList, Pressable } from "react-native";

const themes = {
    Food: ["Pizza", "Burger", "Sushi", "Pasta", "Ice Cream"],
    Jobs: ["Doctor", "Engineer", "Teacher", "Chef", "Artist"],
    Places: ["Beach", "Mountains", "City", "Desert", "Forest"],
    Celebrities: ["Taylor Swift", "Dwayne Johnson", "Beyoncé", "Leonardo DiCaprio", "Oprah Winfrey"],
    Animals: ["Dog", "Cat", "Elephant", "Lion", "Dolphin"],
    "Movies & TV Shows": ["Inception", "Friends", "The Godfather", "Breaking Bad", "The Avengers"],
    Sports: ["Soccer", "Basketball", "Tennis", "Baseball", "Swimming"],
    Music: ["Rock", "Pop", "Jazz", "Classical", "Hip Hop"],
    Travel: ["Paris", "New York", "Tokyo", "Sydney", "Rome"],
    History: ["World War II", "Ancient Egypt", "Renaissance", "Industrial Revolution", "Cold War"],
}

export default function Index() {
  return (
    <View>
        <Text className="mx-auto text-3xl text-red-600 text-bold pt-8">Imposter</Text>
        <FlatList
            data={Object.keys(themes)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Pressable className="mx-auto text-4xl text-blue-500 font-bold pt-8">
                    <Text>{item}</Text>
                </Pressable>
            )}
        />
    </View>
  );
}