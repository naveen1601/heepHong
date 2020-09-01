import { WebView } from 'react-native-webview';
import React, { Component, createRef } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Keyboard,
    ScrollView
} from 'react-native';
import CalendarScreenStyles from './CalendarScreenStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../../baseComponents/text/Text';
import FlatButton from '../../baseComponents/button/FlatButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../baseComponents/button/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import CalendarAction from './CalendarAction';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Screens, resetScreen } from '../../helpers/screenHelpers';
import I18n from '../../i18n/locales';

class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'monthly',
            // key: 0
        };
        this.calendarTypes = ['monthly', 'weekly', 'daily']
        this.webviewRef = createRef();
        this.eventCollection = {
            'monthly': 'SwithToMonth',
            'weekly': 'SwithToWeek',
            'daily': 'SwithToDay',
            'Today': 'SwithToToday',
            'CaseIdLoad': 'LoadCalendarByCaseId'
        }

    }

    componentDidMount() {
        this.props.getCases();
    }

    LoadingIndicatorView = () => {
        return (
            <ActivityIndicator color='#f59042' size='large' style={styles.ActivityIndicatorStyle} />
        )
    }

    onMessage = (event) => {
        //alert(JSON.stringify(event.nativeEvent.data))

        if (event.nativeEvent.data != 'Loaded') {
            //alert(event.nativeEvent.data)
            this.props.getAppointmentDetails(event.nativeEvent.data);
        }
    }

    handleTodaySelection = () => {
        const sentToWebView = {
            method: this.eventCollection['Today'],
        }
        let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
        this.webviewRef.current.injectJavaScript(injectedData);
    }

    runFirst = () => {

        const sentToWebView = {
            CaseId: this.props.selectedCase,
            method: "LoadCalendarByCaseId",
            LanguageCode: I18n.t('api.language')
        }

        return (`
            window.postMessage(${JSON.stringify(sentToWebView)}, "*");
          true; // note: this is required, or you'll sometimes get silent failures
        `)
    };

    handleCalendarOptionSelection = value => {

        this.setState({
            selectedOption: value
        })

        const methodName = this.eventCollection[value]

        const sentToWebView = {
            method: methodName,
        }
        let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
        this.webviewRef.current.injectJavaScript(injectedData);
    };

    renderCalendarButton = () => (
        <View style={styles.buttonConatiner}>
            {this.calendarTypes.map((item) => {
                const style = (item == this.state.selectedOption) ? styles.selectedButton : styles.unSelectedButton;
                const buttonLabel = I18n.t(`calendar.${item}`)
                return (
                    <FlatButton
                        onPress={this.handleCalendarOptionSelection}
                        text={buttonLabel}
                        style={style}
                        returnValue = {item}
                    />
                )
            })}
        </View>
    );

    handleCaseOption = (value) => {

        this.props.saveSelectedCase(value);
        const sentToWebView = {
            CaseId: value,
            method: "LoadCalendarByCaseId",
            LanguageCode: I18n.t('api.language')
        }

        let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
        this.webviewRef.current.injectJavaScript(injectedData);
    }

    renderHeader = () => {

        const casesList = this.props.cases.map(item => {
            const nameLabel = this.props.languageSelected == 'en' ? item.DisplayEnglish : item.DisplayChinese;
            return {
                label: nameLabel,
                value: item.Key,
            }
        })

        return (
            <View style={styles.calendarHeader}>
                <View style={styles.caseContainer}>
                    <FontAwesome name={'user-o'}
                        style={styles.userIcon}
                        size={16} />
                    <RNPickerSelect
                        placeholder={{}}
                        items={casesList}
                        onValueChange={value => this.handleCaseOption(value)}
                        useNativeAndroidPickerStyle={false}
                        InputAccessoryView={() => null}
                        style={pickerSelectStyles}
                        value={this.props.selectedCase}
                        Icon={() => {
                            return <AntDesign name={'down'}
                                style={styles.arrowIcon}
                                size={8} />;
                        }}
                    />
                </View>

                {this.renderCalendarButton()}
                <TouchableOpacity style={styles.caseContainer}
                    onPress={this.handleTodaySelection}>
                    <MaterialCommunityIcons name={'calendar-today'}
                        style={styles.todayIcon}
                        size={22} />
                </TouchableOpacity>
            </View>
        )
    }

    renderAlert =()=>{
        alert(this.props.errorMessage);
        resetScreen(this.props.navigation, Screens.LOGIN_SCREEN)
    }

    render() {
        this.props.errorMessage && this.renderAlert();
        const vwUri = `http://hhs-cam2.eastasia.cloudapp.azure.com/hhsmobile?token=${this.props.token}&LanguageCode=${I18n.t('api.language')}`;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* {this.props.errorMessage && this.renderAlert()} */}
                <View style={styles.calendarContainer}>
                    {this.renderHeader()}

                    <WebView
                        source={{
                            uri: vwUri,
                        }}
                        ref={this.webviewRef}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        sharedCookiesEnabled={true}
                        originWhitelist={["*"]}
                        scalesPageToFit={true}
                        startInLoadingState={true}
                        mixedContentMode={"always"}
                        allowsInlineMediaPlayback={true}
                        allowsFullscreenVideo={true}
                        allowsBackForwardNavigationGestures={true}
                        allowsLinkPreview={false}
                        renderLoading={this.LoadingIndicatorView}
                        onMessage={this.onMessage}
                        injectedJavaScript={this.runFirst()}
                    />
                    {/* <Button
                    onPress={() => this.props.navigation.navigate(Screens.DETAIL_SCREEN)}
                    text="Move To Detail"
                    secondaryButton={true}
                /> */}
                </View>
            </SafeAreaView>

        );
    }
}

let styles = create(CalendarScreenStyles);
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        // paddingVertical: 12,
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 14,
        // paddingVertical: 10,
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});

const mapStateToProps = (state) => {
    return {
        token: _.get(state, 'login.userData.Token'),
        cases: _.get(state, 'calendar.cases'),
        selectedCase: _.get(state, 'calendar.selectedCase'),
        languageSelected: _.get(state, 'login.language'),
        errorMessage: _.get(state, 'calendar.errorMessage'),
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getCases: () => {
            dispatchProps.getCases(stateProps.token);
        },
        getAppointmentDetails: (appointmentId) => {
            dispatchProps.getAppointmentDetails(appointmentId, stateProps.token);
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCases: (token) => {
            dispatch(CalendarAction.getCases(token, ownProps.navigation));
        },
        saveSelectedCase: (selectedCase) => {
            dispatch(CalendarAction.saveSelectedCase(selectedCase));
        },

        getAppointmentDetails: (appointmentId, token) => {
            dispatch(CalendarAction.getAppointmentDetails(appointmentId, token, ownProps.navigation));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CalendarScreen)
