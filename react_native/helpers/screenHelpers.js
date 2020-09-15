// import { StackActions } from '@react-navigation/native';

export const Screens = {
    CALENDAR_SCREEN: 'CALENDAR_SCREEN',
    ACTIVITY_SCREEN: 'ACTIVITY_SCREEN',
    MORE_SCREEN: 'MORE_SCREEN',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    TAB: 'TAB',
    DETAIL_SCREEN: 'DETAIL_SCREEN',
    ACTIVITY_DETAIL_SCREEN: 'ACTIVITY_DETAIL_SCREEN',
    CALENDAR_AND_DETAIL: 'CALENDAR_AND_DETAIL',
    ACTIVITY_AND_DETAIL: 'ACTIVITY_AND_DETAIL'
};

export const resetScreen = (navigation, screenName) => {
    navigation.reset({
        index: 0,
        routes: [{ name: screenName }],
    });
};

export const replaceScreen = (navigation, screenName) => {
    navigation.replace(screenName);
};
