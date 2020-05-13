import React, { Component } from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";

// render poll above chat
class CardExample extends Component {
  render() {
      console.log("CHECK THIS ONE", this.props.pollResults)
    return (
      <Text>
          Voting Results
          <br></br>
            <ul>{this.props.pollResults.optionObject && Object.keys(this.props.pollResults.optionObject).map((key, index)=>{
                return(
                    <li>{key}: {this.props.pollResults.optionObject[key]}</li>
                    )})} 
                    </ul> 
      </Text>
    );
  }
}


export default class ChatScreen extends React.Component {
    state = {
        messages: [],
        pollResults: {}
    }

    get user() {
      
        return {
            _id: Fire.uid,
            name: this.props.route.params.name
        }
        
    }
    componentDidMount(){

        Fire.getPollResults(pollResults => this.setState({pollResults:pollResults})
        )

        Fire.get(message => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        })))
    }

    componentWillMount() {
        Fire.off();
    }

    render() {
        
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
        if(Platform.OS === 'android'){
            return (
                <>
                <CardExample pollResults = {this.state.pollResults} />
                <KeyboardAvoidingView style={{Flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
                </>
            )
        }
    return <>
    <CardExample pollResults = {this.state.pollResults} />
    
    <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    </>
    }
}


