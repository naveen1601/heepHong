
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import DetailScreenStyles from './DetailScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import ActivityBox from '../../components/activityBox/ActivityBox';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import I18n from '../../i18n/locales';
import 'moment/locale/zh-cn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DetailAction from './DetailAction';


class DetailScreen extends Component {

    state = {
        isPreviousAvailable: true,
        isNextAvailable: true
    }

    itemDescription = (label, text, isImp) => {
        const discriptionTextStyle = [styles.subDiscriptionText];
        isImp && discriptionTextStyle.push(styles.subDiscriptionTextImp)
        return (
            <View style={styles.subDiscriptionBox}>
                <Text style={styles.subDiscriptionLabel}>{label}</Text>
                <Text style={discriptionTextStyle}>{text}</Text>
            </View>
        )
    }

    showPrevButton = () => {
        this.setState({
            isPreviousAvailable: true
        })
    }

    showNextButton = () => {
        this.setState({
            isNextAvailable: true
        })
    }

    emptyPrevCall = () => {
        this.setState({
            isPreviousAvailable: false
        })
    }
    emptyNextCall = () => {
        this.setState({
            isNextAvailable: false
        })
    }

    handlePreviousAppointment = () => {
        this.props.previousAppointment(this.props.token, this.props.selectedCaseId, this.props.appointment.Id, this.emptyPrevCall, this.showNextButton);
    }
    handleNextAppointment = () => {
        this.props.nextAppointment(this.props.token, this.props.selectedCaseId, this.props.appointment.Id, this.emptyNextCall, this.showPrevButton)
    }


    render() {
        const appointment = this.props.appointment;
        let duration = 0
        let endTime = ''
        let startTime = ''
        let headerDate = ''
        let meetingDate = ''
        if (appointment) {
            if (this.props.userLanguage == 'en') {
                moment.locale('en')
            }
            else {
                moment.locale('zh-cn')
            }
            const startDateTime = moment(appointment.StartDate);
            headerDate = startDateTime.format('dddd');
            meetingDate = startDateTime.format('D MMM YYYY')
            startTime = startDateTime.format('hh:mm');
            endTime = moment(appointment.EndDate).format('hh:mm');
            // duration = appointment.EndDate && appointment.StartDate && moment.duration(endTime.diff(startTime));
        }
        return (
            <ScrollView style={styles.detailContainer}>


                {appointment &&
                    <View style={styles.detailView}>
                        <View style={styles.headerSection}>
                            <Text style={styles.headerText}>{headerDate}</Text>
                        </View>
                        <View style={styles.detailAndArrow}>
                            {this.state.isPreviousAvailable &&
                                <TouchableOpacity onPress={this.handlePreviousAppointment}>
                                    <AntDesign name={'left'}
                                        style={styles.arrowIcon}
                                        size={16} />
                                </TouchableOpacity>}
                            <View style={styles.descriptionSection}>
                                {this.itemDescription(I18n.t('detail.class'), appointment.Class)}
                                {this.itemDescription(I18n.t('detail.staff'), appointment.StaffName)}
                                {this.itemDescription(I18n.t('detail.date'), meetingDate)}
                                {this.itemDescription(I18n.t('detail.time'), `${startTime} - ${endTime}`)}
                                {/* {this.itemDescription(I18n.t('detail.duration'), `${parseInt(duration.asMinutes())} ${I18n.t('detail.min')}`)} */}
                                {this.itemDescription(I18n.t('detail.venue'), appointment.Venue)}
                                {this.itemDescription(I18n.t('detail.address'), appointment.Address)}
                                {this.itemDescription(I18n.t('detail.contact'), appointment.Contact)}
                                {this.itemDescription(I18n.t('detail.remark'), appointment.Remarks, true)}
                            </View>
                            {this.state.isNextAvailable &&
                                <TouchableOpacity onPress={this.handleNextAppointment}>
                                    <AntDesign name={'right'}
                                        style={styles.arrowIcon}
                                        size={16} />
                                </TouchableOpacity>}
                        </View>
                    </View>
                }

            </ScrollView >
        )
    }
}


let styles = create(DetailScreenStyles);

const mapStateToProps = (state) => {
    return {
        appointment: _.get(state, 'calendar.selectedAppointment'),
        userLanguage: state.login?.language,
        selectedCaseId: _.get(state, 'calendar.selectedCase'),
        token: _.get(state, 'login.userData.Token'),

    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        previousAppointment: (token, caseId, appointmentId, emptyPrevCall, showNextButton) => {
            dispatch(DetailAction.previousAppointment(token, caseId, appointmentId, emptyPrevCall, showNextButton))
        },
        nextAppointment: (token, caseId, appointmentId, emptyNextCall, showPrevButton) => {
            dispatch(DetailAction.nextAppointment(token, caseId, appointmentId, emptyNextCall, showPrevButton))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
