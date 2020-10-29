import React, { useEffect } from 'react';
// import ComponentsDemoPage from './ComponentsDemoPage';
import { getConfiguredStore, getConfiguredPersistorStore } from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
// import SplashScreen from 'react-native-splash-screen';
import HhsNavigator from './HhsApp/HhsNavigator';
import LoginScreen from './containers/loginScreen/LoginScreen'
import PushController from './HhsApp/PushController';
// import { View } from 'react-native';
// import { Platform } from 'react-native';
const persistor = getConfiguredPersistorStore();
const store = getConfiguredStore();


const HhsApp = () => {

  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  console.disableYellowBox = true;


  return (
    <>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <HhsNavigator />
          <PushController />
          {/* {Platform.OS == 'android' &&
            <PushController />} */}
          {/* <LoginScreen/> */}
        </PersistGate>
      </Provider>

    </>
  );

};

export default HhsApp;