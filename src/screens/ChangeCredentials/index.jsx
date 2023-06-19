import React, { useState, useRef } from "react";
import {
    Alert,
    View,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    StyleSheet,
    NativeModules,
} from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { images } from "../../assets/images";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/password";
import { changePin } from "../../redux/slices/pin";
import InitNativeEvents from "../../events/NativeEvents";


const ChangeCredentials = (props) => {
    InitNativeEvents(props)
    const { LockNativeModule } = NativeModules;
    const { isLoginWithPIN } = props.route.params;
    const ref_PinInput = useRef(null);
    const ref_PasswordInput = useRef(null);
    const [pin, setPin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onPressLogin = () => {
        if (isLoginWithPIN) {
            if (pin !== "") {
                dispatch(changePin(pin));
                LockNativeModule.SetPin(pin, isLoginWithPIN)
                setPin('');
                props.navigation.replace("Setting");
            }
            else {
                setPin('');
                Alert.alert("Please enter a valid Pin");
            }
        } else {
            if (password !== "") {
                setPassword('');
                LockNativeModule.SetPin(password, isLoginWithPIN)
                dispatch(changePassword(password));
                props.navigation.replace("Setting");
            }
            else {
                setPassword('');
                Alert.alert("Please enter a valid Password");
            }
        }
    };

    const handleBackButton = () => {
        props.navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
            <View style={styles.centeredView}>
                <View
                    style={{
                        padding: 20,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={handleBackButton}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
                        Back
                    </Text>
                </View>
                <Image
                    source={images.loginPass}
                    style={styles.loginImg}
                    resizeMode="center"
                />
                <Text style={styles.headline}>
                    Enter new {isLoginWithPIN ? "Application" : "Android"} PIN here
                </Text>
                <View style={styles.cenTop}>
                    {isLoginWithPIN ?
                        <SmoothPinCodeInput
                            ref={ref_PinInput}
                            placeholder={<View style={styles.pinPlaceholder} />}
                            mask={<View style={styles.pinMask} />}
                            maskDelay={1000}
                            password={true}
                            cellStyle={styles.cellStyle}
                            cellStyleFocused={styles.cellStyleFocused}
                            cellSpacing={10}
                            value={pin}
                            onTextChange={(code) => setPin(code)}
                        /> :
                        <SmoothPinCodeInput
                            ref={ref_PasswordInput}
                            placeholder={<View style={styles.pinPlaceholder} />}
                            mask={<View style={styles.pinMask} />}
                            maskDelay={1000}
                            password={true}
                            cellStyle={styles.cellStyle}
                            cellStyleFocused={styles.cellStyleFocused}
                            cellSpacing={10}
                            value={password}
                            onTextChange={(val) => setPassword(val)}
                        />
                    }
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={() => onPressLogin()}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
                        Update {isLoginWithPIN ? "Application" : "Android"} PIN
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChangeCredentials;