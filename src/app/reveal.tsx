import { useState, useMemo } from "react";
import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { themes } from "../data/themes";
import { useStore } from "../store/store";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Reveal() {

    const playersList = useStore((s) => s.players);
    const secretWord = useStore((s) => s.secretWord) ?? "";
    const theme = useStore((s) => s.theme) ?? Object.keys(themes)[0];

    const imposter = useMemo(() =>
        playersList.find((player: any) => player.role === "Imposter"),
        [playersList]
    );

    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <View className="px-10">
                <Pressable className="mt-8">
                    <ArrowLeft
                        color="black"
                        size={32}
                        onPress={() => router.push("/players")}
                    />
                </Pressable>
                <Text className="text-center text-4xl text-black font-extrabold pt-8">Reveal</Text>
                <Text className="text-center text-4xl text-green-600 font-extrabold pt-8">{ imposter?.name } Was The Imposter</Text>
            </View>
        </SafeAreaView>
    )
}