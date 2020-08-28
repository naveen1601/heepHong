import React, { Component } from 'react';
import { View } from 'react-native';
import I18n from '../../i18n/locales'
import Text from "../../baseComponents/text/Text";
import Button from "../../baseComponents/button/Button";
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetScreen, Screens } from '../../helpers/screenHelpers';
import { create } from '../../helpers/PlatformSpecificStyles';
import MoreStyles from './MoreStyles';



class MoreScreen extends Component {

    state = {
        languageSelected: 'zh'
    }

    onChangeLanguage = () => {
        this.props.updateUserLanguage('zh');
        resetScreen(this.props.navigation, Screens.TAB);

    }

    onChangeEnglish = () => {

        this.props.updateUserLanguage('en');
        resetScreen(this.props.navigation, Screens.TAB);
    }

    render() {
        console.log('lan ', this.props.userLanguage);
        I18n.locale = this.props.userLanguage;
        return (
            <SafeAreaView style={ styles.moreContainer}>
                <Text>{I18n.t('hompage.language')}</Text>
                <Button
                    onPress={this.onChangeLanguage}
                    text="语言"
                    secondaryButton={true}
                />
                <Button
                    onPress={this.onChangeEnglish}
                    text="English"
                    secondaryButton={true}
                />
            </SafeAreaView>

        );
    }
}

let styles = create(MoreStyles);


const mapStateToProps = (state) => {
    console.log(state);
    return {
        userLanguage: state.login && state.login.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserLanguage: (selectedLanguage) => {
            dispatch({
                type: 'SAVE_LANGUAGE',
                language: selectedLanguage
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen)