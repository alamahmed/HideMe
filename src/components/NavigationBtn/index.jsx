import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    StyleSheet,
    Linking,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const NavigationBtn = (props) => {

    const onBackPress = () => {
        console.log(props.props.navigation, "props");
        props.props.navigation.goBack();
    }
    const onHomePress = () => {
        props.props.navigation.navigate("Dashboard");
    }

    return (
        <View style={[flex = "1"]}>
            <View
                style={{
                    flexDirection: "row",
                    alignContent: "center",
                    marginBottom: 20,
                }}>
                <View
                    style={{
                        width: "50%",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={onBackPress}>
                        <FontAwesomeIcon icon={faArrowLeft} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "50%",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={onHomePress}>
                        <FontAwesomeIcon icon={faSquare} size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

export default NavigationBtn;