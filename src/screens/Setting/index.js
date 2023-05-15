import React, { useState, useRef, useEffect } from "react";
import {
    Alert,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Text,
    ImageBackground,
    StyleSheet,
    Switch,
    NativeModules,
    Button,
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
// import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import { normalized } from "../../utils/constants";

const { LockNativeModule } = NativeModules;

const Setting = (props) => {

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        LockNativeModule.isActivateInstance(
            isActivated => {
                setIsEnabled(isActivated)
            },
        );
    }, [])


    const toggleSwitch = () => {
        if (!isEnabled) {
            LockNativeModule.activateInstance()
        } else {
            LockNativeModule.deactivateInstance()
        }
        setIsEnabled(previousState => !previousState);
    }

    return (
        <View
            style={{
                backgroundColor: "#141414",
                height: normalized.hp("100%"),
            }}
        >
            <View
                style={{
                    padding: normalized.hp("2%"),
                    backgroundColor: "#3d3d3d"
                }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 17
                }}>
                    Settings
                </Text>
            </View>

            <View
                style={{
                    padding: normalized.hp("2%"),
                    paddingTop: normalized.hp("2.5%"),
                    paddingBottom: normalized.hp("2.5%"),
                    borderBottomWidth: 1,
                    borderBottomColor: "#3d3d3d",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        color: "#ccc",
                    }}>Open On UnLock</Text>

                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <TouchableHighlight onPress={() =>
                props.navigation.replace("ValidateCredentials")
            }>
                <View
                    style={{
                        padding: normalized.hp("2%"),
                        paddingTop: normalized.hp("2.5%"),
                        paddingBottom: normalized.hp("2.5%"),
                        borderBottomWidth: 1,
                        borderBottomColor: "#3d3d3d",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                        }}>Change Pin</Text>
                </View>
            </TouchableHighlight>
        </View >
    );
};

export default Setting;
