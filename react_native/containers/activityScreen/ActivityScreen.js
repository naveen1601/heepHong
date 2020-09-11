import { WebView } from 'react-native-webview';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import ActivityScreenStyles from './ActivityStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityBox from '../../components/activityBox/ActivityBox';
import Alert from '../../baseComponents/alert/Alert';
import { connect } from 'react-redux';
import ActivityAction from './ActivityAction';
import _ from 'lodash';

class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        this.props.getNotifications(this.props.token);
    }

    renderNotificationData =()=>{}


    render() {
        return (
            <SafeAreaView>
                {/* <ActivityBox/> */}
                <View style={styles.activityContainer}>
                    <Alert message={'No activity to show'}
                        type="alertInfo" />
                    {this.props.notificationList.map(notification => (
                        <>
                            <Text> {notification.Title}</Text>
                            <Text> {notification.Message}</Text>
                            <Text>-----------------------------------</Text>
                        </>
                    )
                    )}

                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: _.get(state, 'login.userData.Token'),
        notificationList: _.get(state, 'activity.notificationList')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotifications: (token) => {
            dispatch(ActivityAction.getNotifications(token, ownProps.navigation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen)

let styles = create(ActivityScreenStyles);

