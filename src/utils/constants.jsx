import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

export const AppColors = {
  primaryColor: {
    dark: "#FA581D",
    light: "#FA9772",
  },
  primaryColor2: {
    dark: "#3F6161",
    light: "#8AA6A6",
  },
  icon: {
    user: "#8E8E93",
    group: "#8E8E93",
  },
  grey: {
    light: "#C4C4C4",
    light2: "#F3F3F3",
    light3: "#F5F6F0",
    light4: "#F2F2F7",
    light5: "#EEEEEE",
    placeholderLight: "#c8c8c8",
    lightOp: "#FAFAFA",
    dark: "#6D6E72",
    dark2: "#787878",
    border: "#E5E5EA",
    lable: "#636366",
  },

  shadowColor: {
    lightBlack: "rgba(0,0,0,0.55)",
    darkBlack: "rgba(0,0,0,1)",
    lightBlack2: "rgba(0,0,0,0.3)",
  },

  yellow: {
    dark: "#FFCD00",
  },

  white: {
    whiteOP: "rgba(255,255,255,0.65)",
    white: "#ffffff",
    lightWhite: "#FFFFF1",
    creamy: "#FFF9D5",
  },
  black: {
    black: "#000000",
    lightBlack: "rgba(0,0,0,0.32)",
    withShadowLight:
      Platform.OS == "ios" ? "rgba(0,0,0,0.16)" : "rgba(0,0,0,0.26)",
    textColor: "#414141",
    textDark: "#333333",
    lightOP: "rgba(0,0,0,0.75)",
    notificationBlack: "#48484A",
    labelBlack: "#636366",
  },
  green: {
    dark: "#00870D",
    greenOp: "rgba(0,135,13,0.10)",
  },
  red: {
    redOp: "rgba(243,17,17,0.10)",
    red: "rgba(243,17,17,1)",
    darkRed: "#F31111",
  },
  Gradient: {
    light: "#FCE0CA",
    dark: "#FAD0C4",
    medium: "#FEEECF",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
};
export const normalized = { hp, wp };
export const vectorIcon = {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
  Fontisto,
};
