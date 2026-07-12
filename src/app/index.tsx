import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { themes } from "./data/themes";

export default function Index() {
  return (
    <View className="flex-1 px-10 pt-8">
        <Text className="text-center text-4xl text-red-600 font-extrabold pt-8">Imposter</Text>
        <ScrollView className="mt-8 mb-8">
            {Object.keys(themes).map((theme) => (
                <Pressable key={theme}
                    className="h-20 w-full border-2 bg-white border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-70 transition-all duration-300"
                    onPress={() => router.push({
                        pathname: "/theme/[name]",
                        params: { name: theme },
                    })}>
                    <Text className="text-2xl text-blue-500 font-bold">{theme}</Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
  );
}