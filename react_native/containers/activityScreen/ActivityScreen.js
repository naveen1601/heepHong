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

        this.some = 
        [
            {
                "Date": "2020-09-11T20:09:47.21798Z",
                "NotificationList": [
                    {
                        "ID": 1,
                        "Parent_Email": "chan456@testing.com",
                        "Case_ID": 4543,
                        "Notification_Type": "Read",
                        "IsRead": false,
                        "Title": "OPRS schedule is ready",
                        "Message": "8 2020 schedule is ready for Chan Tai Man. Please click “Read” button below for notifited.",
                        "Created_By": "System",
                        "Created_Date": "2020-09-11T20:09:47.21798Z"
                    },
                    {
                        "ID": 2,
                        "Parent_Email": "chan456@testing.com",
                        "Case_ID": 4543,
                        "Notification_Type": "Read",
                        "IsRead": false,
                        "Title": "OPRS schedule is ready",
                        "Message": "8 2020 schedule is ready for Chan Tai Man. Please click “Read” button below for notifited.",
                        "Created_By": "System",
                        "Created_Date": "2020-09-11T20:09:53.2007696Z"
                    }]

            },

            {

                "Date": "2020-09-11T20:09:47.21798Z",
                "NotificationList": [{
                    "ID": 3,
                    "Parent_Email": "chan456@testing.com",
                    "Case_ID": 4543,
                    "Notification_Type": "Read",
                    "IsRead": false,
                    "Title": "OPRS schedule is ready",
                    "Message": "8 2020 schedule is ready for Chan Tai Man. Please click “Read” button below for notifited.",
                    "Created_By": "System",
                    "Created_Date": "2020-09-11T20:09:58.541745Z"
                }]
            }
        ]

    }

    componentDidMount() {
        this.props.getNotifications(this.props.token);
    }

    renderNotificationData()


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

