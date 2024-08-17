import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Camera, CameraDevice } from "react-native-vision-camera";

export type ThemesProps = "system" | "light" | "dark" | "pureBlack";
export type ThemeProps = {
  label: string;
  value: string;
  icon: string;
};

export const themes: ThemeProps[] = [
  {
    label: "System",
    value: "system",
    icon: "color-wand",
  },
  {
    label: "Light",
    value: "light",
    icon: "sunny",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "cloudy-night",
  },
  {
    label: "Pure Black",
    value: "pureBlack",
    icon: "moon",
  },
];

interface CameraProps {
  device: CameraDevice;
}
interface AppearanceProps {
  theme: ThemeProps;
}

interface SettingsProps {
  appearance: AppearanceProps;
  camera: CameraProps;
}

const device = Camera.getAvailableCameraDevices()[0];

const initialState: SettingsProps = {
  appearance: {
    theme: themes[0],
  },
  camera: {
    device,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setappearance: (
      { appearance },
      { payload }: PayloadAction<AppearanceProps>,
    ) => {
      appearance.theme = payload.theme;
    },
    setcameraDevice: ({ camera }, { payload }: PayloadAction<CameraDevice>) => {
      camera.device = payload;
    },
  },
});

export const { setappearance, setcameraDevice } = settingsSlice.actions;

export default settingsSlice.reducer;
