import { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { themes } from "./data/themes";

export default function Game() {
    const { secretWord, theme, players } = useLocalSearchParams<{ secretWord: string; theme: string; players: string }>();
    const [playersList] = useState(JSON.parse(players));
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const words = themes[theme as keyof typeof themes];
    const [round, setRound] = useState(1);

    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: { theme }</Text>
            <Text className="text-center text-3xl font-bold">{playersList[index]?.name}</Text>
            <Text className="text-center text-2xl">Choose Who You Want To Ask</Text>
            <ScrollView className="mx-auto mt-8 mb-8">
                {playersList.map((player: any, i: number) => (
                    <View key={i} className="text-center">
                        {player.name === playersList[index]?.name ? null :
                            <Pressable
                                className="h-20 w-64 border-2 bg-white flex items-center justify-center border-black mb-4 rounded-2xl active:opacity-70 transition-all duration-300"
                                onPress={() => {
                                    if (index < playersList.length - 1) {
                                        setIndex(index + 1);
                                    } else {
                                        if (round < 2) {
                                            setIndex(0);
                                            setRound(round + 1);
                                        } else {
                                            router.push({
                                                pathname: "/votes",
                                                params: {}
                                            });
                                        }
                                    }
                                }}
                            >
                                <Text className="text-2xl">{player.name}</Text>
                            </Pressable>
                        }
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
