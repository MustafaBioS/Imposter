import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { themes } from "../data/themes";

export default function Theme() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const [players, setPlayers] = useState([
        {id: 1, name: "Player 1"},
    ]);

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
                id: prev.length + 1,
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

    return (
        <View className="px-10">
            <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: {name}</Text>

            {players.map((player) => (
                <TextInput
                    key={player.id}
                    className="h-20 w-full border-2 bg-white text-xl opacity-70 border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
                    value={player.name}
                    onChangeText={(text) => updatePlayer(player.id, text)}
                />
            ))}


            <Pressable
                className="h-20 w-full border-2 bg-white opacity-70 border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
                onPress={addPlayer}
            >
                <Text className="text-2xl">Add Player +</Text>
            </Pressable>

            <View className="h-full flex w-full">
                <Pressable className="h-full flex items-center w-full"
                    onPress={() =>
                        router.push({
                            pathname: "/cards",
                            params: {
                                theme: name,
                                players: JSON.stringify(players),
                            },
                        })
                    }
                >
                    <Text className="text-2xl text-center text-blue-500 font-bold">Start Game</Text>
                </Pressable>
            </View>
        </View>
    )
}