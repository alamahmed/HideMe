import React, { useState, useRef, useEffect, useDebugValue } from "react";
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
import styles from "./styles";
import { images } from "../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/password";
import { changePin } from "../../redux/slices/pin";
import InitNativeEvents from "../../events/NativeEvents";

const Register = (props) => {
  InitNativeEvents(props)
  const ref_PinInput = useRef(null);
  const [isLoginWithPIN, setIsLoginWithPIN] = useState(true);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const onPressLogin = () => {
    if (password !== "" && pin !== "") {
      dispatch(changePin(pin));
      dispatch(changePassword(password));
      props.navigation.replace("Dashboard");
    } else {
      Alert.alert("Please enter valid Password and Pin");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
      {/* <Image
        source={require("../../assets/images/HideMe.png")}
        style={{ ...styles.loginImg, borderRadius: 10 }}
        resizeMode="cover"
      />
      <View style={styles.cenTop} /> */}

      <View style={styles.centeredView}>
        <Image
          source={images.loginPass}
          style={styles.loginImg}
          resizeMode="center"
        />
        {/* <View style={styles.btnLogin}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000000" }}>
            Set Password and Pin
          </Text>
        </View> */}

        <View style={styles.cenTop}>
          <TextInput
            secureTextEntry
            placeholder="Enter Password"
            placeholderTextColor={"#fff"}
            style={styles.inputPass}
            value={password}
            onChangeText={(val) => setPassword(val)}
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
