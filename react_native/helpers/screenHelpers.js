// import { StackActions } from '@react-navigation/native';

export const Screens = {
    CALENDAR_SCREEN: 'CALENDAR_SCREEN',
    ACTIVITY_SCREEN: 'ACTIVITY_SCREEN',
    MORE_SCREEN: 'MORE_SCREEN',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    TAB: 'TAB',
    DETAIL_SCREEN: 'DETAIL_SCREEN'
};

export const resetScreen = (navigation,screenName) => {
    navigation.reset({
    routes: [{ name: screenName }],
  });
};

export const replaceScreen = (navigation,screenName) => {
    navigation.replace(screenName);
};
