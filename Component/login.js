/**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'otp'

  // Email login states
  const [eye, setEye] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // OTP login states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);

  /** EMAIL LOGIN FUNCTION **/
  const handleEmailLogin = async () => {
    let valid = true;
    if (email.trim() === '') {
      setEmailError('Email cannot be empty.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password cannot be empty.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const UserLogin = await auth().signInWithEmailAndPassword(email, password);
      console.log('User Created:', UserLogin.user);

      if (UserLogin.user.emailVerified) {
        Alert.alert('You are verified');
        navigation.dispatch(StackActions.replace('Tabs'));
      } else {
        Alert.alert('Please verify your Email Inbox');
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  /** SEND OTP FUNCTION **/
  const sendOtp = async () => {
    if (phone.length < 10) {
      Alert.alert('Error', 'Enter a valid phone number');
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      setConfirmResult(confirmation);
      Alert.alert('OTP Sent', 'Please check your SMS');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  /** VERIFY OTP FUNCTION **/
  const verifyOtp = async () => {
    if (!confirmResult) {
      Alert.alert('Error', 'Please request OTP first');
      return;
    }
    if (!otp) {
      Alert.alert('Error', 'Enter OTP');
      return;
    }
    try {
      await confirmResult.confirm(otp);
      Alert.alert('Success', 'Login successful');
      navigation.dispatch(StackActions.replace('Tabs'));
    } catch (err) {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={require('../Assests/login.png')} style={styles.Image} />

      {/* Heading */}
      <View>
        <Text style={styles.Text}>LOGIN</Text>
        <Text style={styles.bottomtext}>Please fill the details to continue.</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('email')}>
          <Text style={[styles.tabText, activeTab === 'email' && styles.activeTab]}>
            Login with Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('otp')}>
          <Text style={[styles.tabText, activeTab === 'otp' && styles.activeTab]}>
            Login with OTP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email Login Form */}
      {activeTab === 'email' && (
        <View style={{ gap: 10 }}>
          <Text style={styles.inputtext}>Email:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <Text style={[styles.inputtext, { marginTop: 10 }]}>Password:</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.input1}
              placeholder="Enter your password"
              secureTextEntry={!eye}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setEye(!eye)}>
              <Image
                style={styles.icon}
                source={
                  eye
                    ? require('../Assests/view.png')
                    : require('../Assests/hide.png')
                }
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
            <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>
        </View>
      )}


      {/* OTP Login Form */}
      {activeTab === 'otp' && (
        <View style={{ gap: 10 }}>
          <Text style={styles.inputtext}>Mobile Number:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter your mobile number"
            value={phone}
            onChangeText={setPhone}
          />

          {confirmResult ? (
            <View>
              <Text style={styles.inputtext}>Enter OTP:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                <Text style={styles.buttontext}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={sendOtp}>
              <Text style={styles.buttontext}>Send OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Signup */}
      <View style={styles.signup}>
        <Text style={styles.account}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupbutton}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 35, 
    backgroundColor: 'white', 
    gap: '3%' 
  },
  Text: { 
    fontSize: 30, 
    fontWeight: 'bold' 
  },
  bottomtext: { 
    fontSize: 15 
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  tabText: { 
    fontSize: 18, 
    color: '#888' 
  },
  activeTab: { 
    color: '#ff4081', 
    fontWeight: 'bold', 
    borderBottomWidth: 2, 
    borderBottomColor: '#ff4081' 
  },
  input: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    borderWidth: 0.9,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    elevation: 5,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  input1: { 
    flex: 1 
  },
  inputtext: { 
    fontSize: 19 
  },
  Image: { 
    height: 250, 
    width: 300, 
    alignSelf: 'center', 
    marginTop: 25 
  },
  button: {
    width: '80%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center'
  },
  buttontext: { 
    color: 'white', 
    fontSize: 20 
  },
  icon: { 
    width: 25, 
    height: 25, 
    marginRight: 10 
  },
  account: { 
    fontSize: 15, 
    textAlign: 'center', 
    marginTop: 10 
  },
  signup: { 
    flexDirection: 'row', 
    alignSelf: 'center'
  },
  signupbutton: { 
    fontSize: 15, 
    marginTop: 10, 
    marginLeft: 3, 
    color: 'blue' 
  },
  errorText: { 
    color: 'red', 
    marginBottom: 10 
  }
});

export default LoginScreen;









//     try {
//       // console.log('email =>', email);
//       // console.log('password =>' , password);
//       // Alert.alert('Success', 'Account login successfully!');
//       // navigation.navigate('Tabs');
//     } 


  // const validate = () => {
  //   // if (!email) {
  //   //   Alert.alert('please enter valid credentials')
  //   // } else if (!/\S+@\S+\.\S+/.test(email)) {
  //   //   Alert.alert('Invalid credentials ')
  //   // }

  //   if (email.trim() === '') {
  //     setEmailError('Email can not be empty.');
  //   }

  //   if (password.trim() === '') {
  //     setPasswordError('Password can not be empty.');
  //   }

  //   if (email.trim() !== '' && password.trim() !== '') {
  //     // Proceed with login logic
  //     console.log('Logging in...');
  //   }

  //   navigation.navigate("Tabs")
  // };
