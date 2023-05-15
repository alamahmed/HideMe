import React, { useState, useRef } from "react";
import {
    Alert,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    ImageBackground,
    StyleSheet,
} from "react-native";
import styles from "./styles";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { images } from "../../assets/images";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/password";
import { changePin } from "../../redux/slices/pin";
import InitNativeEvents from "../../events/NativeEvents";



const ChangeCredentials = (props) => {
    InitNativeEvents(props)
    const { isLoginWithPIN } = props.route.params || { isLoginWithPIN: true };
    const ref_PinInput = useRef(null);
    const [pin, setPin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const onPressLogin = () => {
        if (isLoginWithPIN) {
            if (pin !== "") {
                dispatch(changePin(pin));
                props.navigation.replace("Setting");
            }
            else {
                Alert.alert("Please enter a valid Pin");
            }
        } else {

            if (password !== "") {
                dispatch(changePassword(password));
                props.navigation.replace("Setting");
            }
            else {
                Alert.alert("Please enter a valid Password");
            }
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
            <View style={styles.centeredView}>
                <Image
                    source={images.loginPass}
                    style={styles.loginImg}
                    resizeMode="center"
                />
                <Text style={styles.headline}>
                    Enter New {isLoginWithPIN ? "PIN" : "Password"} Here
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
                        <TextInput
                            secureTextEntry
                            placeholder="Enter Password"
                            placeholderTextColor={"#fff"}
                            style={styles.inputPass}
                            value={password}
                            onChangeText={(val) => setPassword(val)}
                        />
                    }
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={() => onPressLogin()}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
                        Update {isLoginWithPIN ? "PIN" : "Password"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default ChangeCredentials;