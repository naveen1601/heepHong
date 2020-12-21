import React, { Component } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import ActivityDetailScreenStyles from './ActivityDetailStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import I18n from '../../i18n/locales';
import { checkTodayandYesterdayDate } from '../../helpers/commonHelper';
import ActivityDetailAction from './ActivityDetailAction';
import Button from '../../baseComponents/button/Button';

class ActivityDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.notificationID = this.props.route.params?.notificationID
    }

    componentDidMount() {
        this.notificationID &&
            this.props.getNotificationDetail(this.props.token, this.notificationID);
    }

    renderActivityDetail = () => {
        if (this.props.userLanguage == 'en') {
            moment.locale('en');
        }
        else {
            moment.locale('zh-cn');
        }
        const notificationDetail = this.props.notificationDetail;
        const notificationDate = moment(notificationDetail.Created_Date);
        const { isTodayDate, isYesterDate } = checkTodayandYesterdayDate(notificationDate);
        const chineseDateFormat = notificationDate.format('YYYY') + '年 ' + notificationDate.format('MM') + '月 ' + notificationDate.format('D') + '日';

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

        return (
            <View>
                {dateText}
                <View style={styles.activityBody}>
                    <Text style={styles.activityBodyText}>{(notificationDetail.Title||"").replace('\\n','\n')}</Text>
                    <Text style={styles.activityBodyText}>{(notificationDetail.Message||"").replace('\\n','\n')}</Text>
                </View>
                {!notificationDetail.IsRead && <Button
                    onPress={()=>this.props.updateReadInfo(this.props.token, this.notificationID)}
                    text={I18n.t('activity.read')}
                    secondaryButton={true}
                />}
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    {this.renderActivityDetail()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: _.get(state, 'login.userData.Token'),
        notificationDetail: _.get(state, 'activityDetail.notificationDetail'),
        userLanguage: state.login?.language,

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNotificationDetail: (token, notificationID) => {
            dispatch(ActivityDetailAction.getNotificationDetail(token, notificationID, ownProps.navigation))
        },
        updateReadInfo:(token, notificationID) =>{
            dispatch(ActivityDetailAction.updateReadInfo(token, notificationID, ownProps.navigation))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailScreen)

let styles = create(ActivityDetailScreenStyles);

