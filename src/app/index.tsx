import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Surface, ToggleButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Finder from "@/components/Finder";
import Controls from "@/components/Controls";
import {
  connectToProtectedWifiSSID,
  getCurrentWifiSSID,
} from "react-native-wifi-reborn";
import FinderScopePreview from "@/components/FinderScopePreview";

type Modes = "finderCam" | "controls";

export default function index() {
  const { colors } = useAppTheme();
  const { top, bottom } = useSafeAreaInsets();

  const [isConnected, setisConnected] = useState<boolean>(false);
  const [mode, setmode] = useState<Modes>("controls");

  const ssid = "OnStep";
  const password = "password";
  const connectToOnStep = async () => {
    try {
      connectToProtectedWifiSSID({ ssid, password })
        .then(() => setisConnected(true))
        .catch((e) => setisConnected(false));
    } catch (error) {
      console.log(error);
    }
  };
  const getConnection = async () => {
    try {
      const response = await getCurrentWifiSSID();
      if (response) {
        setisConnected(true);
        console.log(response);
      }
    } catch (error) {
      setisConnected(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!isConnected) {
    return (
      <View
        className="h-full flex-1 space-y-2"
        style={{
          backgroundColor: colors.surface,
          paddingTop: top,
          paddingBottom: bottom,
        }}
      >
        <View>
          <Button onPress={connectToOnStep}>Connect</Button>
        </View>
      </View>
    );
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
      <Controls />
    </View>
  );
}
