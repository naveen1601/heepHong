
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


const DetailScreen = () => {

    const itemDescription = (label, text) => (
        <View style={styles.subDiscriptionBox}>
            <Text style={styles.subDiscriptionLabel}>{label}</Text>
            <Text style={styles.subDiscriptionText}>{text}</Text>
        </View>
    )

    return (
        <ScrollView>
            {/* <ActivityBox/> */}
            <View style={styles.headerSection}>
                <Text style={styles.headerText}>{moment().format('DD MMM YYYY, ddd')}</Text>
            </View>
            <View style={styles.descriptionSection}>
                {itemDescription('Class', 'PST')}
                {itemDescription('Staff', 'PST')}
                {itemDescription('Time', 'PST')}
                {itemDescription('Duration', 'PST')}
                {itemDescription('Venue', 'PST')}
                {itemDescription('Address', 'PST')}
                {itemDescription('Contact', 'PST')}
                {itemDescription('Remark', 'PST')}
            </View>

        </ScrollView>
    )
}


let styles = create(DetailScreenStyles);


export default DetailScreen;
