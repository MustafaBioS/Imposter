import { Text, View, FlatList, Pressable } from "react-native";
import { router } from "expo-router";
import { themes } from "./data/themes";

export default function Index() {
  return (
    <View className="flex-1 px-10 pt-8">
        <Text className="text-center text-4xl text-red-600 font-extrabold pt-8">Imposter</Text>
        <FlatList
            data={Object.keys(themes)}
            contentContainerClassName="py-8 pb-12"
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Pressable
                    className="h-20 w-full border-2 bg-white border-black p-4 mb-4 flex items-center justify-center rounded-2xl active:opacity-70 transition-all duration-300"
                    onPress={() => router.push({
                        pathname: "/theme/[name]",
                        params: { name: item },
                    })}
                >
                    <Text className="text-2xl text-blue-500 font-bold">{item}</Text>
                </Pressable>
            )}
        />
    </View>
  );
}