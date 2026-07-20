import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { themes } from "../data/themes";
import { useStore } from "../store/store";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlayerButton = React.memo(({ player, currentPlayerName, onPress, isSelected }: any) => {
    if (player.name === currentPlayerName) return null;
    return (
        <Pressable
            className="h-20 w-64 border-2 bg-white flex items-center justify-center border-black mb-4 rounded-2xl active:opacity-70 transition-all duration-300"
            onPress={onPress}
        >
            <Text className="text-2xl">{player.name}</Text>
        </Pressable>
    );
});

export default function Game() {
    const secretWord = useStore((s) => s.secretWord) ?? "";
    const playersList = useStore((s) => s.players);
    const theme = useStore((s) => s.theme) ?? Object.keys(themes)[0];
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const words = themes[theme as keyof typeof themes];
    const [round, setRound] = useState(1);

    const currentPlayer = playersList[index];

    const handlePlayerPress = useCallback(() => {
        if (index < playersList.length - 1) {
            setIndex(index + 1);
        } else {
            if (round < 2) {
                setIndex(0);
                setRound(round + 1);
            } else {
                router.push("/votes");
            }
        }
    }, [index, round, playersList.length, router]);

    const filteredPlayers = useMemo(() =>
        playersList.map((player, i) => ({ ...player, originalIndex: i })),
        [playersList]
    );

    const renderPlayer = useCallback(({ item }: any) => (
        <PlayerButton
            player={item}
            currentPlayerName={currentPlayer?.name}
            onPress={handlePlayerPress}
        />
    ), [currentPlayer?.name, handlePlayerPress]);

    return (
        <SafeAreaView>
            <View className="px-10">
                <Pressable className="mt-8">
                    <ArrowLeft
                        color="black"
                        size={32}
                        onPress={() => router.push("/cards")}
                    />
                </Pressable>
                <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: { theme }</Text>
                <Text className="text-center text-3xl font-bold">{currentPlayer?.name}</Text>
                <Text className="text-center text-2xl">Choose Who You Want To Ask</Text>
                <FlatList
                    className="mx-auto mt-8 mb-8"
                    data={filteredPlayers}
                    renderItem={renderPlayer}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={true}
                    removeClippedSubviews={true}
                />
            </View>
        </SafeAreaView>
    )
}
