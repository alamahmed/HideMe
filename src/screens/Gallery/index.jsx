import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import ImageView from "react-native-image-viewing";
import NavigationBtn from "../../components/NavigationBtn/index"
import { FlatGrid } from "react-native-super-grid";
import FastImage from "react-native-fast-image";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppColors, vectorIcon } from "../../utils/constants";
import { useSelector } from "react-redux";
import { images } from "../../assets/images";
import { normalized } from "../../utils/constants";

const Gallery = (props) => {
  const { galleryImages } = useSelector((state) => state.galleryReducer); // getting the gallery
  const [showImg, setShowImg] = useState({ visible: false, index: 0 });

  const handleBackButton = () => {
    props.navigation.goBack();
  };


  return (
    <View style={styles.MainView}>
      <ImageBackground source={images.bg2} style={StyleSheet.absoluteFill} />
      <View
        style={{
          padding: 20,
          marginBottom: 30,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleBackButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              marginLeft: 10,
            }}>
            Gallery
          </Text>
        </View>
      </View>

      <View style={styles.setView}>
        <FlatGrid
          itemDimension={normalized.wp("42%")}
          //   spacing={2}
          data={galleryImages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: "#fff",
                }}
                onPress={() => setShowImg({ visible: true, index: index })}
                key={index}
              >
                <View style={styles.imgContainer}>
                  <FastImage
                    style={styles.img}
                    source={{
                      uri: item,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString}
        />
        <ImageView
          images={galleryImages?.map((image, index) => {
            return {
              uri: image,
            };
          })}
          imageIndex={showImg.index}
          visible={showImg.visible}
          animationType="fade"
          doubleTapToZoomEnabled
          onImageIndexChange={(imageIndex) => console.log(imageIndex)}
          onRequestClose={() => setShowImg({ visible: false, index: 0 })}
          HeaderComponent={({ imageIndex }) => (
            //
            <View style={styles.headerBackWrapBtn}>
              <View style={styles.flexRow}>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <TouchableOpacity
                    onPress={() => setShowImg({ visible: false, index: 0 })}
                  >
                    <vectorIcon.AntDesign
                      name="arrowleft"
                      color={AppColors.grey.dark}
                      size={25}
                    />
                  </TouchableOpacity>
                  <View style={{ marginStart: normalized.wp("2%") }}>
                    <Text style={styles.headerTitle}>Gallery</Text>
                    <Text style={{ fontSize: 10, color: "#212121D9" }}>
                      {imageIndex + 1} / {galleryImages?.length} image(s)
                    </Text>
                  </View>
                </View>
                <TouchableOpacity />
              </View>
            </View>
          )}
          FooterComponent={() => (
            <View
              style={{
                height: normalized.wp("10%"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Image
                source={require("../../Assets/arrowUp.gif")}
                style={{
                  height: normalized.wp("5%"),
                  width: normalized.wp("5%"),
                }}
              /> */}

              <Text
                style={{
                  fontWeight: "600",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Swipe Up To Close
              </Text>
            </View>
          )}
          backgroundColor="#fff"
        />
      </View>
      <NavigationBtn props={props} />
    </View >
  );
};

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: AppColors.white.white,
    flex: 1,
    paddingBottom: normalized.wp("7%"),
  },
  setView: {
    flex: 1,
    width: normalized.wp("95%"),
    alignSelf: "center",
  },
  container: { width: "33%", marginVertical: normalized.wp("0.2%") },
  imgContainer: {
    width: "100%",
    height: normalized.hp("25%"),
    alignItems: "center",
  },
  img: { width: "100%", height: "100%", borderRadius: 8 },
  headerBackWrapBtn: {
    backgroundColor: AppColors.green.greenOp,
    padding: normalized.wp("2%"),
    width: normalized.wp("100%"),
    paddingHorizontal: normalized.wp("2.5%"),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#212121D9",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default Gallery;
