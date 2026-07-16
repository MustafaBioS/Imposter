import { useState } from "react";
import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { themes } from "./data/themes";

export default function Votes() {

    const { secretWord, theme, players } = useLocalSearchParams<{ secretWord: string; theme: string; players: string }>();
    const [playersList] = useState(JSON.parse(players));
    const [index, setIndex] = useState(0);
    const router = useRouter();

    return (
        <View>
            <Text className="text-center text-4xl text-red-600 font-extrabold pt-8">Votes</Text>
            <Text className="text-center text-2xl px-20 mb-8">{playersList[index]?.name} Choose Who You Want To Vote Out</Text>
            { playersList.map((player: any, i: number) => (
                <View key={i} className="text-center mx-auto">
                    {player.name === playersList[index]?.name ? null :
                        <Pressable
                            className="h-20 w-64 border-2 bg-white flex items-center justify-center border-black mb-4 rounded-2xl active:opacity-70 transition-all duration-300"
                            onPress={() => {
                                if (index < playersList.length - 1) {
                                    console.log(`${playersList[index]?.name} VOTED FOR ${player.name}`);
                                    setIndex(index + 1);
                                } else {
                                    router.push({
                                        pathname: "/reveal",
                                        params: { theme: theme, players: JSON.stringify(playersList), secretWord: secretWord },
                                    });
                                };
                            }}
                        >
                            <Text className="text-2xl">{player.name}</Text>
                        </Pressable>
                    }
                </View>
            ))}
        </View>
    )
}