import React, { Component } from 'react';
import { View } from 'react-native';
import I18n from '../../i18n/locales'
import Text from "../../baseComponents/text/Text";
import Button from "../../baseComponents/button/Button";
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';


class MoreScreen extends Component {

    state = {
        languageSelected: 'en'
    }

    onChangeLanguage = (languageSelected) => {
        this.props.updateUserLanguage('zh')
    }

    onChangeEnglish = (languageSelected) => {

        this.props.updateUserLanguage('en');
        this.forceUpdate();
    }

    render() {
        console.log('lan ', this.props.userLanguage);
        I18n.locale = this.props.userLanguage;
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{I18n.t('hompage.language')}</Text>
                <Button
                    onPress={this.onChangeLanguage}
                    text="Chinese"
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