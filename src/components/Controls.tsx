import { View, Text } from "react-native";
import React, { useState } from "react";
import useWebSocket from "react-native-use-websocket";
import { Button, IconButton, ToggleButton } from "react-native-paper";

export default function Controls() {
  const socketUrl = "https://192.168.0.1:9999";
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [isSyncEnabled, setisSyncEnabled] = useState<"checked" | "unchecked">(
    "checked",
  );
  const toggleSync = () =>
    setisSyncEnabled(isSyncEnabled === "checked" ? "unchecked" : "checked");

  const [focuserSpeed, setfocuserSpeed] = useState<"slow" | "fast">("slow");
  const toggleFocuserSpeed = () =>
    setfocuserSpeed(focuserSpeed === "slow" ? "fast" : "slow");

  async function test() {
    sendMessage(":GC#");
    console.log(lastMessage);
  }

  return (
    <View className="flex-grow">
      <Text>Controls</Text>
      <Button onPress={test}>Test</Button>

      <View className="justify-center">
        <View className="w-36 h-36 flex-1">
          <View className="h-12 justify-between">
            <IconButton icon="caret-up" className="rotate-45" />
            <IconButton icon="caret-up" />
            <IconButton icon="caret-up" className="-rotate-45" />
          </View>
          <View className="h-12 flex-row justify-between">
            <IconButton icon="caret-back" />
            <ToggleButton
              icon="sync"
              status={isSyncEnabled}
              onPress={toggleSync}
            />
            <IconButton icon="caret-forward" />
          </View>
          <View className="h-12 justify-between">
            <IconButton icon="caret-down" className="-rotate-45" />
            <IconButton icon="caret-down" />
            <IconButton icon="caret-down" className="rotate-45" />
          </View>
        </View>
      </View>
      <View className="w-[20vw] rounded-full flex-1">
        <ToggleButton
          icon="home"
          status={isSyncEnabled}
          onPress={toggleFocuserSpeed}
        />
        <View className="rounded-full flex-1">
          <IconButton icon="caret-up" />
          <Text>0.0</Text>
          <IconButton icon="caret-down" />
        </View>
      </View>
    </View>
  );
}
