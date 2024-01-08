import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button, TouchableOpacity, Alert, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddOptionButton from '../components/AddOptionButton';

function HomeScreen({ navigation }: { navigation: any }) {

    const [question, onChangeQuestion] = useState<string>('');
    const [wordCount, onWordCount] = useState<number>(255)
    const [data, setData] = useState<Array<string>>([]);
    const [newOption, setNewOption] = useState<string>('');
    const [isMultipleAnswer, setIsMultipleAnswer] = useState<boolean>(false)
    const toggleSwitch = () => setIsMultipleAnswer(previousState => !previousState);

    const addOptionOnPress = () => {
        if (data.includes(newOption)) {
            Alert.alert("The option already exists")
            return
        }
        if (newOption === "") {
            Alert.alert("Please fill in option")
            return
        }
        let newArray = [...data]
        newArray.push(newOption)
        setData(newArray)
        setNewOption('')
    }

    function keyExtractor(str: string) {
        return str
    }
    function renderItem(info: DragListRenderItemInfo<string>) {
        const { item, onDragStart, onDragEnd } = info;

        return (
            <View style={styles.option}>
                <View style={{ flex: 8 }}>
                    <Text style={styles.optionText}>{item}</Text>
                </View>
                <View style={{ flex: 2, alignItems: "flex-end" }}>
                    <TouchableOpacity
                        key={item}
                        onLongPress={onDragStart}
                        onPressOut={onDragEnd}>
                        <Text>: : :</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    async function onReordered(fromIndex: number, toIndex: number) {
        const copy = [...data];
        const removed = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, removed[0]);
        setData(copy);
    }

    useEffect(() => {
        if (data.length >= 2 && question.length != 0 && question.length <= 255) {
            navigation.setOptions({
                headerRight: () => (
                    <Button disabled={false} onPress={() =>
                        navigation.navigate('Poll', {
                            question: question,
                            options: data
                        })} title="send" />
                ),
            });
        } else {
            navigation.setOptions({
                headerRight: () => (
                    <Button disabled={true} title="send" />
                ),
            });
        }
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.title}>
                            <Text>Question</Text>
                        </View>
                        <View style={styles.charCount}>
                            {
                                wordCount > 155 ? (<></>) : wordCount > 0 && wordCount <= 155 ? (<Text>{wordCount}</Text>) : <Text style={{ color: "red" }}>{wordCount}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.questionContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => {
                                onChangeQuestion(e)
                                onWordCount(255 - e.length)
                            }}
                            placeholder='Ask a question'
                            value={question}
                            multiline={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.title}>
                            <Text>Options</Text>
                        </View>
                    </View>

                    <View style={styles.optionContainer}>
                        <DragList
                            data={data}
                            keyExtractor={keyExtractor}
                            onReordered={onReordered}
                            renderItem={renderItem}
                        />

                        {
                            data.length == 10 ? <></> :
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Option"
                                        maxLength={100}
                                        multiline={true}
                                        onChangeText={val => {
                                            setNewOption(val)
                                        }}
                                        value={newOption}
                                    />
                                    <View >
                                        <AddOptionButton title="Add option" onPress={addOptionOnPress} />
                                    </View>
                                </View>
                        }

                    </View>
                    {
                        data.length == 10 ? <></> :
                            <View style={styles.optionHint}>
                                <Text style={styles.hintText}>You can add {10 - data.length} more options </Text>
                            </View>
                    }
                    <View style={styles.multipleAnswersContainer}>
                        <View style={styles.multipleAnswersTextContainer}>
                            <Text style={styles.multipleAnswersText}>Multiple Answer</Text>
                        </View>
                        <View style={styles.multipleAnswersToggle}>
                            <Switch
                                trackColor={{ false: '#8d938f', true: '#759b82' }}
                                thumbColor={isMultipleAnswer ? '#ffffff' : '#ffffff'}
                                ios_backgroundColor="#8d938f"
                                onValueChange={toggleSwitch}
                                value={isMultipleAnswer}
                            />
                        </View>
                    </View>
                </View >
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 17
    },
    input: {
        paddingTop: 17,
        paddingBottom: 17,
        paddingRight: 17,
        textAlignVertical: "center",
        fontSize: 17,
    },
    title: {
        flex: 8,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15
    },
    charCount: {
        flex: 2,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        alignItems: 'flex-end'
    },
    addOption: {
        backgroundColor: "white",
    },
    option: {
        flexDirection: 'row',
        paddingTop: 17,
        paddingBottom: 17,
        borderBottomColor: "#e2e8e4",
        borderBottomWidth: 2
    },
    optionContainer: {
        borderRadius: 10,
        backgroundColor: "white",
        paddingLeft: 17,
        paddingRight: 17
    },
    optionText: {
        fontSize: 17
    },
    questionContainer: {
        paddingLeft: 17,
        backgroundColor: "white",
        borderRadius: 10,
    },
    optionHint: {
        paddingTop: 17,
        paddingBottom: 17,
    },
    hintText: {
        color: "#717773",
    },
    multipleAnswersContainer: {
        marginTop: 17,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: "white",
    },
    multipleAnswersTextContainer: {
        flex: 8,
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 17,
    },
    multipleAnswersText: {
        fontSize: 17
    },
    multipleAnswersToggle: {
        flex: 2,
        paddingTop: 17,
        paddingBottom: 17,
    },
});

export default HomeScreen