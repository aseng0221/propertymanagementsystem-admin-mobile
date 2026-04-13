import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Text, Surface } from 'react-native-paper';

export default function ChatScreen({ route, navigation }) {
    const { residentName, unit } = route.params;
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        navigation.setOptions({ title: `${residentName} (${unit})` });

        // Mock initial messages
        setMessages([
            { id: '1', text: 'Is my food delivery here?', sender: 'resident', time: '10:30 AM' },
            { id: '2', text: 'Yes, it was just left at the guardhouse.', sender: 'guard', time: '10:32 AM' },
        ]);
    }, [navigation, residentName, unit]);

    const sendMessage = () => {
        if (inputText.trim().length === 0) return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'guard',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputText('');

        // Mock a reply
        setTimeout(() => {
             const reply = {
                id: (Date.now() + 1).toString(),
                text: 'Okay, I will come down to collect it.',
                sender: 'resident',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, reply]);
        }, 2000);
    };

    const renderMessage = ({ item }) => {
        const isGuard = item.sender === 'guard';
        return (
            <View style={[styles.messageWrapper, isGuard ? styles.messageWrapperRight : styles.messageWrapperLeft]}>
                <Surface style={[styles.messageBubble, isGuard ? styles.messageBubbleRight : styles.messageBubbleLeft]} elevation={1}>
                    <Text style={isGuard ? styles.messageTextRight : styles.messageTextLeft}>{item.text}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </Surface>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
        >
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContent}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    mode="outlined"
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input}
                    dense
                />
                <IconButton
                    icon="send"
                    mode="contained"
                    onPress={sendMessage}
                    disabled={inputText.trim().length === 0}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 16,
    },
    messageWrapper: {
        marginBottom: 12,
        flexDirection: 'row',
    },
    messageWrapperLeft: {
        justifyContent: 'flex-start',
    },
    messageWrapperRight: {
        justifyContent: 'flex-end',
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '80%',
    },
    messageBubbleLeft: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 4,
    },
    messageBubbleRight: {
        backgroundColor: '#007AFF', // iOS blue
        borderBottomRightRadius: 4,
    },
    messageTextLeft: {
        color: 'black',
        fontSize: 16,
    },
    messageTextRight: {
        color: 'white',
        fontSize: 16,
    },
    timeText: {
        fontSize: 10,
        color: '#888',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight: 8,
        backgroundColor: 'white',
    },
});
