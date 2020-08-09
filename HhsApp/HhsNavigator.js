import React from 'react';

import {
    Image,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';



function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Cal</Text>
        </View>
    );
}

function NotificationScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}


function MoreScreen () {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    );
  }

function RenderAntIcon(props) {
    
    let customColor = props.navigation.focused?'#f59042': '#8E8E8F';
    return (
        <AntIcon name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderIonIcons(props) {
    
    let customColor = props.navigation.focused?'#f59042': '#8E8E8F';
    return (
        <IonIcons name={props.iconName}
            style={{ color: customColor }}
            size={30} />
    );
}

function RenderFeatherIcons(props) {
    
    let customColor = props.navigation.focused?'#f59042': '#8E8E8F';
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
            <BottomTabs.Screen name={"Calendar"}
                component={HomeScreen}
                options={({ navigation }) => {
                    return {
                        tabBarIcon: (navigation) => (
                            <RenderAntIcon navigation={navigation}
                            iconName={"calendar"}/>
                        ),
                        tabBarLabel: 'Calendar',
                        color: '#f59042'
                    }
                }
                }
            // options={{
            //     tabBarIcon: () => (
            //         <RenderAntIcon />
            //     ),
            //     tabBarLabel: 'Calendar',
            //     color: '#f59042'
            // }}
            />
            <BottomTabs.Screen name="Notification" 
            component={NotificationScreen} 
            options={({ navigation }) => {
                return {
                    tabBarIcon: (navigation) => (
                        <RenderIonIcons navigation={navigation}
                        iconName={"md-notifications-outline"}/>
                    ),
                    tabBarLabel: 'Notification',
                    color: '#f59042'
                }
            }
            }/>

            <BottomTabs.Screen name="More" 
            component={MoreScreen} 
            options={({ navigation }) => {
                return {
                    tabBarIcon: (navigation) => (
                        <RenderFeatherIcons navigation={navigation}
                        iconName={"more-horizontal"}/>
                    ),
                    tabBarLabel: 'More',
                    color: '#f59042'
                }
            }
            }/>
        </BottomTabs.Navigator>
    );
}


{/* <BottomTabs.Screen name={"Home"} 
            component={HomeScreen}
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
                <Tabs />
            </NavigationContainer>
        </>
    );
}