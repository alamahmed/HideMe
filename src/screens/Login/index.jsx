import React, { useState, useRef, useEffect } from "react";
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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import NavigationBtn from "../../components/NavigationBtn";
import styles from "./styles";
import { normalized } from "../../utils/constants";
import { images } from "../../assets/images";
import { useSelector } from "react-redux";
import InitNativeEvents from "../../events/NativeEvents";

const Login = (props) => {
  InitNativeEvents(props)
  const ref_PinInput = useRef(null);
  const ref_PasswordInput = useRef(null);
  const [isLoginWithPIN, setIsLoginWithPIN] = useState(true);
  const { pinChange } = useSelector((state) => state.pinReducer); // getting the pin
  const { passwordChange } = useSelector((state) => state.passwordReducer); // getting the gallery
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const onPressLogin = () => {
    if (isLoginWithPIN) {
      pin === pinChange
        ? props.navigation.replace("Dashboard")
        : ref_PinInput.current.shake().then(() => {
          setPin("");
          Alert.alert("WRONG Credentials!!!", "Please enter valid PIN");
        });
    } else {
      password === passwordChange
        ? props.navigation.replace("Dashboard")
        : Alert.alert("WRONG Credentials!!!", "Please enter valid Password");
    }
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
          <Image
            source={images.loginPass}
            style={styles.loginImg}
            resizeMode="center"
          />
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
            Login with {isLoginWithPIN ? "Android" : "Application"} PIN
          </Text>
          <TouchableOpacity style={styles.btnLogin} onPress={onPressLogin}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View >
      <NavigationBtn props={props} />
    </>
  );
};

export default Login;
