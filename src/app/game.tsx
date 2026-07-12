import { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { themes } from "./data/themes";

export default function Game() {
    const { secretWord, theme, players } = useLocalSearchParams<{ secretWord: string; theme: string; players: string }>();
    const [playersList] = useState(JSON.parse(players));
    const [index, setIndex] = useState(0);
    const words = themes[theme as keyof typeof themes];

    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: { theme }</Text>
            <Text className="text-center text-xl">{playersList[index]?.name} Choose Who You Want To Ask</Text>
            <ScrollView className="mx-auto mt-8 mb-8">
                {playersList.map((player: any, i: number) => (
                    <Pressable key={i} className="text-center text-2xl">
                        {player.name === playersList[index]?.name ? null :
                            <Pressable
                                className="h-15 w-54 border-2 bg-white flex items-center justify-center border-black mb-4 rounded-2xl active:opacity-70 transition-all duration-300"
                                onPress={() => {
                                    if (index < playersList.length - 1) {
                                        setIndex(index + 1);
                                    }
                                }}
                            >
                                <Text>{player.name}</Text>
                            </Pressable>
                        }
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}
