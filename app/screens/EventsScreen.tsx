import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Event {
  id: string;
  name: string;
  limit: number;
  unit: string;
  type: 'MINIMUM' | 'MAXIMUM';
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

const EventsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState<'MINIMUM' | 'MAXIMUM'>('MINIMUM');
  const [period, setPeriod] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');

  const addEvent = () => {
    if (!name || !limit || !unit) return;
    const newEvent: Event = {
      id: Math.random().toString(),
      name,
      limit: parseInt(limit, 10),
      unit,
      type,
      period,
    };
    setEvents([...events, newEvent]);
    setName('');
    setLimit('');
    setUnit('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Limit"
        keyboardType="numeric"
        value={limit}
        onChangeText={setLimit}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={unit}
        onChangeText={setUnit}
      />
      <Button title="Add Event" onPress={addEvent} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text>{item.name} - {item.limit} {item.unit} ({item.type} - {item.period})</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: 'red',
  },
});

export default EventsScreen;
