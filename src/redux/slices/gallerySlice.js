import { createSlice } from "@reduxjs/toolkit";

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleryImages: [],
  },
  reducers: {
    addImageToGallery: (state, action) => {
      return {
        galleryImages: [...state.galleryImages, action.payload],
      };
    },
  },
});

export const { addImageToGallery } = gallerySlice.actions;
export const selectGallery = (state) => state.galleryReducer.galleryImages;

export default gallerySlice.reducer;
