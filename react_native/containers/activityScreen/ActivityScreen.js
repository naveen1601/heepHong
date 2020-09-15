import { WebView } from 'react-native-webview';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
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
import Button from '../../baseComponents/button/Button';
import moment from 'moment';
import I18n from '../../i18n/locales';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { checkTodayandYesterdayDate } from '../../helpers/commonHelper';
import { Screens } from '../../helpers/screenHelpers';

class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        this.props.getNotifications(this.props.token, this.props.nextPageCounter);
    }

    nextNotification = () => {
        this.props.getNotifications(this.props.token, this.props.nextPageCounter);
    }

    getNotificationDetails = (notificationID) => {
        this.props.navigation.navigate(Screens.ACTIVITY_DETAIL_SCREEN, {
            notificationID: notificationID
        })
    }

    renderNotificationData = () => {

        if (this.props.userLanguage == 'en') {
            moment.locale('en');
        }
        else {
            moment.locale('zh-cn');
        }

        const GroupData = _.groupBy(this.props.notificationList, 'groupDate')
        console.log('grp ', GroupData);
        const NotificationLen = Object.keys(GroupData).length;
        let comp = [];

        for (let i = 0; i < NotificationLen; i++) {

            const notificationDate = moment(Object.keys(GroupData)[i]);
            const {isTodayDate, isYesterDate} = checkTodayandYesterdayDate(notificationDate);

            console.log('dates ', isTodayDate, ' yester ', isYesterDate);
            const headerText = isTodayDate ? I18n.t('activity.today') :
                (isYesterDate ? I18n.t('activity.yesterday') : notificationDate.format('D MMM YYYY, ddd'))

            const headerStyle = [styles.headerSection];
            const headerTextStyle = [styles.headerText]
            if (isTodayDate) {
                headerStyle.push(styles.todayHeaderSection);
                headerTextStyle.push(styles.todayHeaderText)
            }

            const dateText = (<View style={headerStyle}>
                <Text style={headerTextStyle}>{headerText}</Text>
            </View>);


            const notifications = GroupData[Object.keys(GroupData)[i]];

            comp.push(<View>
                {dateText}
                {notifications.map(item => {
                    const unReadStyle = [styles.unreadNotificationArea];
                    !item.IsRead && unReadStyle.push([styles.unreadNotification])

                    return (
                        <TouchableOpacity
                            onPress={()=>this.getNotificationDetails(item.ID)} key={item.ID}>
                            <View style={styles.activityTime}>
                                <IonIcons name={'md-time-outline'}
                                    style={{ color: '#7F7F7F', paddingRight: 5 }}
                                    size={17} />
                                <Text style={styles.activityTimeText}>{moment(item.Created_Date).format('hh:mm')}</Text>
                            </View>
                            <View style={styles.activityBody}>
                                <View style={unReadStyle}></View>
                                <Text style={styles.activityBodyText}>{item.Title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>)
        }
        return comp;
    }

    render() {
        return (
            <SafeAreaView>
                {/* <ActivityBox/> */}
                <ScrollView>
                    <View style={styles.activityHeader}>
                        <Text style={styles.activityHeaderText}>{I18n.t('activity.message')}</Text>
                    </View>
                    <View >
                        {/* <Alert message={'No activity to show'}
                            type="alertInfo" /> */}
                        {this.renderNotificationData()}

                        {this.props.totalPages >= this.props.nextPageCounter && !this.props.errorMessage &&
                            <View style={styles.nextNotificationArrow}>
                                <TouchableOpacity
                                    onPress={this.nextNotification}>
                                    <AntDesign name={'down'}
                                        style={styles.arrowIcon}
                                        size={25} />
                                </TouchableOpacity>
                            </View>
                        }


                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: _.get(state, 'login.userData.Token'),
        notificationList: _.get(state, 'activity.notificationList'),
        totalPages: _.get(state, 'activity.totalPages'),
        nextPageCounter: _.get(state, 'activity.nextPageCounter'),
        userLanguage: state.login?.language,
        errorMessage: _.get(state, 'activity.errorMessage'),

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotifications: (token, nextPageCounter) => {
            dispatch(ActivityAction.getNotifications(token, nextPageCounter, ownProps.navigation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen)

let styles = create(ActivityScreenStyles);

