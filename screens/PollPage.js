import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Header, Content, Toast, Button, Text, Root} from 'native-base';
import { StyleSheet } from 'react-native';
import CreatePoll from "../screens/CreatePollScreen"

// when page is loaded, call firebase to obtain the optionObject to get the values the host entered for the poll
// render optionsObject to page with "toast" for each option in the array
    // when the option or "toast" is clicked, count for that option will increase by 1 and user will receive a message that says "thanks for voting"
        // require event listener for the click
    // users can only vote for one option
        // require event listener to listen for only 1 click
        // multiple clicks will be ignored for the count increase and user will receive a message that says "you already voted!"
// display count by each option
    // would like this to show in real-time if possible

let exampleObject = {
  "Jaws": 0,
  "Titanic": 0
}

export default class ToastExample extends React.Component {
  updateVote = (event) => {
    let choice = event.target.firstChild.innerHTML;
    // update count by 1
    // save choice to firebase
    console.log("HERE", event.target.firstChild.innerHTML)
  }
// in database (could store in state)- use signin to get the user name and see if they voted (Set inital to false)... once voted, set to true which will prevent the second vote... set this by chatroom so user is not prevented from voting again in another poll 

  render() {
    return (
      <Root>
      <Container>
        <Header />
        <Content padder>
          {/* .keys will take the property of the object and turn it into an array (example- [Jaws, Titanic]*/}
          {Object.keys(exampleObject).map((option, index)=>{
            return(
              <>
              <Button onPress={(event)=> {
              Toast.show({
                text: 'Thanks for voting!',
                buttonText: 'Okay',
              })  
              this.updateVote(event)
              }
              }>
              <Text>{option}</Text>
              </Button>
              <br></br>
              </>
            )
          })}

        </Content>
      </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
    
});