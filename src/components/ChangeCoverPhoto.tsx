import { Button, Text, XStack, YStack, useTheme } from 'tamagui';
import { useUser } from '../app/context/UserContext';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { API_ROUTES } from '@/src/utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ChangeCoverPhoto() {
  const { user, setUser } = useUser();
  const theme = useTheme();
  const [image, setImage] = useState({
    uri: '',
    type: '',
    name: 'coverPic.jpg',
  });
  const pickImage = async () => {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Photos', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 3],
      quality: 1,
    });
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets[0].uri
    ) {
      const asset = pickerResult.assets[0];
      const uri = asset.uri;
      const type = getMimeType(uri);
      if (asset.fileSize && asset.fileSize > 5048000) {
        // 5MB in bytes
        Alert.alert('Error', 'File size should not exceed 5MB');
        return;
      }

      setImage({
        uri: uri,
        type: type,
        name: user?.username ?? 'coverPic.jpg',
      });
    }
  };
  const getMimeType = (uri: string): string => {
    const extension = uri.split('.').pop(); // Extracts the extension from the URI
    const lowerCaseExtension = extension ? extension.toLowerCase() : '';

    switch (lowerCaseExtension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream'; // Default fallback for unknown types
    }
  };
  const changeCoverPhoto = async () => {
    if (image.uri) {
      const formData = new FormData();
      const { uri, type, name } = image;
      formData.append('image', {
        uri,
        type,
        name,
      } as any);
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_ROUTES.changeCoverPic, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser,
                coverImage: data.image,
              };
            }
            return prevUser;
          });
          setImage({
            uri: '',
            type: '',
            name: 'coverPic.jpg',
          });
          Alert.alert('Success', 'Cover Photo updated successfully');
        } else {
          Alert.alert('Error', 'Failed to update cover photo');
        }
      } catch (error) {
        console.error('Failed to upload data:', error);
      }
    } else {
      Alert.alert('Error', 'Please select an image to upload');
    }
  };
  return (
    <YStack p={12} justifyContent='center' gap={12}>
      <Text fontSize={15} fontWeight={'700'}>
        Change Cover Photo:
      </Text>
      <YStack>
        <YStack alignSelf='center' mb={5}>
          {image.uri && (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: 440,
                height: 150,
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />
          )}
        </YStack>
        <Button theme='blue' onPress={pickImage} w={'40%'} alignSelf='center'>
          <Entypo name='camera' size={20} color={theme.color12.val} />
          <Text>Pick an image</Text>
        </Button>
      </YStack>

      <XStack w={'100%'} justifyContent='flex-end'>
        <TouchableOpacity onPress={() => changeCoverPhoto()}>
          <Text color={'$blue10'} mr={10}>
            Save
          </Text>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}
