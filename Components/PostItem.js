import { View, Text } from 'react-native';
import React from 'react';

export default function PostItem({ item }) {
  return (
    <View>
      <Text style={{ color: 'red' }}>{item.id}</Text>
    </View>
  );
}
