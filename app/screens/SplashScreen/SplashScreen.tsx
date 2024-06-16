import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';

const SplashScreen = ({navigation}: any) => {
  console.log('SplashScreen');
  useEffect(() => {
    setTimeout(() => {
      console.log('Timeout');
      navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
