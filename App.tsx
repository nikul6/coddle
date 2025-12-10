import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './src/navigation/types';
import IntroScreen from './src/screens/IntroScreen';
import ConcernSupportScreen from './src/screens/ConcernSupportScreen';
import ProviderScreen from './src/screens/ProviderScreen';
import ChatScreen from './src/screens/ChatScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import VideoWaitingRoomScreen from './src/screens/VideoWaitingRoomScreen';
import { ConsultProvider } from './src/context/ConsultContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ConsultProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ConcernSupport" component={ConcernSupportScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Provider" component={ProviderScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown:false }} />
          <Stack.Screen name="VideoWaitingRoom" component={VideoWaitingRoomScreen} options={{ headerShown:false }} />
          <Stack.Screen name="Completion" component={CompletionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConsultProvider>
  );
}
