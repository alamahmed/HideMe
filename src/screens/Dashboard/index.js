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
import { launchCamera } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../assets/images";
import { addImageToGallery } from "../../redux/slices/gallerySlice";
import { normalized } from "../../utils/constants";
import moment from "moment";

const Dashboard = (props) => {
  const { galleryImages } = useSelector((state) => state.galleryReducer); // getting the gallery
  const dispatch = useDispatch(); // will use dispatch to call actions
  // console.log("gallery", galleryImages);
  const onImageClick = () => {
    launchCamera({ mediaType: "photo", quality: 1 })
      .then((res) => {
        if (res.assets) {
          dispatch(addImageToGallery(res.assets[0].uri));
          console.log(JSON.stringify(res, 2, 4));
        }
      })
      .catch((error) => console.log("ERROR launchCamera", error));
  };
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const date = moment(new Date()).format("ddd, MMM Do, YYYY");
  return (
    <>
      <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          marginVertical: normalized.hp("3%"),
        }}
      >
        <View>
          <View
            style={{
              height: normalized.hp("12%"),
              width: normalized.wp("55%"),
              backgroundColor: "rgba(0,0,0,0.7)",
              left: normalized.hp("3%"),
              borderTopRightRadius: 60,
              borderBottomLeftRadius: 60,
              borderRadius: 20,
              justifyContent: "space-between",
              // alignSelf: "center",
              padding: normalized.hp("3%"),
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: normalized.wp("1%") }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 25 }}>
                  {`${displayHours}:${minutes} `}
                </Text>

                <Text style={{ color: "white", fontSize: 15 }}>
                  {`${ampm}`}
                </Text>
              </View>
              <Text style={{ color: "white", fontSize: 15 }}>{date}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              width: normalized.wp("100%"),
              alignSelf: "center",
            }}
            onPress={() => Linking.openURL("https://www.google.com")}
          >
            <Image
              source={images.google}
              style={{
                width: normalized.wp("95%"),
                height: normalized.wp("20%"),
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // flexWrap: "wrap",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  padding: normalized.wp("1%"),
                  paddingVertical: normalized.hp("1%"),
                  alignItems: "center",
                  width: normalized.wp("15%"),
                  marginLeft: normalized.wp("5%"),
                }}
                onPress={() => {
                  props?.navigation?.navigate("Gallery");
                }}
              >
                <Image
                  source={images.gallery1}
                  style={{
                    width: normalized.wp("10%"),
                    height: normalized.wp("10%"),
                    borderRadius: 20,
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  padding: normalized.wp("1%"),
                  paddingVertical: normalized.hp("1%"),
                  alignItems: "center",
                  width: normalized.wp("15%"),
                  marginLeft: normalized.wp("2%"),
                }}
                onPress={() => {
                  props?.navigation?.navigate("Setting");
                }}
              >
                <Image
                  source={images.setting}
                  style={{
                    width: normalized.wp("11%"),
                    height: normalized.wp("11%"),
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>

            {/* <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                marginTop: normalized.hp("1%"),
              }}
            >
              Gallery
            </Text> */}

            {/* <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                marginTop: normalized.hp("1%"),
              }}
            >
              Gallery
            </Text> */}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: normalized.hp("3%"),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // flexWrap: "wrap",
          }}
        >
          <TouchableOpacity
            style={{
              // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              alignItems: "center",
              width: normalized.wp("15%"),
              marginLeft: normalized.wp("2%"),
            }}
            onPress={
              () => Linking.openURL("tel:")
              // "https://wa.me/?text=Welcome%20to%20my%20chat"
              // "https://fb://"
              // `whatsapp://send?phone=03048700192&text=${"Hi Message from RN App"}`
            }
          >
            <Image
              source={images.phone}
              style={{
                width: normalized.wp("10%"),
                height: normalized.wp("10%"),
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              alignItems: "center",
              width: normalized.wp("15%"),
            }}
            onPress={onImageClick}
          >
            <Image
              source={images.camera}
              style={{
                width: normalized.wp("12%"),
                height: normalized.wp("12%"),
              }}
              resizeMode="center"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              alignItems: "center",
              width: normalized.wp("15%"),
              marginLeft: normalized.wp("2%"),
            }}
            onPress={() => {
              if (Linking.canOpenURL("whatsapp://send")) {
                Linking.openURL(
                  "whatsapp://send?text=Welcome%20to%20my%20chat&app=whatsapp"
                );
              } else {
                alert("WhatsApp is not installed on your device.");
              }
            }}
          >
            <Image
              source={images.whatsapp}
              style={{
                width: normalized.wp("10%"),
                height: normalized.wp("10%"),
              }}
              resizeMode="center"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              // backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              alignItems: "center",
              width: normalized.wp("15%"),
              marginLeft: normalized.wp("2%"),
            }}
            onPress={() =>
              Linking.openURL(
                // "https://wa.me/?text=Welcome%20to%20my%20chat"
                "fb://page/"
                // `whatsapp://send?phone=03048700192&text=${"Hi Message from RN App"}`
              )
            }
          >
            <Image
              source={images.facebook}
              style={{
                width: normalized.wp("10%"),
                height: normalized.wp("10%"),
              }}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Dashboard;
