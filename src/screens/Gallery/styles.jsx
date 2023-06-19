import { StyleSheet } from "react-native";
import { AppColors, normalized } from "../../utils/constants";

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: AppColors.white.white,
    flex: 1,
    paddingBottom: normalized.hp("7%"),
  },
  setView: {
    flex: 1,
    width: normalized.wp("95%"),
    alignSelf: "center",
  },
  container: { width: "48%", marginVertical: normalized.hp("1%") },
  imgContainer: {
    width: "100%",
    height: normalized.hp("18%"),
    backgroundColor: "#BEF0A8",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalized.wp("1.5%"),
  },
  txtSurvey: {
    color: AppColors.black.black,
    fontSize: 13,
    fontWeight: "600",
    width: "70%",
  },
  txtStaus: { fontSize: 11, fontWeight: "600" },
  txtNoData: {
    color: AppColors.black.black,
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
