import { Alert, Button, Linking, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

interface ImageManagerProps {
  imageUriHandler: (uri: string) => void;
}

export default function ImageManager({ imageUriHandler }: ImageManagerProps) {
  const [permissionResponse, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState<string>("");


  async function verifyPermissions() {
    if (permissionResponse?.granted) return true;
    const responseAfterRequest = await requestPermission();
    console.log(responseAfterRequest);
    if (responseAfterRequest?.granted) {
      return true;
    } else {
      return false;
    }
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert("No permissions", "You need to grant camera permissions to use this feature", [{ text: "OK"}]);
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      if (result.canceled) return;
      setImageUri(result.assets[0].uri); // Store image URI
      imageUriHandler(result.assets[0].uri);
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Button title="take an image" onPress={takeImageHandler}/>
      {imageUri ? ( 
        <Image
          source={{
            uri: imageUri,
          }}
        style={styles.image}
      />
    ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200, marginTop: 10 },
})