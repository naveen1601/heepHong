import React, { useEffect } from 'react';

import {
    AppState,
    Image,
    View, Text
} from 'react-native';
import { Screens } from '../helpers/screenHelpers';
import { reset, getNavigation } from './RootNavigation';
import ValidateAction from './ValidateAction';
import { connect } from 'react-redux';
import { create } from '../helpers/PlatformSpecificStyles';
import { SafeAreaView } from 'react-native-safe-area-context';


const HhsAppStartProcess = (props) => {

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _errorCallback = () => reset(Screens.LOGIN_SCREEN)

    const _handleAppStateChange = (nextAppState) => {
        if (nextAppState == "active") {
            ValidateAction.validateToken(props.userData, _errorCallback);
        }
    };

    const navigationInstance = getNavigation();
    const pageName = navigationInstance?.getCurrentRoute()?.name;


    const comp = (pageName != Screens.LOGIN_SCREEN) ? (<View />) : (<SafeAreaView style={styles.logoContainer}>
        <Image
            style={styles.logoImage}
            source={require('../staticData/assests/Hhs_Logo.png')}
        />
    </SafeAreaView>)

    return comp;
}
const mapStateToProps = (state) => {
    return {
        userData: state.login?.userData,
    }
}

let styles = create({
    logoImage: {
        width: '70%',
        resizeMode: 'contain',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
    }

});

export default connect(mapStateToProps)(HhsAppStartProcess);