import { Text, View, FlatList, Pressable, ScrollView } from "react-native";
import { useCallback } from "react";
import { router } from "expo-router";
import { themes } from "../data/themes";
import { useStore } from "../store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Hamburger } from "lucide-react-native";

export default function Index() {
  const themeKeys = Object.keys(themes);

  const handleThemePress = useCallback((theme: string) => {
    useStore.getState().setTheme(theme);
    router.push("/players");
  }, []);

  const renderTheme = useCallback(({ item }: { item: string }) => {
    const Icon = themes[item].icon;

    return (
        <Pressable key={item}
            className="w-full h-20 border-2 bg-white border-black mb-4 flex-row items-center justify-center rounded-2xl active:opacity-70 transition-all duration-300"
            onPress={() => handleThemePress(item)}
        >
            <View className="px-10 flex flex-row gap-2 w-full items-center justify-evenly">
                <Text className="flex-1 text-center text-xl">{item}</Text>
                {Icon && <Icon size={30} color="black" />}
            </View>
        </Pressable>
    )
  }, [handleThemePress]);

  return (
    <SafeAreaView className="flex-1">
        <View className="px-20 pb-8 mt-4">
            <Text className="mb-8 text-center text-4xl text-red-600 font-extrabold pt-8">Imposter</Text>
            <FlatList
              data={themeKeys}
              renderItem={renderTheme}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              removeClippedSubviews={true}
            />
        </View>
    </SafeAreaView>
  );
}