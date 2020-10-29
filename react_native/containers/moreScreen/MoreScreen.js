import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import I18n from '../../i18n/locales'
import Text from "../../baseComponents/text/Text";
import Button from "../../baseComponents/button/Button";
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetScreen, Screens } from '../../helpers/screenHelpers';
import { create } from '../../helpers/PlatformSpecificStyles';
import MoreStyles from './MoreStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';


class MoreScreen extends Component {

    state = {
        languageSelected: this.props.userLanguage
    }


    // onChangeLanguage = () => {
    //     this.props.updateUserLanguage('zh');
    //     resetScreen(this.props.navigation, Screens.TAB);
    // }

    // onChangeEnglish = () => {
    //     this.props.updateUserLanguage('en');
    //     resetScreen(this.props.navigation, Screens.TAB);
    // }

    handleLanguageChange = (value) => {

        if (this.state.languageSelected != value) {
            this.props.updateUserLanguage(value);
            resetScreen(this.props.navigation, Screens.TAB);
        }
    }

    handleLogout = () => {
        this.props.logout();
    }

    renderNameAndEmail = () => {
        const name = this.props.userLanguage == 'en' ? this.props.userData.EnglishName : this.props.userData.ChineseName;
        const email = this.props.userData.Email;
        return (
            <View style={styles.headerSection}>
                <Image
                    style={styles.icon_head}
                    source={require('../../staticData/assests/head_icon.png')}
                />
                <View style={styles.nameSection}>
                    <Text style={styles.headerNameText}>{name}</Text>
                    <Text style={styles.headerEmailText}>{email}</Text>
                </View>
            </View>
        );
    }

    renderLanguageAndVersion = () => {

        //const choosedlanguage = this.props.userLanguage;
        languageList = [
            {
                label: '中文',
                value: 'zh'
            },
            {
                label: 'English',
                value: 'en'
            }];
        return (
            <View style={styles.languageAndVersion}>
                <View style={styles.languageBodySection}>
                    <View style={styles.bodySectionKey}>
                        <Image
                            style={styles.body_icon}
                            source={require('../../staticData/assests/Language_icon.png')}
                        />
                        <View style={styles.bodyIconTextContainer}>
                            <Text style={styles.bodyIconText}>{I18n.t('hompage.language')}</Text>
                        </View>
                    </View>
                    <View style={styles.bodySectionValueConatiner}>
                        {/* <Text style={styles.bodySectionValue}>Chinese</Text> */}
                        <View style={styles.pickerStyle}>
                            <RNPickerSelect
                                placeholder={{}}
                                items={languageList}
                                onValueChange={value => this.handleLanguageChange(value)}
                                useNativeAndroidPickerStyle={false}
                                InputAccessoryView={() => null}
                                style={pickerSelectStyles}
                                value={this.props.userLanguage}
                                Icon={() => {
                                    return <AntDesign name={'right'}
                                        style={styles.arrowIcon}
                                        size={13} />
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.VersionBodySection}>
                    <View style={styles.bodySectionKey}>
                        <Image
                            style={styles.body_icon}
                            source={require('../../staticData/assests/Version_icon.png')}
                        />
                        <View style={styles.bodyIconTextContainer}>
                            <Text style={styles.bodyIconText}>{I18n.t('hompage.version')}</Text>
                        </View>
                    </View>
                    <View style={styles.bodySectionValueConatiner}>
                        <Text style={styles.bodySectionValue}>1.0</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        I18n.locale = this.props.userLanguage;
        return (
            <SafeAreaView style={styles.moreContainer}>
                <ScrollView>
                    {this.renderNameAndEmail()}
                    {this.renderLanguageAndVersion()}
                    <TouchableOpacity onPress={this.props.logout}>
                        <View style={styles.logoutSection}>
                            <Text style={styles.logoutText}>Log Out</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <Text>{I18n.t('hompage.language')}</Text> */}
                    {/* <Button
                        onPress={this.onChangeLanguage}
                        text="语言"
                        secondaryButton={true}
                    /> */}
                    {/* <Button
                        onPress={()=>this.props.navigation.navigate(Screens.ACTIVITY_AND_DETAIL, { screen: Screens.ACTIVITY_DETAIL_SCREEN })}
                        text="English"
                        secondaryButton={true}
                    /> */}
                </ScrollView>
            </SafeAreaView >

        );
    }
}

let styles = create(MoreStyles);

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        textAlign: 'right',
        paddingRight: 30,
        marginRight: 10,
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        textAlign: 'right',
        paddingRight: 20,
        marginRight: 10,
        // paddingVertical: 10,
        color: 'black',
        top: -15,
        // paddingRight: 10, // to ensure the text is never behind the icon
    },
});

const mapStateToProps = (state) => {
    return {
        userLanguage: state.login?.language,
        userData: state.login?.userData

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUserLanguage: (selectedLanguage) => {
            dispatch({
                type: 'SAVE_LANGUAGE',
                language: selectedLanguage
            })
        },
        logout: () => {
            dispatch({
                type: 'CLEAR_DATA'
            });
            resetScreen(ownProps.navigation, Screens.LOGIN_SCREEN);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen)