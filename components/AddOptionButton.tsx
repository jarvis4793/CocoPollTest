import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddOptionButton({ onPress, title }: { onPress: () => void, title: string }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appButtonContainer: {
        paddingTop: 17,
        paddingBottom: 17,
    },
    appButtonText: {
        fontSize: 17,
    }
});