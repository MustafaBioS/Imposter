import { Hamburger, BriefcaseBusiness, MapPinHouse, Star, PawPrint, Clapperboard, Volleyball, Music, Plane } from "lucide-react-native";

export const themes = {
    Food: {
        words: ["Pizza", "Burger", "Sushi", "Pasta", "Ice Cream"],
        icon: Hamburger,
    },
    Jobs: {
        items: ["Doctor", "Engineer", "Teacher", "Chef", "Artist"],
        icon: BriefcaseBusiness,
    },
    Places: {
        items: ["Beach", "Mountains", "City", "Desert", "Forest"],
        icon: MapPinHouse,
    },
    Celebrities: {
        items: ["Taylor Swift", "Dwayne Johnson", "Beyoncé", "Leonardo DiCaprio", "Oprah Winfrey"],
        icon: Star,
    },
    Animals: {
        items: ["Dog", "Cat", "Elephant", "Lion", "Dolphin"],
        icon: PawPrint,
    },
//     "Movies & TV Shows": {
//         items: ["Inception", "Friends", "The Godfather", "Breaking Bad", "The Avengers"],
//         icon: Clapperboard,
//     },
    Sports: {
        items: ["Soccer", "Basketball", "Tennis", "Baseball", "Swimming"],
        icon: Volleyball,
    },
    Music: {
        items: ["Rock", "Pop", "Jazz", "Classical", "Hip Hop"],
        icon: Music,
    },
    Travel: {
        items: ["Paris", "New York", "Tokyo", "Sydney", "Rome"],
        icon: Plane,
    }
} as const;