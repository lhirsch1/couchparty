import React from 'react';
import {GiftedChat} from 'react-native-gifted=chat';

import Firebase from "firebase";

type Props = {
    name?: String,
};

class Chat extends React.Component <Props>{
    static navigationObjects = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        mesesages: [],
    };

    get user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Firebase.shared.uid,
        };
    }

    render() {
        return(
            <GiftedChat
            messages ={this.state.messages}
            onSend={Firebase.shared.send}
            user={this.user} />
        )
    }
}