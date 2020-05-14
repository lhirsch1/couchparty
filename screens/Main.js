import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body, View, Button } from "native-base";
import {StyleSheet, Image} from 'react-native'


export default class Main extends Component {
 handleNavigation(navigation){
    navigation.navigate('HomeScreen')
 }


  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#FFF'}}><Text>Stuck at home? Throw a CouchParty!</Text></Header>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Body>
                <View style={styles.mainText}>
                <Text >
                  Watch movies with your friends from the comfort of your couch!
                </Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card>
              <View style={styles.mainText}>
              <Text>Vote on what you want to watch:</Text>
                  <Image
                  source = {
                      require("../assets/images/voting.JPG")
                  }
                  style={{width: 170, height: 100}}
                  />
              </View>
          </Card>
          <Card>
              <View style={styles.mainText}>
                  <Text>Chat during the movie:</Text>
                  <Image
                  source = {
                      require("../assets/images/chat.JPG")
                  }
                  style={{justifyContent:'center', alignItems: 'center', width: 125, height: 225}}
                  />
              </View>
          </Card>
          <Button rounded rounded style={styles.button}
            onPress={() => this.handleNavigation(this.props.navigation)}
          ><Text>Get Started!</Text></Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    mainText: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      fontWeight: 'bold'
    },
    button: {
        justifyContent: "center",
        backgroundColor: '#8CBCCC',
        color: '#8CBCCC',
        alignItems: "center",
      },
  });
  