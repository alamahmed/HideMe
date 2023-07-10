import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { normalized } from "../../utils/constants";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Switch,
  NativeModules,
} from "react-native";
import NavigationBtn from "../../components/NavigationBtn";
const { LockNativeModule } = NativeModules;

const Setting = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    LockNativeModule.isActivateInstance((isActivated) => {
      setIsEnabled(isActivated);
    });
  }, []);

  const toggleSwitch = () => {
    if (!isEnabled) {
      LockNativeModule.activateInstance();
    } else {
      LockNativeModule.deactivateInstance();
    }
    setIsEnabled((previousState) => !previousState);
  };

  const handleBackButton = () => {
    console.log("Back Btn Pressed");
    props.navigation.goBack();
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "#141414",
          height: normalized.hp("100%"),
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: "#3d3d3d",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleBackButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
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
          <Text style={{ color: "#fff" }}>
            Open App On UnLock
          </Text>

          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#3580ff" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableHighlight
          onPress={() => props.navigation.replace("ValidateCredentials")}
        >
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
              }}
            >
              Change Pin
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => props.navigation.replace("Logout")}
        >
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
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableHighlight>
      </View >
      <NavigationBtn props={props} />
    </>
  );
};

export default Setting;
