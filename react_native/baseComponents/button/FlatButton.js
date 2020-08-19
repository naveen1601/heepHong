import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import ButtonStyles from './ButtonStyles';

const FlatButton = (props) => {
    const handleOnPress =(text)=> {
        Keyboard.dismiss();
        props.onPress(text);
    };
    const buttonStyle = [styles.flatButton];
    if (props.style) {
        buttonStyle.push(props.style);
    }
    return (
        <TouchableOpacity style={styles.flatButtonWrapper}
            onPress={()=>handleOnPress(props.text)}
            disabled={props.disabled}
            accessibilityTraits="button"
            accessibilityComponentType="button"
            accessibilityLabel={props.text}
            accessible>
            <View testID={props.testID}>
                <Text style={buttonStyle}
                    testID={props.testID}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = create(ButtonStyles);

FlatButton.propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    testID: PropTypes.string,
    text: PropTypes.string
};

export default FlatButton;