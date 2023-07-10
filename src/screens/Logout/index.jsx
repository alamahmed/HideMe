import React, { useState, useRef } from "react";
import {
    Alert,
    View,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    StyleSheet,
    BackHandler,
} from "react-native";
import NavigationBtn from "../../components/NavigationBtn";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { normalized } from "../../utils/constants";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";


const Logout = (props) => {
    const ref_PinInput = useRef(null);
    const [password, setPassword] = useState("");
    const { passwordChange } = useSelector((state) => state.passwordReducer); // getting the pin

    const checkCredentials = () => {
        if (password === passwordChange) {
            setPassword('');
            BackHandler.exitApp();
            // props.navigation.replace("Dashboard");
        } else {
            setPassword('');
            Alert.alert("WRONG Credentials!!!", "Please enter valid PIN");
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
                            paddingLeft: 20,
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
            <NavigationBtn props={props} />
        </>
    );
}

export default Logout;