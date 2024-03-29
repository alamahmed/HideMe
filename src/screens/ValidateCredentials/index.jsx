import React, { useState, useRef } from "react";
import { Alert, View, Image, TouchableOpacity, Text, ImageBackground, StyleSheet } from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { normalized } from "../../utils/constants";
import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import NavigationBtn from "../../components/NavigationBtn";
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


    const handleBackButton = () => {
        props.navigation.goBack();
    };

    return (
        <>
            <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: normalized.hp("3%"),
                }}
            >
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
                        )}
                    </View>
                    <Text
                        style={styles.txtLoginWith}
                        onPress={() => setIsLoginWithPIN(!isLoginWithPIN)}
                    >
                        Change {isLoginWithPIN ? "Android" : "Application"} PIN
                    </Text>
                    <TouchableOpacity style={styles.btnLogin} onPress={checkCredentials}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
                            -&gt;
                        </Text>
                    </TouchableOpacity>

                </View>
            </View >
            <NavigationBtn props={props} />
        </>
    );
};

export default ValidateCredentials;
