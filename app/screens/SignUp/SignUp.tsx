import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {signUp} from '../../utils/api';

const SignUp = ({navigation}: {navigation: any}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    let isValid = true;

    if (!fullName.trim()) {
      setFullNameError('Full name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }
    console.log('isValid 1', isValid);
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    console.log('isValid 2', isValid);
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    console.log('isValid 3', isValid);
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    console.log('isValid 4', isValid);
    if (isValid) {
      try {
        console.log("I'm here");
        const response = await signUp(fullName, email, password);
        Alert.alert('Sign Up Successful', response.message);
        navigation.navigate('Login');
        // Optionally, you can navigate to another screen or perform other actions upon successful signup
      } catch (error) {
        Alert.alert('Sign Up Failed', error.message || 'Failed to sign up');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        label="Full Name"
        mode="outlined"
        value={fullName}
        onChangeText={setFullName}
        left={<TextInput.Icon icon="account" />}
        error={!!fullNameError}
      />
      {fullNameError ? (
        <Text style={styles.errorText}>{fullNameError}</Text>
      ) : null}
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
      <TextInput
        style={styles.input}
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        left={<TextInput.Icon icon="lock" />}
        secureTextEntry
        error={!!confirmPasswordError}
      />
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}
      <Button mode="contained" style={styles.button} onPress={handleSignUp}>
        Sign Up
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUpText}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
