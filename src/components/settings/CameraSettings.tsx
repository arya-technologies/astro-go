import { setcameraDevice } from "@/features/slices/settingsSlice";
import { RootState } from "@/features/store";
import React, { useEffect, useState } from "react";
import { Button, List, Menu } from "react-native-paper";
import { CameraDevice, useCameraDevices } from "react-native-vision-camera";
import { useDispatch, useSelector } from "react-redux";

export default function CameraSettings() {
  const dispatch = useDispatch();
  const { camera } = useSelector((state: RootState) => state.settings);

  const devices = useCameraDevices();
  const [device, setdevice] = useState<CameraDevice>(camera.device);
  const [isDeviceMenuVisible, setisDeviceMenuVisible] = useState(false);
  const showDeviceMenu = () => setisDeviceMenuVisible(true);
  const hideDeviceMenu = () => setisDeviceMenuVisible(false);

  useEffect(() => {
    dispatch(setcameraDevice(device));
  }, [device]);

  return (
    <List.Section>
      <List.Subheader>Camera Settings</List.Subheader>
      <List.Item
        title="Device"
        right={() => (
          <Menu
            visible={isDeviceMenuVisible}
            onDismiss={hideDeviceMenu}
            anchor={
              <Button
                onPress={showDeviceMenu}
                icon="chevron-expand"
                mode="elevated"
              >
                {device.name.split(" ").slice(0, 2).join(" ")}
              </Button>
            }
          >
            {devices.map((item, index) => (
              <Menu.Item
                key={index}
                title={item.name.split(" ").slice(0, 2).join(" ")}
                onPress={() => {
                  setdevice(item);
                  hideDeviceMenu;
                }}
              />
            ))}
          </Menu>
        )}
      />
    </List.Section>
  );
}
