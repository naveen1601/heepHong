import { WebView } from 'react-native-webview';
import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import ActivityScreenStyles from './ActivityScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityBox from '../../components/activityBox/ActivityBox';

class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <SafeAreaView>
               <ActivityBox/>
            </SafeAreaView>
        )
    }
}

let styles = create(ActivityScreenStyles);


export default ActivityScreen;
