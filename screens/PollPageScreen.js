import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Container, Header, Content, Toast, Button, Text,} from 'native-base';
import { StyleSheet } from 'react-native';
import CreatePoll from "../screens/CreatePollScreen"

// render optionsArray to page with "toast" for each option in the array
    // when the option or "toast" is clicked, count for that option will increase by 1 and user will receive a message that says "thanks for voting"
        // require event listener for the click
    // users can only vote for one option
        // require event listener to listen for only 1 click
        // multiple clicks will be ignored for the count increase and user will receive a message that says "you already voted!"
// display count by each option
    // would like this to show in real-time if possible

// let choices = [
//     {
//         option: CreatePoll.optionsArray.value,
//         votes: {votes}
//     }
// ];

function countVotes(){
    const [votes, setVotes] = React.useState(0)
}

export default class ToastExample extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Button onPress={()=> Toast.show({
              text: 'Thanks for voting!',
              buttonText: 'Okay'
            })}>
            <Text>Toast</Text>
          </Button>
          <br></br>
          <Button onPress={()=> Toast.show({
              text: 'Thanks for voting!',
              buttonText: 'Okay'
            })}>
            <Text>{CreatePoll.optionsArray}</Text>
            {console.log(CreatePoll.optionsArray)}
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    
});