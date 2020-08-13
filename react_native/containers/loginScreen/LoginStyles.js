import $_ from './LoginSettings';
import { Dimensions, Platform } from 'react-native';
const d = Dimensions.get('window');
const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;
import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    textInputFieldsContainer: {
        flexDirection: 'row',
        paddingHorizontal: $primary.baseGridUnit*2,
        paddingVertical  :  $primary.baseGridUnit,
        borderRadius: 100,
        borderColor: $primary.grayColors._200,
        borderWidth: 1,
        backgroundColor: $primary.white,
        android: {
            marginBottom: $_.loginInputFieldsContainerMarginBottomAndroid
        }
    },

    iconStyle: {
        color: $primary.grayColors._200,
        paddingTop: 12,
    },



    loginModalBackground: {
        backgroundColor: $_.loginPageBackgroundColor,
        height: '100%'
    },
    loginContainer: {
        backgroundColor: $_.loginOptionBackgroundColor,
        // position: 'absolute',
        width: '100%',
        height: '40%',
        borderTopColor: $_.loginOptionBorderColor,
        borderTopWidth: 1,
        bottom: 0,        
        ios: {
            shadowColor: '#333',
            paddingBottom: isX ? 14 : 0,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
        },
    },
    login: {
        backgroundColor: $_.loginOptionBackgroundColor,
        flex: 1
    },
    
    loginFields: {
        paddingTop: 50
    },
}

