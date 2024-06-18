import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}: any) => {
  const {token} = useSelector((state: any) => state.auth);
  console.log('SplashScreen');
  useEffect(() => {
    setTimeout(() => {
      console.log('Timeout');
      if (token) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
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
