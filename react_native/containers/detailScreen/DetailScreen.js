import { WebView } from 'react-native-webview';
import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import DetailScreenStyles from './DetailScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <SafeAreaView>
               {/* <ActivityBox/> */}
               <Text>Detail Screen</Text>
            </SafeAreaView>
        )
    }
}

let styles = create(DetailScreenStyles);


export default DetailScreen;
