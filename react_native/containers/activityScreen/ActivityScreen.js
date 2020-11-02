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
import ActivityConstants from './ActivityConstants';

class ActivityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.props.clearNotifications();
            this.props.getNotifications(this.props.token, 1);
        });
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
        let IsEnglish = false;
        if (this.props.userLanguage == 'en') {
            moment.locale('en');
            IsEnglish = true;
        }
        else {
            moment.locale('zh-cn');
            IsEnglish = false;
        }

        const GroupData = _.groupBy(this.props.notificationList, 'groupDate');
        const NotificationLen = Object.keys(GroupData).length;
        let comp = [];

        for (let i = 0; i < NotificationLen; i++) {

            const notificationDate = moment(Object.keys(GroupData)[i]);
            const { isTodayDate, isYesterDate } = checkTodayandYesterdayDate(notificationDate);

            const chineseDateFormat = notificationDate.format('YYYY') + '年 ' + notificationDate.format('MM') + '月 ' + notificationDate.format('D') + '日'

            const headerText = isTodayDate ? I18n.t('activity.today') :
                (isYesterDate ? I18n.t('activity.yesterday') :
                    this.props.userLanguage == 'en' ? notificationDate.format('D MMM YYYY, ddd') : chineseDateFormat)

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
                    let Title = item.Title.replace(`\\n`, '\n');

                    return (
                        <TouchableOpacity style={{ backgroundColor: 'white' }}
                            onPress={() => this.getNotificationDetails(item.ID)} key={item.ID}>
                            <View style={styles.activityTime}>
                                <IonIcons name={'md-time-outline'}
                                    style={{ color: '#7F7F7F', paddingRight: 5 }}
                                    size={17} />
                                <Text style={styles.activityTimeText}>{moment(item.Created_Date).format('HH:mm')}</Text>
                            </View>
                            <View style={styles.activityBody}>
                                <View style={unReadStyle}></View>
                                <Text style={styles.activityBodyText}>{Title}</Text>
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
                        {!!this.props.errorMessage &&
                            <Alert message={this.props.errorMessage}
                                type="error" />}
                        {this.props.notificationList?.length < 1 &&
                            <Alert message={I18n.t('activity.noActivity')}
                                type="alertInfo" />}
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
        },
        clearNotifications: () => {
            dispatch(
                {
                    type: ActivityConstants.ACTIONS.CLEAR_ACTIVITY
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen)

let styles = create(ActivityScreenStyles);

