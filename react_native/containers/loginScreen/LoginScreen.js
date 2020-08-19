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
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import FlatButton from '../../baseComponents/button/FlatButton';
import { Screens } from '../../helpers/screenHelpers';
import I18n from '../../i18n/locales';

class LoginScreen extends Component {

    state = {
        userName: '',
        password: '',
    };


    handleUserNameChange = (text) => {
        this.setState({ userName: text });
        //this.updateLoginButtonState(text, this.state.password);
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text });
        //this.updateLoginButtonState(this.state.userName, text);
    }


    renderLoginModal = () => {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.loginBox}>
                    <View style={styles.textInputFieldsContainer}>
                        <FontAwesome name={'user'}
                            style={styles.iconStyle}
                            size={20} />
                        <TextInput
                            testId="userNameTextInput"
                            onChangeText={this.handleUserNameChange}
                            value={this.state.userName}
                            placeholder={I18n.t('login.userNamePlaceHolder')}
                            keyboardType="email-address"
                            hasErrors={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.textInputFieldsContainer}>
                        <Fontisto name={'locked'}
                            style={styles.iconStyle}
                            size={20} />
                        <PasswordInput onChangeText={this.handlePasswordChange}
                            testID="passwordTextInput"
                            placeholder={I18n.t('login.passwordPlaceHolder')}
                            hasErrors={false}
                            maxLength={100}
                            value={this.state.password}
                            stacked />
                    </View>
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
                            style= {styles.buttonStyle}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }

    // handleLoginButton = () => this.props.navigation.navigate(Screens.LoginScreen);
    handleLoginButton = () => this.props.navigation.replace(Screens.TAB);

    render() {
        return (
            <View style={styles.loginContainer}>
                {this.renderLoginModal()}
            </View>
        );
    }
}

LoginScreen.propTypes = {
};
let styles = create(LoginStyles);


const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch(actionCreator)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)