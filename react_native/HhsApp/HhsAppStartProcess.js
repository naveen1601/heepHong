import React, { useEffect } from 'react';

import {
    AppState,
    Image,
    View, Text
} from 'react-native';
import { Screens } from '../helpers/screenHelpers';
import { reset } from './RootNavigation';
import ValidateAction from './ValidateAction';
import { connect } from 'react-redux';
import { create } from '../helpers/PlatformSpecificStyles';
import { SafeAreaView } from 'react-native-safe-area-context';


const HhsAppStartProcess = (props) => {

    const tokenRef = React.useRef(props.userToken);
    tokenRef.current = props.userToken;

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _errorCallback = () => reset(Screens.LOGIN_SCREEN)

    const _handleAppStateChange = (nextAppState) => {
        if (nextAppState == "active") {
            ValidateAction.validateToken(tokenRef.current, _errorCallback);
        }
    };

    const comp = (props.pageName == Screens.LOGIN_SCREEN || props.pageName == '') ? (<View />) : (<SafeAreaView style={styles.logoContainer}>
        <Image
            style={styles.logoImage}
            source={require('../staticData/assests/Hhs_Logo.png')}
        />
    </SafeAreaView>)

    return comp;
}
const mapStateToProps = (state) => {
    return {
        userToken: state.login?.userData?.Token
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