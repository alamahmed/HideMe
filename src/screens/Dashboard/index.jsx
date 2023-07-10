import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Linking,
  BackHandler,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { images } from "../../assets/images";
import NavigationBtn from "../../components/NavigationBtn/index"
import { addImageToGallery } from "../../redux/slices/gallerySlice";
import { normalized } from "../../utils/constants";
import moment from "moment";

const Dashboard = (props) => {
  const dispatch = useDispatch(); // will use dispatch to call actions
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
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
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
          <TouchableOpacity
            style={{
              height: normalized.hp("12%"),
              width: normalized.wp("55%"),
              backgroundColor: "rgba(0,0,0,0.7)",
              left: normalized.hp("3%"),
              borderTopRightRadius: 60,
              borderBottomLeftRadius: 60,
              borderRadius: 20,
              justifyContent: "space-between",
              padding: normalized.hp("3%"),
              alignItems: "center",
            }}
            onPress={() => {
              setCount(count + 1);
              console.log(count);
              if (count == 10) {
                setCount(1);
                props?.navigation?.navigate("Setting");
              }
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
          </TouchableOpacity>
          {/* Google */}
          <TouchableOpacity
            style={{
              borderRadius: 10,
              padding: normalized.wp("1%"),
              paddingVertical: normalized.hp("1%"),
              width: normalized.wp("100%"),
              alignSelf: "center",
            }}
            onPress={() => {
              BackHandler.removeEventListener();

              console.log("ali");
              BackHandler.exitApp();
              console.log("ali1");

              console.log("ali2");

              Linking.openURL("https://www.google.com");
            }}
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
            }}
          >
            {/* Top Buttons */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Gallery Button */}
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

              {/* Settings Button */}
              <View
                style={{
                  borderRadius: 10,
                  padding: normalized.wp("1%"),
                  paddingVertical: normalized.hp("1%"),
                  alignItems: "center",
                  width: normalized.wp("15%"),
                  marginLeft: normalized.wp("2%"),
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
              </View>

              {/* Maps Button */}
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
                  BackHandler.removeEventListener();

                  console.log("ali");
                  BackHandler.exitApp();
                  console.log("ali1");

                  console.log("ali2");

                  Linking.openURL("google.navigation:");
                }}
              >
                <Image
                  source={images.maps}
                  style={{
                    width: normalized.wp("11%"),
                    height: normalized.wp("11%"),
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity>

              {/* Chrome Button */}
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
                  BackHandler.removeEventListener();

                  console.log("ali");
                  BackHandler.exitApp();
                  console.log("ali1");

                  console.log("ali2");

                  Linking.openURL("https://www.google.com");

                }}
              >
                <Image
                  source={images.chrome}
                  style={{
                    width: normalized.wp("11%"),
                    height: normalized.wp("11%"),
                  }}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Bottom Buttons */}
        <View
          style={{
            marginHorizontal: normalized.hp("3%"),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* PhoneBook Button */}
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
              BackHandler.removeEventListener();

              console.log("ali");
              BackHandler.exitApp();
              console.log("ali1");

              console.log("ali2");


              Linking.openURL("tel:");
            }}
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
          {/* Camera Button */}
          <TouchableOpacity
            style={{
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
          {/* Whatsapp Button */}
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
              if (Linking.canOpenURL("whatsapp://send")) {
                BackHandler.removeEventListener();

                console.log("ali");
                BackHandler.exitApp();
                console.log("ali1");

                console.log("ali2");

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
          {/* Facebook Button */}
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
              BackHandler.removeEventListener();

              console.log("ali");
              BackHandler.exitApp();
              console.log("ali1");

              console.log("ali2");

              Linking.openURL("fb://page/");
            }}
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
      <NavigationBtn props={props} />
    </>
  );
};

export default Dashboard;