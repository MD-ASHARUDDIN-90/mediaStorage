import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';

const Images = () => {
  const [images, setImages] = useState([]);
  return (
    <View>
      {images.length > 0 ? (
        <Text>Images</Text>
      ) : (
        <Button onPress={() => setImages([1, 2, 3])}>Get Images</Button>
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({});
