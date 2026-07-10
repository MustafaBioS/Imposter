import { useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { themes } from "./data/themes";

export default function Game() {
    const { theme, players } = useLocalSearchParams<{ theme: string; players: string }>();
    const [playerList] = useState(JSON.parse(players));

    const words = themes[theme as keyof typeof themes];

    const secretWord = words[Math.floor(Math.random() * words.length)];

    const imposter = Math.floor(Math.random() * playerList.length);

    const assignments = playerList.map((player, index) => ({
        ...player,
        role: index === imposter ? "Imposter" : "Player",
        word: index === imposter ? "Imposter" : secretWord,
        }));

    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: {theme}</Text>
            <Text className="text-center text-2xl">{assignments[0]?.name}</Text>
        </View>
    );
}
