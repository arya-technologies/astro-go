import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { useState } from "react";
import { View } from "react-native";
import { Surface, ToggleButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Finder from "@/components/Finder";
import Controls from "@/components/Controls";
import WifiManager from "react-native-wifi-reborn";
import FinderScopePreview from "@/components/FinderScopePreview";

type Modes = "finderCam" | "controls";

export default function index() {
  const { colors } = useAppTheme();
  const { top, bottom } = useSafeAreaInsets();

  const [mode, setmode] = useState<Modes>("controls");

  return (
    <View
      className="h-full flex-1 space-y-2"
      style={{
        backgroundColor: colors.surface,
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <FinderScopePreview />
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
