import React, { useState, useRef } from "react";
import { Alert, View, Image, TouchableOpacity, Text, ImageBackground, StyleSheet } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import InitNativeEvents from "../../events/NativeEvents";

const ValidateCredentials = (props) => {
    InitNativeEvents(props);
    const ref_PinInput = useRef(null);
    const ref_PasswordInput = useRef(null);
    const [pin, setPin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginWithPIN, setIsLoginWithPIN] = useState(true);
    const { pinChange } = useSelector((state) => state.pinReducer);
    const { passwordChange } = useSelector((state) => state.passwordReducer);

    const checkCredentials = () => {
        if (isLoginWithPIN) {
            if (pin === pinChange) {
                setPin('');
                props.navigation.replace("ChangeCredentials", { isLoginWithPIN })
            } else {
                setPin('');
                Alert.alert("WRONG Credentials!!!", "Please enter valid PIN");
            }
        } else {
            if (password === passwordChange) {
                setPassword('');
                props.navigation.replace("ChangeCredentials", { isLoginWithPIN })
            } else {
                setPassword('');
                Alert.alert("WRONG Credentials!!!", "Please enter valid Password");
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
                    Enter {isLoginWithPIN ? "Application" : "Android"} Your Pin
                </Text>
                <View style={styles.cenTop}>
                    {isLoginWithPIN ? (
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
                        />
                    ) : (
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
                    )};
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={checkCredentials}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
                        -&gt;
                    </Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.txtLoginWith}
                onPress={() => setIsLoginWithPIN(!isLoginWithPIN)}
            >
                Change {isLoginWithPIN ? "Android" : "Application"} PIN
            </Text>
        </View>
    );
};

export default ValidateCredentials;
