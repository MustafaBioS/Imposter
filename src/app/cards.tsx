import { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { themes } from "../data/themes";
import { useStore } from "../store/store";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cards() {
    const theme = useStore((s) => s.theme);
    const playerList = useStore((s) => s.players);
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [con, setCon] = useState(false);

    const words = (theme && themes[theme as keyof typeof themes]) ? themes[theme as keyof typeof themes] : Object.values(themes)[0];

    const gameData = useMemo(() => {
        const secretWord = (words && words.length) ? words[Math.floor(Math.random() * words.length)] : "";
        const imposter = playerList.length ? Math.floor(Math.random() * playerList.length) : -1;

        return {
            secretWord,
            assignments: playerList.map((player, index) => ({
               ...player,
               role: index === imposter ? "Imposter" : "Player",
               word: index === imposter ? "Imposter" : secretWord,
            })),
        };
    }, [playerList, words]);

    const handleClick = useCallback(() => {
        if (index < gameData.assignments.length - 1) {
            console.log(`INDEX: ${index} | HIDDEN: ${hidden}`);
            if (hidden == true) {
                setHidden(false);
            } else {
                setHidden(true);
                setIndex(index + 1);
            }
        } else if (index === gameData.assignments.length - 1 && con == false) {
            console.log(`LAST INDEX: ${index}`);
            setHidden(false);
            setCon(true);
        } else if (con == true) {
            useStore.getState().setSecretWord(gameData.secretWord);
            useStore.getState().setPlayers(gameData.assignments as any);
            const imposterIndex = gameData.assignments.findIndex((p: any) => p.role === "Imposter");
            useStore.getState().setImposterIndex(imposterIndex === -1 ? undefined : imposterIndex);

            router.push("/game");
        }
    }, [index, hidden, con, gameData, router]);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 px-10">
                <Pressable className="mt-8">
                    <ArrowLeft
                        color="black"
                        size={32}
                        onPress={() => router.push("/players")}
                    />
                </Pressable>
                <Text className="text-center text-4xl font-extrabold pb-8 pt-8">Theme: { theme }</Text>
                <View className="flex-1 w-full items-center justify-center">
                    <Text className="text-center text-2xl">Give The Phone To:</Text>
                    <Text className="text-center text-3xl mb-8">{gameData.assignments[index]?.name}</Text>
                    <View className={`${hidden ? "hidden" : "flex"} h-96 w-64 mx-auto bg-black rounded-2xl items-center justify-center mb-8 active:opacity-60 transition-all duration-300 ease-in-out`}>
                        <Text className="text-center text-2xl">{gameData.assignments[index]?.word}</Text>
                    </View>
                </View>
                <Pressable
                    onPress={handleClick}
                    className="border-black border-2 rounded-2xl"
                >
                    <Text className="p-4 text-center text-2xl">{ hidden ? "Show Card" : (!con ? "Next Card" : "Finish") }</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
