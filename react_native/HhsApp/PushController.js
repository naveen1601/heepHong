import React, { Component } from "react";
import PushNotification from "react-native-push-notification";

import LoginAction from "../containers/loginScreen/LoginAction";
import { connect } from "react-redux";
import ActivityDetailAction from "../containers/activityDetailScreen/ActivityDetailAction";
import * as RootNavigation from './RootNavigation.js';
import { Screens } from "../helpers/screenHelpers";
import messaging from '@react-native-firebase/messaging';

class PushController extends Component {
  
  componentDidMount() {
    let self = this;
    self.requestUserPermission();
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        self.props.updateFirebaseToken(token);
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        //console.log("NOTIFICATION: ", notification);
        self.props.updateNotificationId(notification?.NotificationID);

        self.props.isLoggedIn &&
          RootNavigation.reset(Screens.LOGIN_SCREEN);
        // process the notification
        // self._addDataToList(notification);
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "279269378088",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login?.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFirebaseToken: (token) => {
      dispatch(LoginAction.updateFirebaseToken(token));
    },
    updateNotificationId: (notificationId) => {
      dispatch(ActivityDetailAction.updateFirebaseNotificationId(notificationId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PushController);