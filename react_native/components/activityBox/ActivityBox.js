import React, { Component } from 'react';
import { View } from 'react-native';
import Text from '../../baseComponents/text/Text';

class ActivityBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View>
                <View>
                    <Text>Date</Text>
                </View>
                <View>
                    <Text>Activity/ Notice</Text>
                    <Text>Time</Text>
                </View>
                <View>
                    <Text>Event Reminder</Text>
                    <Text>Time</Text>
                </View>
            </View>
        );
    }
}

export default ActivityBox;