import { useState } from "react";
import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { themes } from "./data/themes";

export default function Reveal() {

    const { secretWord, theme, players } = useLocalSearchParams<{ secretWord: string; theme: string; players: string }>();
    const [playersList] = useState(JSON.parse(players));
    const [index, setIndex] = useState(0);
    const router = useRouter();

    return (
        <View>
            { playersList }
        </View>
    )
}