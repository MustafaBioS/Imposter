import { useState, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { themes } from "./data/themes";

export default function Game() {
    const { theme, players } = useLocalSearchParams<{ theme: string; players: string }>();
    const [playerList] = useState(JSON.parse(players));
    const [index, setIndex] = useState(0);

    const words = themes[theme as keyof typeof themes];

    const assignments = useMemo(() => {
        const secretWord = words[Math.floor(Math.random() * words.length)];
        const imposter = Math.floor(Math.random() * playerList.length);

        return playerList.map((player, index) => ({
           ...player,
           role: index === imposter ? "Imposter" : "Player",
           word: index === imposter ? "Imposter" : secretWord,
        }));
    }, [playerList, words]);



    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: {theme}</Text>
            <Text className="text-center text-2xl">{assignments[index]?.name}</Text>
            <View className="h-96 w-64 mx-auto bg-black rounded-lg flex items-center justify-center mt-8 mb-8 active:opacity-60 transition-all duration-300 ease-in-out">
                <Text className="text-center text-2xl">{assignments[index]?.word}</Text>
            </View>
            <Pressable
                onPress={() => {
                    if (index < assignments.length - 1) {
                        setIndex(index + 1);
                    } else {
//                         router.push({
//                             pathname: "/reveal",
//                             params: { assignments: JSON.stringify(assignments) },
//                         });
                        setIndex(0);
                    }
                }}
            >
                <Text>Continue</Text>
            </Pressable>
        </View>
    )
}
