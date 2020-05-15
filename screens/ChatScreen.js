import React, { Component } from 'react'
import { Platform, KeyboardAvoidingView, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import { Card, Text, Button } from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../Fire";
import CountDown from 'react-native-countdown-component';

// render poll above chat
class CardExample extends Component {
    constructor (){
        super();
        this.state = {show: true,}
    }

    ShowHideComponenet = () => {
        if (this.state.show == true){
            this.setState({show: false});
            
        }else{
            this.setState({show: true})
           
        }
    }

  render() {

    return (
        <Card style = {{borderRadius: 15, borderColor: '#F9E080'}}>
            <Text style={{position: 'relative', left: 15, fontWeight: 'bold'}}>Voting Results: </Text>
        {this.props.pollResults.optionObject && Object.keys(this.props.pollResults.optionObject).map((key, index)=>{
            return( 
              <Text style={{position: 'relative', left: 15}}> 
              {key}: {this.props.pollResults.optionObject[key]}</Text>
            )
          })
        }{this.state.show ?(
            <Button danger rounded style={styles.button} onPress = {this.ShowHideComponenet}><Text>Start CountDown!</Text></Button>
        )
             :
        
        <CountDown style={{position: 'absolute', right: 0, padding: 10}}
           until={10}
           size={15}
           onFinish={() =>  alert('START MOVIE!') }
           digitStyle={{backgroundColor: '#FFF'}}
           digitTxtStyle={{color: '#8CBCCC'}}
           timeToShow={['S']}
           timeLabels={{ s: 'SEC'}}
         />}
    
        </Card>
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
        // if(Platform.OS === 'android'){
        //     return (
        //         <>
        //         <CardExample pollResults = {this.state.pollResults} />
        //         <KeyboardAvoidingView style={{Flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
        //             {chat}
        //         </KeyboardAvoidingView>
        //         </>
        //     )
        // }
    return <>
    <CardExample pollResults = {this.state.pollResults} />
    
    <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    </>
    }
}


const styles = StyleSheet.create({
    button: {
      justifyContent: "center",
      backgroundColor: '#8CBCCC',
      color: '#8CBCCC',
      alignItems: "center",
      position: 'absolute', 
      right: 0, 
      top: 10
    },
 
  });