import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { themes } from "../data/themes";
import { Trash2 } from "lucide-react-native";

export default function Theme() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const [players, setPlayers] = useState([
        {id: 1, name: "Player 1"},
    ]);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            const saved = await AsyncStorage.getItem("players");

            if (saved !== null) {
                setPlayers(JSON.parse(saved));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        savePlayers();
    }, [players]);

    const savePlayers = async () => {
        try {
            await AsyncStorage.setItem(
                "players",
                JSON.stringify(players)
            );
        } catch (e) {
            console.log(e);
        }
    };

    const addPlayer = () => {
        setPlayers((prev) => [
            ...prev,
            {
                id: Math.max(0, ...prev.map((p) => p.id)) + 1,
                name: `Player ${prev.length + 1}`,
            },
        ]);
    };

    const updatePlayer = (id: number, text: string) => {
        setPlayers((prev) =>
            prev.map((player) =>
                player.id === id ? { ...player, name: text } : player
            )
        );
    };

    const deletePlayer = (id: number) => {
        setPlayers((prev) =>
            prev.filter((player) =>
                player.id !== id
            )
        );
    };

    return (
        <ScrollView className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: {name}</Text>

            {players.map((player) => (
                <View key={player.id} className="mb-4">
                    <TextInput
                        className="pr-20 h-20 w-full border-2 bg-white text-xl opacity-70 border-black px-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
                        value={player.name}
                        onChangeText={(text) => updatePlayer(player.id, text)}
                    />
                    <Pressable
                        className="absolute right-4 bottom-0 top-0 active:opacity-60 transition-all duration-300 ease-in-out justify-center"
                        onPress={() => deletePlayer(player.id)}
                    >
                        <Trash2
                            color="red"
                            size={32}
                            className=""
                        />
                    </Pressable>
                </View>
            ))}


            <Pressable
                className="h-20 w-full border-2 bg-white opacity-70 border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
                onPress={addPlayer}
            >
                <Text className="text-2xl">Add Player +</Text>
            </Pressable>

            <View className="flex w-full">
                <Pressable className="flex items-center w-full"
                    onPress={() => {
                            if (players.length <= 2) {
                                console.log("NOT ENOUGH PLAYERS!!");
                                setHidden(false);
                            } else {
                                setHidden(true);
                                router.push({
                                    pathname: "/cards",
                                    params: {
                                        theme: name,
                                        players: JSON.stringify(players),
                                    },
                                });
                            };
                        }
                    }
                >
                    <Text className="text-2xl text-center text-blue-500 font-bold">Start Game</Text>
                </Pressable>
            </View>

            <View className={`h-full justify-end items-end ${hidden ? "hidden" : "flex"}`}>
                <Text className="text-xl text-yellow-200 text-center p-4 w-full bg-red-500 rounded-2xl">Please Add More Players To Start</Text>
            </View>
        </ScrollView>
    )
}