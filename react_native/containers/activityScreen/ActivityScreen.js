import { WebView } from 'react-native-webview';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import ActivityScreenStyles from './ActivityScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityBox from '../../components/activityBox/ActivityBox';
import Alert from '../../baseComponents/alert/Alert';
class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <SafeAreaView>
                {/* <ActivityBox/> */}
                <View style={styles.activityContainer}>
                        <Alert message={'No activity to show'}
                            type="alertInfo" />

                </View>
            </SafeAreaView>
        )
    }
}

let styles = create(ActivityScreenStyles);


export default ActivityScreen;
