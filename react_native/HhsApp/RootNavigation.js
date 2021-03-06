import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(screenName){
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name: screenName }],
    });
}

export function getNavigation(){
  return navigationRef.current;
}