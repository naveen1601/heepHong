import React, { useEffect } from 'react';

import {
    StatusBar,
    AppState
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { connect } from 'react-redux';

import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import LoginScreen from '../containers/loginScreen/LoginScreen'
import { Screens } from '../helpers/screenHelpers';
import ActivityScreen from '../containers/activityScreen/ActivityScreen';
import I18n from '../i18n/locales';
import CalendarScreen from '../containers/calendarScreen/CalendarScreen';
import MoreScreen from '../containers/moreScreen/MoreScreen';
import DetailScreen from '../containers/detailScreen/DetailScreen';
import AppLevelSpinner from './AppLevelSpinner';
import PrimarySettings from '../settings/styles/DefaultPrimarySettings';
import ActivityDetailScreen from '../containers/activityDetailScreen/ActivityDetailScreen';
import { navigationRef, reset } from './RootNavigation';
import _ from 'lodash';
import HhsAppStartProcess from './HhsAppStartProcess';
import { Component } from 'react';

// import Text from '../baseComponents/text/Text';



const Stack = createStackNavigator();

function RenderAntIcon(props) {

    let customColor = props.navigation.focused ? PrimarySettings.primaryColor : PrimarySettings.tertiaryColor;
    return (
        <AntIcon name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderIonIcons(props) {

    let customColor = props.navigation.focused ? PrimarySettings.primaryColor : PrimarySettings.tertiaryColor;
    return (
        <IonIcons name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderFeatherIcons(props) {

    let customColor = props.navigation.focused ? PrimarySettings.primaryColor : PrimarySettings.tertiaryColor;
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
                activeTintColor: PrimarySettings.primaryColor,
                inactiveBackgroundColor: PrimarySettings.defaultHeaderAndBottomColor,
                activeBackgroundColor: PrimarySettings.defaultHeaderAndBottomColor

            }}>
            <BottomTabs.Screen name={Screens.CALENDAR_AND_DETAIL}
                component={CalendarNestedStack}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderAntIcon navigation={navigation}
                                iconName={'calendar'} />
                        ),
                        tabBarLabel: I18n.t('navigator.calendar'),
                    }
                }}
            />
            <BottomTabs.Screen name={Screens.ACTIVITY_AND_DETAIL}
                component={ActivityNestedStack}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderIonIcons navigation={navigation}
                                iconName={"md-notifications-outline"} />
                        ),
                        tabBarLabel: I18n.t('navigator.activity'),
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
                    }
                }
                } />
        </BottomTabs.Navigator>
    );
}

function ActivityNestedStack() {
    return (
        <Stack.Navigator mode='card' screenOptions={{
            gestureEnabled: false,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name={Screens.ACTIVITY_SCREEN}
                component={ActivityScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={Screens.ACTIVITY_DETAIL_SCREEN}
                component={ActivityDetailScreen}
                options={{
                    headerTitle: I18n.t('navigator.activityDetail'),
                    headerStyle: {
                        backgroundColor: PrimarySettings.defaultHeaderAndBottomColor,
                    },
                }} />

        </Stack.Navigator>
    );
}

function CalendarNestedStack() {
    return (
        <Stack.Navigator mode='card' screenOptions={{
            gestureEnabled: false,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name={Screens.CALENDAR_SCREEN}
                component={CalendarScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={Screens.DETAIL_SCREEN}
                component={DetailScreen}
                options={{
                    headerTitle: I18n.t('navigator.detail'),
                    headerStyle: {
                        backgroundColor: PrimarySettings.defaultHeaderAndBottomColor,
                    },
                }} />

        </Stack.Navigator>
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

            <Stack.Screen name={Screens.TAB}
                component={Tabs}
                options={{ headerMode: 'none', headerShown: false }} />

        </Stack.Navigator>
    );
}

class HhsNavigator extends Component {

    state ={
        currentPage: '',
    }

    changePageName =(name)=> this.setState({
        currentPage: name
    });
    
    render() {
        I18n.locale = this.props.userLanguage;
        return (
            <>
                <StatusBar
                    barStyle="dark-content" translucent={true} />
                <HhsAppStartProcess pageName={this.state.currentPage}/>
                <NavigationContainer
                    onStateChange={() => this.changePageName(navigationRef.current.getCurrentRoute().name)}
                    ref={navigationRef}>
                    <MyStack />
                    {/* <Tabs /> */}
                </NavigationContainer>
                <AppLevelSpinner />

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLanguage: state.login?.language,
    }
}

export default connect(mapStateToProps)(HhsNavigator)