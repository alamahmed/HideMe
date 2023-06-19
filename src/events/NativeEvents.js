import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native'

export const navigationRef = createNavigationContainerRef()

const InitNativeEvents = (props) => {

    // const navigation = useNavigation();

    DeviceEventEmitter.addListener('triggerUnlock', (data) => {
        // console.log("working");
        props.navigation.replace("Dashboard")
    });

}
export default InitNativeEvents;

