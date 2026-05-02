import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = () => {
  const navigation = useNavigation();
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
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
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log('User Created:', isUserCreated.user);
      Alert.alert('Success', 'Provide me some details regarding you!');
      navigation.navigate('info');
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  };

  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          source={require('../Assests/Signupp.png')}
          style={styles.Image}
        />
        <View>
          <Text style={styles.Text}>SIGN UP</Text>
          <Text style={styles.bottomtext}>Sign up to continue.</Text>
        </View>

        <View>
          {/* Email Field */}
          <Text style={styles.inputtext}>Email:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password Field */}
          <Text style={styles.inputtext}>Password:</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.input1}
              placeholder="Enter your password"
              secureTextEntry={!eye}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        {/* Sign Up Button */}
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttontext}>Sign up</Text>
          </TouchableOpacity>

          <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
            {message}
          </Text>

          <View style={styles.signup}>
            <Text style={styles.account}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signupbutton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: 'white',
    gap: '4%',
  },
  Text: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  bottomtext: {
    fontSize: 15,
  },
  input: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    marginTop: 12,
    borderWidth: 0.9,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    elevation: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  inputtext: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 10,
  },
  input1: {
    flex: 1,
  },
  Image: {
    height: 250,
    width: 300,
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
  account: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  signup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signupbutton: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 3,
    color: 'blue',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Signup;
