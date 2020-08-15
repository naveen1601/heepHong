import React from 'react';

import {
    Image,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import LoginScreen from '../containers/loginScreen/LoginScreen'
import { Screens, resetScreen } from '../helpers/screenHelpers';

//user FontAwesome, locked Fontisto

const Stack = createStackNavigator();

function CalendarScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cal</Text>
        </View>
    );
}

function NotificationScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoginScreen />
        </View>
    );
}


function MoreScreen() {
    const vwuri = 'https://www.ndtv.com/';
    function LoadingIndicatorView() {
        return (
            <ActivityIndicator color='#f59042' size='large' style={styles.ActivityIndicatorStyle} >

            </ActivityIndicator>
        )
    }
    return (
        <WebView
            source={{
                uri: vwuri,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            sharedCookiesEnabled={true}
            originWhitelist={["*"]}
            scalesPageToFit={true}
            startInLoadingState={true}
            mixedContentMode={"always"}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
            allowsBackForwardNavigationGestures={true}
            allowsLinkPreview={false}
            renderLoading={LoadingIndicatorView}
        />
    );
}

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
                                iconName={"calendar"} />
                        ),
                        tabBarLabel: 'Calendar',
                        color: '#f59042'
                    }
                }}
            />
            <BottomTabs.Screen name={Screens.NOTIFICATION_SCREEN}
                component={NotificationScreen}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderIonIcons navigation={navigation}
                                iconName={"md-notifications-outline"} />
                        ),
                        tabBarLabel: 'Notification',
                        color: '#f59042'
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
                        tabBarLabel: 'More',
                        color: '#f59042'
                    }
                }
                } />
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
        </Stack.Navigator>
    );
}


{/* <BottomTabs.Screen name={"Home"} 
            component={CalendarScreen}
            options={{
                tabBarIcon: (tabInfo) => (
                  <MaterialIcons name="home" size={18} color={tabInfo.tintColor} />
                ),
              }} 
            /> */}

export default HhsNavigator = () => {
    return (
        <>
            <StatusBar
                barStyle="dark-content" />
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'space-evenly'
    }
})
