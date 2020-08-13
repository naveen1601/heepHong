import React, { Component } from 'react';
import LoginStyles, { PropStyles } from './LoginStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../../baseComponents/textInput/TextInput';
import PasswordInput from '../../baseComponents/passwordInput/PasswordInput';
//user FontAwesome, locked Fontisto
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Button from '../../baseComponents/button/Button';
import {
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Text from '../../baseComponents/text/Text';
// import { Screens } from '../../helpers/screenHelpers'

class LoginScreen extends Component {

    state = {
        userName: '',
        password: '',
    };


    handleUserNameChange = (text) => {
        this.setState({ userName: text });
        //this.updateLoginButtonState(text, this.state.password);
    }

    handlePasswordChange = (text) =>{
        this.setState({ password: text });
        //this.updateLoginButtonState(this.state.userName, text);
    }


    renderLoginModal = () => {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>

                    <View style={styles.textInputFieldsContainer}>
                        <FontAwesome name={'user'}
                            style={styles.iconStyle}
                            size={20} />
                        <TextInput
                            testId="userNameTextInput"
                            onChangeText={this.handleUserNameChange}
                            value={this.state.userName}
                            placeholder="Enter Your User Id"
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
                            placeholder={'Password'}
                            hasErrors={false}
                            maxLength={100}
                            value={this.state.password}
                            stacked />
                    </View>
                    

            </ScrollView>
        );
    }

    // handleLoginButton = () => this.props.navigation.navigate(Screens.LoginScreen);
    handleLoginButton = () => { };


    renderLoginOption = () => (

        <View style={styles.loginModalBackground}>
            <View style={styles.loginInputFieldsContainer}>

                <TextInput
                    testId="userNameTextInput"
                    onChangeText={() => { }}
                    value={this.state.userName}
                    placeholder="Enter Your User Id"
                    keyboardType="email-address"
                    hasErrors={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <PasswordInput onChangeText={() => { }}
                    testID="passwordTextInput"
                    placeholder={'Password'}
                    hasErrors={false}
                    maxLength={20}
                    value={this.state.password}
                    stacked />

                <Button
                    onPress={this.handleLoginButton}
                    text="Login through user id"
                    secondaryButton={true}
                // disabled
                />
                <Text>heessdsdsds</Text>
            </View>
        </View>
    );


    render() {
        return (
            // <Text>heessdsdsds</Text>
            this.renderLoginModal()
            // this.renderLoginOption()
        );
    }
}

LoginScreen.propTypes = {
};
let styles = create(LoginStyles);

export default LoginScreen;