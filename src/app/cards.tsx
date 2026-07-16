import { useState, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { themes } from "./data/themes";

export default function Cards() {
    const { theme, players } = useLocalSearchParams<{ theme: string; players: string }>();
    const [playerList] = useState(JSON.parse(players));
    const router = useRouter();
    const [index, setIndex] = useState(0);

    const words = themes[theme as keyof typeof themes];

    const gameData = useMemo(() => {
        const secretWord = words[Math.floor(Math.random() * words.length)];
        const imposter = Math.floor(Math.random() * playerList.length);

        return {
            secretWord,
            assignments: playerList.map((player, index) => ({
                   ...player,
                   role: index === imposter ? "Imposter" : "Player",
                   word: index === imposter ? "Imposter" : secretWord,
                })),
            };
        }, [playerList, words]);


    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: { theme }</Text>
            <Text className="text-center text-2xl">Pass The Phone To:</Text>
            <Text className="text-center text-3xl">{gameData.assignments[index]?.name}</Text>
            <View className="h-96 w-64 mx-auto bg-black rounded-2xl flex items-center justify-center mt-8 mb-8 active:opacity-60 transition-all duration-300 ease-in-out">
                <Text className="text-center text-2xl">{gameData.assignments[index]?.word}</Text>
            </View>
            <Pressable
                onPress={() => {
                    if (index < gameData.assignments.length - 1) {
                        setIndex(index + 1);
                    } else {
                        router.push({
                            pathname: "/game",
                            params: { secretWord: gameData.secretWord, theme: theme, players: JSON.stringify(gameData.assignments) },
                        });
                    }
                }}
            >
                <Text>Continue</Text>
            </Pressable>
        </View>
    )
}
