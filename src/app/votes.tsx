import React, { useState, useCallback } from "react";
import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { themes } from "../data/themes";
import { useStore } from "../store/store";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VoteButton = React.memo(({ player, currentPlayerName, onPress }: any) => {
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

export default function Votes() {
    const secretWord = useStore((s) => s.secretWord) ?? "";
    const playersList = useStore((s) => s.players);
    const theme = useStore((s) => s.theme) ?? Object.keys(themes)[0];
    const [index, setIndex] = useState(0);
    const router = useRouter();

    const currentPlayer = playersList[index];

    const handleVote = useCallback(() => {
        if (index < playersList.length - 1) {
            console.log(`${playersList[index]?.name} VOTED FOR`);
            setIndex(index + 1);
        } else {
            router.push("/reveal");
        }
    }, [index, playersList, router]);

    const renderVoteButton = useCallback(({ item }: any) => (
        <VoteButton
            player={item}
            currentPlayerName={currentPlayer?.name}
            onPress={handleVote}
        />
    ), [currentPlayer?.name, handleVote]);

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="px-10">
                <Pressable className="mt-8">
                    <ArrowLeft
                        color="black"
                        size={32}
                        onPress={() => router.push("/game")}
                    />
                </Pressable>
                <Text className="text-center text-4xl text-red-600 font-extrabold pt-8">Votes</Text>
                <Text className="text-center text-2xl px-20 mb-8">{currentPlayer?.name} Choose Who You Want To Vote Out</Text>
                <FlatList
                    className="mx-auto"
                    data={playersList}
                    renderItem={renderVoteButton}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    removeClippedSubviews={true}
                />
            </ScrollView>
        </SafeAreaView>
    )
}