import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStyles, { PropStyles } from './LoginStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../../baseComponents/textInput/TextInput';
import PasswordInput from '../../baseComponents/passwordInput/PasswordInput';
//user FontAwesome, locked Fontisto
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../baseComponents/button/Button';
import {
    View,
    Image,
    ScrollView,
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import FlatButton from '../../baseComponents/button/FlatButton';
import { Screens } from '../../helpers/screenHelpers';
import I18n from '../../i18n/locales';
import _ from 'lodash';
import LoginAction from './LoginAction';
import Alert from '../../baseComponents/alert/Alert';

class LoginScreen extends Component {

    state = {
        userName: 'chan456@testing.com',
        password: 'dd',
        userNameHasError: '',
        passwordHasError: ''
    };

    showErrorFunction = (error) => {
        if (error.Title == 'Invalid Email') {
            this.setState({
                userNameHasError: error.Message,

            });
        }
        else if (error.Title == 'Invalid Password') {
            this.setState({
                passwordHasError: error.Message,
            });
        }
    }

    handleUserNameChange = (text) => {
        this.setState({
            userName: text,
            userNameHasError: '',
        });
        //this.updateLoginButtonState(text, this.state.password);
    }

    handlePasswordChange = (text) => {
        this.setState({
            password: text,
            passwordHasError: ''
        });
        //this.updateLoginButtonState(this.state.userName, text);
    }


    renderLoginModal = () => {
        const userBoxStyle = [styles.textInputFieldsContainer], passwordBoxStyle = [styles.textInputFieldsContainer];
        this.state.userNameHasError && userBoxStyle.push(styles.errorBox);
        this.state.passwordHasError && passwordBoxStyle.push(styles.errorBox);

        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.loginBox}>
                    <View style={userBoxStyle}>
                        <FontAwesome name={'user'}
                            style={styles.iconStyle}
                            size={20} />
                        <TextInput
                            testId="userNameTextInput"
                            onChangeText={this.handleUserNameChange}
                            value={this.state.userName}
                            placeholder={I18n.t('login.userNamePlaceHolder')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    {!!this.state.userNameHasError && <Alert message={this.state.userNameHasError}
                        type="error" />
                    }
                    <View style={passwordBoxStyle}>
                        <Fontisto name={'locked'}
                            style={styles.iconStyle}
                            size={20} />
                        <PasswordInput onChangeText={this.handlePasswordChange}
                            testID="passwordTextInput"
                            placeholder={I18n.t('login.passwordPlaceHolder')}
                            maxLength={100}
                            value={this.state.password}
                            stacked />
                    </View>
                    {!!this.state.passwordHasError && <Alert message={this.state.passwordHasError}
                        type="error" />
                    }
                    <View style={styles.forgetPassBox}>
                        <FlatButton
                            onPress={() => { }}
                            text={I18n.t('login.forgetPassword')}
                        />
                    </View>
                    <View style={styles.loginButton}>
                        <Button
                            onPress={this.handleLoginButton}
                            text={I18n.t('login.loginButtonText')}
                            secondaryButton={true}
                            style={styles.buttonStyle}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }

    isInputEmpty = (name) => {
        return !_.isEmpty(String(name).trim())
    }
    areUserInputValid = () => {
        const userNameValidation = this.isInputEmpty(this.state.userName);
        const passwordValidation = this.isInputEmpty(this.state.password);

        this.setState({
            passwordHasError: !passwordValidation,
            userNameHasError: !userNameValidation
        });
        return userNameValidation && passwordValidation;
    }

    handleLoginButton = () => {
        if (this.areUserInputValid()) {
            this.props.doLogin(this.state.userName, this.state.password, this.props.firebaseToken, this.props.notificationId, this.showErrorFunction);
        }

    }

    render() {
        return (
            <>
                <View style={styles.loginContainer}>
                    <Image
                        style={styles.logoImage}
                        source={require('../../staticData/assests/Hhs_Logo.png')}
                    />
                    {this.renderLoginModal()}
                </View>
            </>
        );
    }
}

LoginScreen.propTypes = {
};
let styles = create(LoginStyles);


const mapStateToProps = (state, ownProps) => {
    return {
        errorMessage: state.login?.errorMessage,
        firebaseToken: state.login?.firebaseToken,
        notificationId: state.activityDetail?.firebaseNotificationId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: (userName, password, firebaseToken, notificationId, showErrorFunction) => {
            dispatch(LoginAction.doLogin(userName, password, firebaseToken, notificationId, showErrorFunction, ownProps.navigation));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)