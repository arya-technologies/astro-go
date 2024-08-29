import { View, Text } from "react-native";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-native-use-websocket";
import { Button, IconButton, Surface, ToggleButton } from "react-native-paper";

export default function Controls() {
  const { colors } = useAppTheme();

  const socketUrl = "https://192.168.0.1:9999";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [isSyncEnabled, setisSyncEnabled] = useState<"checked" | "unchecked">(
    "checked",
  );
  const toggleSync = () => {
    sendMessage(isSyncEnabled === "checked" ? ":CM#" : ":CS#");
    setisSyncEnabled(isSyncEnabled === "checked" ? "unchecked" : "checked");
  };

  const [focuserPosition, setfocuserPosition] = useState<number>(0);
  const [focuserSpeed, setfocuserSpeed] = useState<"slow" | "fast">("slow");
  const toggleFocuserSpeed = () => {
    sendMessage(focuserSpeed === "slow" ? ":FF#" : ":FS#");
    setfocuserSpeed(focuserSpeed === "slow" ? "fast" : "slow");
  };
  const focusIn = () => sendMessage(":F+#");
  const focusOut = () => sendMessage(":F-#");
  const stopFocussing = () => sendMessage(":FQ#");
  useEffect(() => {
    sendMessage(":FG#");
    setfocuserPosition(lastMessage.data);
  }, [focusIn, focusOut]);

  async function test() {
    sendMessage(":GC#");
    console.log(lastMessage);
  }

  const moveNorth = () => sendMessage(":Mn#");
  const moveEast = () => sendMessage(":Me#");
  const moveWest = () => sendMessage(":Mw#");
  const moveSouth = () => sendMessage(":Ms#");
  const stopMovingNorth = () => sendMessage(":Qn#");
  const stopMovingEast = () => sendMessage(":Qe#");
  const stopMovingWest = () => sendMessage(":Qw#");
  const stopMovingSouth = () => sendMessage(":Qs#");

  return (
    <View className="flex-grow">
      <Text>Controls</Text>
      <Button onPress={test}>Test</Button>

      <View className="justify-center">
        <Surface className="w-36 h-36 flex-1" elevation={3}>
          <View className="h-12 justify-between">
            <IconButton
              icon="caret-up"
              onPressIn={moveNorth}
              onPressOut={stopMovingNorth}
            />
          </View>
          <View className="h-12 flex-row justify-between">
            <IconButton
              icon="caret-back"
              onPressIn={moveEast}
              onPressOut={stopMovingEast}
            />
            <ToggleButton
              icon="sync"
              status={isSyncEnabled}
              onPress={toggleSync}
            />
            <IconButton
              icon="caret-forward"
              onPressIn={moveWest}
              onPressOut={stopMovingWest}
            />
          </View>
          <View className="h-12 justify-between">
            <IconButton
              icon="caret-down"
              onPressIn={moveSouth}
              onPressOut={stopMovingSouth}
            />
          </View>
        </Surface>
      </View>
      <Surface className="w-[20vw] rounded-full flex-1" elevation={3}>
        <ToggleButton
          icon="home"
          status={isSyncEnabled}
          onPress={toggleFocuserSpeed}
        />
        <Surface className="rounded-full flex-1" mode="flat">
          <IconButton
            icon="caret-up"
            onPressIn={focusIn}
            onPressOut={stopFocussing}
          />
          <Text>{focuserPosition}</Text>
          <IconButton
            icon="caret-down"
            onPressIn={focusOut}
            onPressOut={stopFocussing}
          />
        </Surface>
      </Surface>
    </View>
  );
}
