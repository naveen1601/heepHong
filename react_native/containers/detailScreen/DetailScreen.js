
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
        isPreviousAvailable: this.props.appointment.HasPrev,
        isNextAvailable: this.props.appointment.HasNext
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

    checkPrevAndNextButton=(HasPrev, HasNext)=>{
           this.setState({
            isPreviousAvailable: HasPrev,
            isNextAvailable: HasNext
        }) 
    }

    handlePreviousAppointment = () => {
        this.props.previousAppointment(this.props.token, this.props.selectedCaseId, this.props.appointment.Id, this.checkPrevAndNextButton);
    }
    handleNextAppointment = () => {
        this.props.nextAppointment(this.props.token, this.props.selectedCaseId, this.props.appointment.Id, this.checkPrevAndNextButton)
    }


    render() {
        const appointment = this.props.appointment;
        let duration = 0
        let endTime = ''
        let startTime = ''
        let headerDate = ''
        let meetingDate = ''
        let startDateTime = '';
        let remark = '';
        if (appointment) {
            if (this.props.userLanguage == 'en') {
                moment.locale('en');
                startDateTime = moment(appointment.StartDate);
                startTime = startDateTime.format('h:mm a');
                endTime = moment(appointment.EndDate).format('h:mm a');
                meetingDate = startDateTime.format('D MMM YYYY')
            }
            else {
                moment.locale('zh-cn');
                startDateTime = moment(appointment.StartDate);
                startTime = startDateTime.format('a h:mm');
                endTime = moment(appointment.EndDate).format('a h:mm');
                meetingDate = startDateTime.format('YYYY')+'年'+ startDateTime.format(' MMM Do')
            }
            
            headerDate = startDateTime.format('dddd');
            // duration = appointment.EndDate && appointment.StartDate && moment.duration(endTime.diff(startTime));
            remark = appointment.Target ? appointment.Target+' '+appointment.Remarks : appointment.Remarks;
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
                                        size={20} />
                                </TouchableOpacity>}
                            <View style={styles.descriptionSection}>
                                {this.itemDescription(I18n.t('detail.appointment'), appointment.AppointmentName)}
                                {this.itemDescription(I18n.t('detail.staff'), appointment.StaffName)}
                                {this.itemDescription(I18n.t('detail.date'), meetingDate)}
                                {this.itemDescription(I18n.t('detail.time'), `${startTime} - ${endTime}`)}
                                {this.itemDescription(I18n.t('detail.venue'), appointment.Venue)}
                                {this.itemDescription(I18n.t('detail.address'), appointment.Address)}
                                {this.itemDescription(I18n.t('detail.contact'), appointment.Contact)}
                                {this.itemDescription(I18n.t('detail.remark'), remark, true)}
                            </View>
                            {this.state.isNextAvailable &&
                                <TouchableOpacity onPress={this.handleNextAppointment}>
                                    <AntDesign name={'right'}
                                        style={styles.arrowIcon}
                                        size={20} />
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
        previousAppointment: (token, caseId, appointmentId, checkPrevAndNextButton) => {
            dispatch(DetailAction.previousAppointment(token, caseId, appointmentId, checkPrevAndNextButton))
        },
        nextAppointment: (token, caseId, appointmentId, checkPrevAndNextButton) => {
            dispatch(DetailAction.nextAppointment(token, caseId, appointmentId, checkPrevAndNextButton))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
