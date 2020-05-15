import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import * as firebase from 'firebase'
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeScreen from './screens/HomeScreen';
import LinksScreen from './screens/LinksScreen';
import ChatMenu from './screens/ChatMenu';
import CreatePoll from './screens/CreatePoll';
import Poll from './screens/PollPage';
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import Main from "./screens/Main"


const Stack = createStackNavigator();


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="root" component={Main} options={{title:'CouchParty'}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title:'CouchParty'}}/>
            <Stack.Screen name="LinksScreen" component={LinksScreen} options={{title:'CouchParty'}}/>
            <Stack.Screen name="ChatMenu" component={ChatMenu} options={{title:'CouchParty'}} />
            <Stack.Screen name="CreatePoll" component={CreatePoll} options={{title:'CouchParty'}}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title:'CouchParty'}} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:'CouchParty'}}/>
            <Stack.Screen name="Poll" component={Poll} options={{title:'CouchParty'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//exporting as the root component
