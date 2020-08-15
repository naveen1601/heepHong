// import { StackActions } from '@react-navigation/native';

export const Screens = {
    CALENDAR_SCREEN: 'CALENDAR_SCREEN',
    NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
    MORE_SCREEN: 'MORE_SCREEN',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    TAB: 'TAB'
};

export const resetScreen = (navigation,screenName) => {
    navigation.reset({
    routes: [{ name: screenName }],
  });
};

export const replaceScreen = (navigation,screenName) => {
    navigation.replace(screenName);
};
