import { StyleSheet, Text, View } from "react-native";

export default function PollScreen({ route, navigation }: { route: any, navigation: any }) {
    const { question, options }: { question: string, options: Array<string> } = route.params
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>{question}</Text>
            </View>
            {
                options.map((option, index) => (
                    <View style={styles.option}>
                        <View style={styles.optionItem}>
                            <Text key={option} style={styles.optionText}>{option}</Text>
                        </View>
                        <View style={styles.optionVotes}>
                            <Text key={index} style={styles.optionText}>0 votes</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 17
    },
    questionContainer: {
        paddingVertical: 17
    },
    question: {
        fontSize: 20
    },
    option: {
        paddingVertical: 17,
        flexDirection: "row",
        fontSize: 20
    },
    optionItem: {
        flex: 8
    },
    optionVotes: {
        flex: 2,
        alignItem: "right"
    },
    optionText: {
        fontSize: 15
    }

})