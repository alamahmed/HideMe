import React, { useState, useRef } from "react";
import {
    Alert,
    View,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    StyleSheet,
    BackHandler
} from "react-native";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import InitNativeEvents from "../../events/NativeEvents";


const Logout = (props) => {
    InitNativeEvents(props)
    const ref_PinInput = useRef(null);
    const [password, setPassword] = useState("");
    const { passwordChange } = useSelector((state) => state.passwordReducer); // getting the pin

    useEffect(() => {
        const backHandler = () => {
            return true; // Prevent default back button behavior
        };

        const backHandlerSubscription = props.navigation.addListener('beforeRemove', (e) => {
            // Prevent default back navigation if the user hasn't entered the correct PIN
            if (pin !== pinChange) {
                e.preventDefault();
                Alert.alert("Warning", "Please enter the correct PIN to logout.");
            }
        });

        return () => {
            backHandlerSubscription();
        };
    }, [pin, pinChange, props.navigation]);


    const checkCredentials = () => {
        console.log(passwordChange, "passwordChange");
        console.log(password, "password that I entered");
        if (password === passwordChange) {
            BackHandler.exitApp();
            setPassword('');
            // props.navigation.replace("Dashboard");
        } else {
            setPassword('');
            Alert.alert("WRONG Credentials!!!", "Please enter valid PIN");
        }
    };
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
                <View style={styles.centeredView}>
                    <Image
                        source={images.loginPass}
                        style={styles.loginImg}
                        resizeMode="center"
                    />
                    <Text style={styles.headline}>
                        Enter your Android PIN Here
                    </Text>
                    <View style={styles.cenTop}>
                        <SmoothPinCodeInput
                            ref={ref_PinInput}
                            placeholder={<View style={styles.pinPlaceholder} />}
                            mask={<View style={styles.pinMask} />}
                            maskDelay={1000}
                            password={true}
                            cellStyle={styles.cellStyle}
                            cellStyleFocused={styles.cellStyleFocused}
                            cellSpacing={10}
                            value={password}
                            onTextChange={(code) => setPassword(code)}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => checkCredentials()}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
                            LogOut
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    );
}

export default Logout;