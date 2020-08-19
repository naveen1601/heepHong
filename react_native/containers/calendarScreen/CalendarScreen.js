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


class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Monthly',
            name:'sss'
        };
        this.calendarTypes = ['Monthly', 'Weekly', 'Daily']
        this.webviewRef = createRef();

    }


    LoadingIndicatorView = () => {
        return (
            <ActivityIndicator color='#f59042' size='large' style={styles.ActivityIndicatorStyle} />
        )
    }

    handleCalendarOptionSelection = value => {
        this.setState({
            selectedOption: value
        })
    };

    onMessage = (event) => {
        //alert(JSON.stringify(event.nativeEvent.data)); 
    }

    renderCalendarButton = () => (
        <View style={styles.buttonConatiner}>
            {this.calendarTypes.map((item) => {
                const style = (item == this.state.selectedOption) ? styles.selectedButton : styles.unSelectedButton;
                return (
                    <FlatButton
                        onPress={this.handleCalendarOptionSelection}
                        text={item}
                        style={style}
                    />
                )

            })}
        </View>
    )
    handleCaseOption = () => { }
    handleTodaySelection = () => { }

    runFirst = () => {
        // const sentToWebView= {
        //     case: 7519,
        //     calendarType: 'week',
        //     todayView: false
        // } 
        const sentToWebView = {
            CaseId: 4543,
            method: "LoadCalendarByCaseId",
            LanguageCode: 'en-US'
        }
        // let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
        // console.log('sss ',stateName) 
        // window.postMessage(${JSON.stringify(sentToWebView)}, "*");

        return (`
            window.postMessage(${JSON.stringify(sentToWebView)}, "*");
          true; // note: this is required, or you'll sometimes get silent failures
        `)
    };

    handleClickn = () => {
        this.setState({
            name: 'abhi'
        });
        //this.webviewRef && this.webviewRef.current.reload();
        const sentToWebView = {
            CaseId: 8377,
            method: "LoadCalendarByCaseId",
            LanguageCode: 'en-US'
        }
        let injectedData = `window.postMessage(${JSON.stringify(sentToWebView)}, "*");`;
        this.webviewRef.current.injectJavaScript(injectedData);
    }

    renderHeader = () => (
        <View style={styles.calendarHeader}>
            <TouchableOpacity
                onPress={this.handleCaseOption}>
                <View style={styles.caseContainer}>
                    <FontAwesome name={'user-o'}
                        style={styles.userIcon}
                        size={16} />
                    <Text style={styles.caseName}>
                        Case Name
                        </Text>
                    <AntDesign name={'down'}
                        style={styles.arrowIcon}
                        size={8} />
                </View>
            </TouchableOpacity>

            {this.renderCalendarButton()}
            <TouchableOpacity style={styles.caseContainer}
                onPress={this.handleTodaySelection}>
                <MaterialCommunityIcons name={'calendar-today'}
                    style={styles.userIcon}
                    size={21} />
            </TouchableOpacity>
        </View>
    )

    render() {
        const vwuri = 'http://hhs-cam2.eastasia.cloudapp.azure.com/hhsmobile?token=qyy_mrt1tiOMUumJOUHgibjsO_RSIijipBaUr2kQGH5RqVH8cx4nc88_543xgLRqrfUryuQloN4tK6Oa1AKLz6QMqNFKnFTmO16GzvZcKXEY6QPe8Gy6anuCGRAPb5K3jaHiTNNdh9rRIUF3TeMzBnPzF6r-c1yMHzt5WcMfgl97ilzIsDmGGgRSAAHpjhXWDfH2k_EXoZ2gLAZ_W6UNWdiyrJEHtwPU6I02DqFe2LE&CaseId=1234&LanguageCode=en-US';
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderHeader()}

                <WebView
                    source={{
                        uri: vwuri,
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
                <Button
                    onPress={this.handleClickn}
                    text='Change Case to 8377'
                    secondaryButton={true}
                />
            </SafeAreaView>

        );
    }
}

let styles = create(CalendarScreenStyles);


export default CalendarScreen;