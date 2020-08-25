import React from 'react';

import {
    Image,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    I18nManager
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { connect } from 'react-redux';

import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import LoginScreen from '../containers/loginScreen/LoginScreen'
import { Screens, resetScreen } from '../helpers/screenHelpers';
import Button from '../baseComponents/button/Button';
import ActivityScreen from '../containers/activityScreen/ActivityScreen';
import I18n from '../i18n/locales';
import CalendarScreen from '../containers/calendarScreen/CalendarScreen';
import MoreScreen from '../containers/moreScreen/MoreScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NativeToWeb from '../containers/NativeToWeb';
import DetailScreen from '../containers/detailScreen/DetailScreen';
import AppLevelSpinner from './AppLevelSpinner';

// import Text from '../baseComponents/text/Text';



const Stack = createStackNavigator();

function RenderAntIcon(props) {

    let customColor = props.navigation.focused ? '#E18128' : '#8E8E8F';
    return (
        <AntIcon name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderIonIcons(props) {

    let customColor = props.navigation.focused ? '#E18128' : '#8E8E8F';
    return (
        <IonIcons name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderFeatherIcons(props) {

    let customColor = props.navigation.focused ? '#f59042' : '#8E8E8F';
    return (
        <FeatherIcons name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}


//----------------------------------------------------------Experiment Ends --------------//

const BottomTabs = createBottomTabNavigator();

const Tabs = () => {
    return (
        <BottomTabs.Navigator
            tabBarOptions={{
                showIcon: true,
                showLabel: true,
                activeTintColor: '#f59042',

            }}>
            <BottomTabs.Screen name={Screens.CALENDAR_SCREEN}
                component={CalendarScreen}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderAntIcon navigation={navigation}
                                iconName={'calendar'} />
                        ),
                        tabBarLabel: I18n.t('navigator.calendar'),
                        color: '#f59042'
                    }
                }}
            />
            <BottomTabs.Screen name={Screens.ACTIVITY_SCREEN}
                component={ActivityScreen}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderIonIcons navigation={navigation}
                                iconName={"md-notifications-outline"} />
                        ),
                        tabBarLabel: I18n.t('navigator.activity'),
                        color: '#f59042',
                        headerShown: true
                    }
                }
                } />

            <BottomTabs.Screen name={Screens.MORE_SCREEN}
                component={MoreScreen}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderFeatherIcons navigation={navigation}
                                iconName={"more-horizontal"} />
                        ),
                        tabBarLabel: I18n.t('navigator.more'),
                        color: '#f59042'
                    }
                }
                } />
            {/* <BottomTabs.Screen name={'temp'}
                component={NativeToWeb}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderFeatherIcons navigation={navigation}
                                iconName={"more-horizontal"} />
                        ),
                        title: ()=><Text>{I18n.t('navigator.more')}</Text>,
                        color: '#f59042'
                    }
                }
                } /> */}
        </BottomTabs.Navigator>
    );
}

function MyStack() {
    return (
        <Stack.Navigator mode='card' screenOptions={{
            gestureEnabled: false,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name={Screens.LOGIN_SCREEN}
                component={LoginScreen}
                options={{ headerTitle: 'Heep Hong Society' }} />

            <Stack.Screen name={'TAB'}
                component={Tabs}
                options={{ headerMode: 'none', headerShown: false }} />

            {/* <Stack.Screen name={'detail'}
                component={DetailScreen}
                options={{ headerTitle: I18n.t('navigator.detail') }} /> */}

        </Stack.Navigator>
    );
}
const HhsNavigator = (props) => {
    I18n.locale = props.userLanguage;
    return (
        <>
            <StatusBar
                barStyle="dark-content" translucent={true} />
            <SafeAreaProvider>
                <NavigationContainer>
                    {/* <MyStack /> */}
                    <Tabs/>
                </NavigationContainer>
            </SafeAreaProvider>
            <AppLevelSpinner />

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userLanguage: state.login && state.login.language
    }
}

export default connect(mapStateToProps)(HhsNavigator)