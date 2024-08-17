import ScrollView from "@/components/ScrollView";
import React from "react";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import CameraSettings from "@/components/settings/CameraSettings";

export default function Appearance() {
  return (
    <ScrollView>
      <CameraSettings />
      <AppearanceSettings />
    </ScrollView>
  );
}
