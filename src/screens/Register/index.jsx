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
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import styles from "./styles";
import { images } from "../../assets/images";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/password";
import { changePin } from "../../redux/slices/pin";
import InitNativeEvents from "../../events/NativeEvents";

const Register = (props) => {
  InitNativeEvents(props)
  const ref_PinInput = useRef(null);
  const ref_PasswordInput = useRef(null);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const { LockNativeModule } = NativeModules;
  const dispatch = useDispatch();

  const onPressLogin = () => {
    if (password !== "" && pin !== "") {
      dispatch(changePin(pin));
      dispatch(changePassword(password));
      LockNativeModule.setBothPin(password, pin);
      props.navigation.replace("Dashboard");
    } else {
      Alert.alert("Please enter valid Password and Pin");
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

        <View style={styles.cenTop}>
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
          <View style={{ marginVertical: 10 }} />
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
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={onPressLogin}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
            Set Password and Pin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
