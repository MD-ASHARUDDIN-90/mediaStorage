import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {login} from '../../utils/api';
import {setToken} from '../../redux/reducers/authSlice';
import {useDispatch} from 'react-redux';

const Login = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        const response = await login(email, password);
        dispatch(setToken(response.token));
        navigation.navigate('Home');
        Alert.alert('Login Successful', 'Welcome to MediaStorage!');
      } catch (error: any) {
        Alert.alert('Login Failed', error.message || 'Failed to login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediaStorage</Text>
      <TextInput
        style={styles.input}
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon="email" />}
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon="lock" />}
        secureTextEntry
        error={!!passwordError}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        Login
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>New user? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
    width: '100%',
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  signUpText: {
    marginTop: 16,
    fontSize: 16,
    color: '#1e90ff',
  },
});
