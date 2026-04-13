import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Avatar, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommunicationStackParamList } from '../../navigation/AppNavigator';

type MessagesListScreenNavigationProp = NativeStackNavigationProp<CommunicationStackParamList, 'MessagesList'>;

interface Props {
  navigation: MessagesListScreenNavigationProp;
}

interface Conversation {
  id: string;
  resident: string;
  unit: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const MessagesListScreen: React.FC<Props> = ({ navigation }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Mock conversations
    const mockConvos: Conversation[] = [
        { id: '1', resident: 'Alice Brown', unit: '08-12', lastMessage: 'Is my delivery here?', time: '10:30 AM', unread: true },
        { id: '2', resident: 'Bob Smith', unit: '15-02', lastMessage: 'Thanks, I will come down to collect it.', time: 'Yesterday', unread: false },
    ];
    setConversations(mockConvos);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', { residentName: item.resident, unit: item.unit })}>
                <List.Item
                    title={`${item.resident} (${item.unit})`}
                    titleStyle={{ fontWeight: item.unread ? 'bold' : 'normal' }}
                    description={item.lastMessage}
                    descriptionStyle={{ fontWeight: item.unread ? 'bold' : 'normal' }}
                    left={props => <Avatar.Text {...props} size={40} label={item.resident.substring(0, 2)} />}
                    right={props => <Text {...props} style={styles.timeText}>{item.time}</Text>}
                    style={styles.listItem}
                />
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: 'white'
  },
  timeText: {
      alignSelf: 'center',
      color: 'gray',
      fontSize: 12,
  }
});

export default MessagesListScreen;
