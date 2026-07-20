import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../store/store";

const PlayerInput = React.memo(({ player, onChangeText, onDelete }: any) => (
    <View className="mb-4">
        <TextInput
            className="pr-20 h-20 w-full border-2 bg-white text-xl opacity-70 border-black px-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
            value={player.name}
            onChangeText={onChangeText}
        />
        <Pressable
            className="absolute right-4 bottom-0 top-0 active:opacity-60 transition-all duration-300 ease-in-out justify-center"
            onPress={onDelete}
        >
            <Trash2
                color="red"
                size={32}
                className=""
            />
        </Pressable>
    </View>
));

export default function Players() {
    const theme = useStore((s) => s.theme);
    const [hidden, setHidden] = useState(true);
    const players = useStore(s => s.players);

    const addPlayer = useStore((s) => s.addPlayer)
    const updatePlayer = useStore((s) => s.updatePlayer)
    const deletePlayer = useStore((s) => s.removePlayer)

    const onAdd = useCallback(() => {
        const nextId = Math.max(0, ...(players.map((p) => p.id))) + 1;
        addPlayer({ id: nextId, name: `Player ${players.length + 1}` });
    }, [players, addPlayer]);

    const router = useRouter();

    const renderPlayerInput = useCallback(({ item }: any) => (
        <PlayerInput
            player={item}
            onChangeText={(text: string) => updatePlayer(item.id, text)}
            onDelete={() => deletePlayer(item.id)}
        />
    ), [updatePlayer, deletePlayer]);

    const handleStartGame = useCallback(() => {
        if (players.length <= 2) {
            console.log("NOT ENOUGH PLAYERS!!");
            setHidden(false);
        } else {
            setHidden(true);
            useStore.getState().setTheme(theme);
            router.push("/cards");
        }
    }, [players.length, theme, router]);

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="px-10">
                <Pressable className="mt-8">
                    <ArrowLeft
                        color="black"
                        size={32}
                        onPress={() => router.push("/")}
                    />
                </Pressable>
                <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: {theme}</Text>

                <FlatList
                    data={players}
                    renderItem={renderPlayerInput}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    removeClippedSubviews={true}
                />

                <Pressable
                    className="h-20 w-full border-2 bg-white opacity-70 border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-50 transition-all duration-300"
                    onPress={onAdd}
                >
                    <Text className="text-2xl">Add Player +</Text>
                </Pressable>

                <View className="flex w-full">
                    <Pressable className="flex items-center w-full"
                        onPress={handleStartGame}
                    >
                        <Text className="text-2xl text-center text-blue-500 font-bold mb-8">Start Game</Text>
                    </Pressable>
                </View>

                <View className={`h-full justify-end items-end ${hidden ? "hidden" : "flex"}`}>
                    <Text className="text-xl text-yellow-200 text-center p-4 w-full bg-red-500 rounded-2xl">Please Add More Players To Start</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}