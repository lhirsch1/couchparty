import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Icon, Text, TouchableOpacity, View } from 'react-native';
import { Container, Header, Content, Form, Item, Button, Input } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import { MonoText } from '../components/StyledText';

var firebaseConfig = {
  apiKey: "AIzaSyB1KmSbJqwSNpyuw3AjcoMLu76MY8H5a7I",
  authDomain: "couchparty-d571d.firebaseapp.com",
  databaseURL: "https://couchparty-d571d.firebaseio.com",
  projectId: "couchparty-d571d",
  storageBucket: "couchparty-d571d.appspot.com",
  messagingSenderId: "821252602321",
  appId: "1:821252602321:web:385b04d72c079f3824c8f0",
  measurementId: "G-8NELRFXV6M",
 

}; 
var email ='123@gmail.com';
var pass = 'abc'
firebase.initializeApp(firebaseConfig);

//firebase authenication with email
const auth = firebase.auth();
//  auth.signInWithEmailAndPassword(email, pass);
//  auth.createUserWithEmailAndPassword(email,pass);
// auth.onAuthStateChanged(firebaseUser => {});

function createUser(){

  console.log('hello')
  const auth = firebase.auth();
  //need to validate email input
  var email ='abc@gmail.com'
  var pass = 'abcadfa'
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));
  // auth.onAuthStateChanged(firebaseUser => {});
}

auth.onAuthStateChanged(firebaseUser => {

  if(firebaseUser){
    console.log('f b user');
    console.log(firebaseUser)
  }
  else{
    console.log('not logged in ')
  }
});

function handleFormSubmit(event){
  var user = document.getElementById('userName').value
  var pass =  document.getElementById('password').value
  console.log('user ',user, ' pass ',pass)
}


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <View>

        <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input id='userName' placeholder="Username" />
            </Item>
            <Item last>
              <Input id='password' placeholder="Password" />
            </Item>
            <Button rounded light
            onPress={handleFormSubmit}
            >
              <Text>Create Account</Text>
            </Button>
          </Form>
        </Content>
      </Container>

          <Button 
          onPress={createUser}
          title='hello'
          
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>howdy up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
