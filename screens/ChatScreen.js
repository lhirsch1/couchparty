// import React from 'react';
// import {GiftedChat} from 'react-native-gifted=chat';
// import Firebase from "firebase";

// class Chat extends React.Component <Props>{
//     static navigationObjects = ({ navigation }) => ({
//         title: (navigation.state.params || {}).name || 'Chat!',
//     });

//     state = {
//         mesesages: [],
//     };

//     get user() {
//         return {
//             name: this.props.navigation.state.params.name,
//             _id: Firebase.shared.uid,
//         };
//     }

//     render() {
//         return(
//             <GiftedChat
//             messages ={this.state.messages}
//             onSend={Firebase.shared.send}
//             user={this.user} />
//         )
//     }

// }

// ComponentDidMount(){
//     Firebase.shared.on(message => this.setStae(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message)
//     })))
// }
// ComponentWillMount(){
//     Firebase.shared.off();
// }

// export default Chat;