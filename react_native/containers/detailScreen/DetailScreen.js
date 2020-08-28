
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import DetailScreenStyles from './DetailScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import ActivityBox from '../../components/activityBox/ActivityBox';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';


const DetailScreen = (props) => {

    const itemDescription = (label, text) => (
        <View style={styles.subDiscriptionBox}>
            <Text style={styles.subDiscriptionLabel}>{label}</Text>
            <Text style={styles.subDiscriptionText}>{text}</Text>
        </View>
    )
    const appointment = props.appointment;

    const startTime = appointment.StartDate && moment(appointment.StartDate)
    const endTime = appointment.EndDate && moment(appointment.EndDate)
    const duration = appointment.EndDate && appointment.StartDate && moment.duration(endTime.diff(startTime));
    return (
        <ScrollView style={styles.detailContainer}>
            {appointment &&
                <>
                    <View style={styles.headerSection}>
                        <Text style={styles.headerText}>{moment(appointment.StartDate).format('DD MMM YYYY, ddd')}</Text>
                    </View>
                    <View style={styles.descriptionSection}>
                        {itemDescription('Class', appointment.Class)}
                        {itemDescription('Staff', appointment.StaffName)}
                        {itemDescription('Time', appointment.Time)}
                        {itemDescription('Duration', `${parseInt(duration.asMinutes())} min`)}
                        {itemDescription('Venue', appointment.Venue)}
                        {itemDescription('Address', appointment.Address)}
                        {itemDescription('Contact', appointment.Contact)}
                        {itemDescription('Remark', appointment.Remarks)}
                    </View>
                </>
            }
        </ScrollView>
    )
}


let styles = create(DetailScreenStyles);

const mapStateToProps = (state) => {
    return {
        appointment: _.get(state, 'calendar.selectedAppointment')
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        someAction: () => { }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
