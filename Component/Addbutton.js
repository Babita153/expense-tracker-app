import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Addbutton = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();

  const presslayout = async () => {
    if (!description || !amount) {
      Alert.alert('Please enter both description and amount');
      return;
    }

    // Post to API
    try {
      const response = await fetch('https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          amount
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      Alert.alert('Success', 'Expense Added Successfully!');
      setDescription('');
      setAmount('');
      navigation.goBack(); // Return to Home screen
    }
    catch (error) {
      console.error('Add Expense Error:', error);
      Alert.alert('Error', 'Something went wrong while adding expense');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require('../Assests/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Add an expense</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.view}>
          <Image
            style={{ height: 79, width: 90 }}
            source={require('../Assests/task-list.png')}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter a description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.view}>
          <Image
            style={{ height: 85, width: 90 }}
            source={require('../Assests/rupee.png')}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={presslayout}>
          <Text style={styles.buttontext}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Addbutton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    paddingTop: "19%",
    gap: '5%',
    backgroundColor: "#e6e3ead0",
  },
  header: {
    flexDirection: "row",
    gap: "15%",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  main: {
    height: '60%',
    backgroundColor: "white",
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 10,
  },
  view: {
    flexDirection: "row",
    padding: 10,
    height: 50,
    width: 200,
    justifyContent: "space-around",
  },
  input: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    borderBottomWidth: 1,
  },
  button: {
    borderWidth: 1,
    backgroundColor: "black",
    height: 50,
    width: "80%",
    marginTop: 70,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 20,
  }
});













//     // Get existing expenses array from AsyncStorage
//     const storedExpenses = await AsyncStorage.getItem('expenses');
//     let expensesArray = storedExpenses ? JSON.parse(storedExpenses) : [];
//     console.log(expensesArray, 'array expense')


//     // Append new expense item
//     const newExpense = {
//       id: Date.now().toString(), // unique id
//       description,
//       amount,
//     };
//     expensesArray = [...expensesArray, newExpense];

//     // Save back to AsyncStorage
//     await AsyncStorage.setItem('expenses', JSON.stringify(expensesArray));

//     setDescription('');
//     setAmount('');

//     // Go back to previous screen
//     navigation.goBack();
//   };
