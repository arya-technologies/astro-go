import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import * as Linking from "expo-linking";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

type PermissionsProps = {
  requestCameraPermisiion: () => void;
};

export default function Permissions({
  requestCameraPermisiion,
}: PermissionsProps) {
  const { colors } = useAppTheme();

  const requestPermissions = () => {
    try {
      requestCameraPermisiion();
    } catch (error) {
      Linking.openSettings();
    }
  };

  return (
    <View
      className="h-full flex-1 items-center justify-center space-y-4"
      style={{ backgroundColor: colors.surface }}
    >
      <Text>We need your permission to show the camera</Text>
      <Button onPress={requestPermissions} mode="elevated">
        Grant Permission
      </Button>
    </View>
  );
}
