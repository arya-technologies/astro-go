import Permissions from "@/components/Permissions";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { RootState } from "@/features/store";
import { useAppState } from "@react-native-community/hooks";
import { useState } from "react";
import { View } from "react-native";
import { Surface, ToggleButton } from "react-native-paper";
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Camera,
  CameraProps,
  useCameraFormat,
  useCameraPermission,
} from "react-native-vision-camera";
import { useSelector } from "react-redux";
import Finder from "@/components/Finder";
import Controls from "@/components/Controls";

type Modes = "finderCam" | "controls";

const AnimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({ zoom: true, exposure: true });

export default function index() {
  const { colors } = useAppTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { hasPermission, requestPermission } = useCameraPermission();
  const { device } = useSelector((state: RootState) => state.settings.camera);
  const format = useCameraFormat(device, [{ photoAspectRatio: 1 / 1 }]);

  const [mode, setmode] = useState<Modes>("controls");

  const appState = useAppState();
  const isActive = appState === "active";

  const [exposureSliderValue, setexposureSliderValue] = useState<number>(50);
  const exposure = useDerivedValue(() => {
    if (device === null) return 0;
    return interpolate(
      exposureSliderValue,
      [0, 100],
      [device.minExposure, device.maxExposure],
    );
  }, [exposureSliderValue, device]);

  const [zoomSliderValue, setzoomSliderValue] = useState<number>(0);
  const zoom = useDerivedValue(() => {
    if (device === null) return 0;
    return interpolate(
      zoomSliderValue,
      [0, 50, 100],
      [device.minZoom, device.maxZoom],
    );
  }, [zoomSliderValue, device]);

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({ zoom: zoom.value, exposure: exposure.value }),
    [zoom, exposure],
  );

  if (!hasPermission) {
    return <Permissions requestCameraPermisiion={requestPermission} />;
  }

  return (
    <View
      className="h-full flex-1 space-y-2"
      style={{
        backgroundColor: colors.surface,
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View style={{}} className="items-center">
        <AnimatedCamera
          isActive={isActive}
          animatedProps={animatedProps}
          device={device}
          format={format}
          lowLightBoost={false}
          isMirrored={false}
          isTVSelectable
          resizeMode="cover"
          androidPreviewViewType="surface-view"
          className="w-[95vw] h-[95vw] my-[5vw]"
        />
      </View>
      <Surface elevation={2} className="w-full rounded-full">
        <ToggleButton.Row
          value={mode}
          onValueChange={(value) => setmode(value)}
        >
          <ToggleButton icon="locate" value="finderCam" />
          <ToggleButton icon="planet" value="controls" />
        </ToggleButton.Row>
      </Surface>
      <View className="flex-grow">
        {mode === "finderCam" ? <Finder /> : <Controls />}
      </View>
    </View>
  );
}
