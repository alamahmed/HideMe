import { StyleSheet } from "react-native";
import { AppColors, normalized } from "../../utils/constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: normalized.hp("60%"),
    width: normalized.wp("80%"),
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    justifyContent: "center",
  },
  loginImg: {
    width: normalized.wp("25%"),
    height: normalized.wp("25%"),
    alignSelf: "center",
  },
  cenTop: { alignItems: "center", marginTop: normalized.hp("1%") },
  pinPlaceholder: {
    width: 10,
    height: 10,
    borderRadius: 25,
    opacity: 0.3,
    backgroundColor: "white",
  },
  pinMask: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: "white",
  },
  cellStyle: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
  },
  cellStyleFocused: {
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 6,
  },
  inputPass: {
    width: "60%",
    marginTop: normalized.hp("2%"),
    height: normalized.hp("7%"),
    padding: normalized.hp("1%"),
    // backgroundColor: AppColors.white.white,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    color: AppColors.white.white,
    borderWidth: 1,
    borderColor: "#fff",
  },
  txtLoginWith: {
    marginVertical: normalized.hp("2%"),
    alignSelf: "flex-end",
    marginRight: "5%",
    fontWeight: "600",
    fontSize: 14,
    color: "#fff",
  },
  btnLogin: {
    backgroundColor: AppColors.white.white,
    padding: normalized.hp("1%"),
    paddingHorizontal: normalized.wp("6%"),
    marginTop: normalized.hp("2%"),
    borderRadius: 20,
    alignSelf: "center",
    ...AppColors.shadow,
  },
});

export default styles;
