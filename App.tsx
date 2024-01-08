
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screen/Home';
import { useState } from 'react';
import PollScreen from './Screen/Poll';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="New poll"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Button title="send" />
            ),
            headerLeft: () => (
              <Button title="cancel" />
            ),
          })}
        >
        </Stack.Screen>
        <Stack.Screen
          name="Poll"
          component={PollScreen}
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <Button
                title="close"
                onPress={() => navigation.navigate('New poll')}
              />
            ),
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
