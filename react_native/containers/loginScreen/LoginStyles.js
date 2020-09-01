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
        borderRadius: 50,
        borderColor: $primary.grayColors._200,
        borderWidth: 1,
        backgroundColor: $primary.white,
        
            marginBottom: $_.loginInputFieldsContainerMarginBottomAndroid
        
    },
    iconStyle: {
        color: $primary.grayColors._200,
        paddingTop: 12,
    },
    forgetPassBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
 
    },
    loginContainer: {        
        borderTopColor: $_.loginOptionBorderColor,
        // borderWidth: 1,
        padding:50,
        paddingTop:20
    },
    loginBox:{   
        marginVertical:20,   
        // borderWidth:1 
    },
    loginButton:{
        marginVertical:50,
    },
    buttonStyle:{
        margin:0
    },

    

    loginModalBackground: {
        backgroundColor: $_.loginPageBackgroundColor,
        height: '100%'
    },
    loginFields: {
        paddingTop: 50
    },
    errorBox:{
        borderColor: $_.errorBorderColor
    },
    logoImage:{
        width:'100%',
        resizeMode: 'contain',
        height: 110,
        left:-10
    }
}

