import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditExpense = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, description: initialDescription, amount: initialAmount } = route.params;

  const [description, setDescription] = useState(initialDescription);
  const [amount, setAmount] = useState(initialAmount.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Delay for 4 seconds and navigate
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer); // cleanup
  }, []);

  const updateExpense = () => {
    if (!description || !amount) {
      Alert.alert('Please enter both description and amount');
      return;
    }

    setLoading(true);

    fetch(`https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        amount: parseFloat(amount)
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update expense');
        }
        return response.json();
      })
      .then(() => {
        Alert.alert('Expense Updated!');
        navigation.goBack();
      })

      .catch(error => {
        console.error('Update error:', error);
        Alert.alert('An error occurred while updating');
      })

      .finally(() => {
        setLoading(false);
      });
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
        <Text style={styles.text}>Edit Expense</Text>
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

        <View >
          {/* {loading ?
            (
              <ActivityIndicator size="large" color="blue" />
            )
            :
            ( */}
          <TouchableOpacity style={styles.button} onPress={updateExpense} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttontext}>Update</Text>
            )}

          </TouchableOpacity>
          {/* )
          } */}
        </View>
      </View>
    </View>
  );
};

export default EditExpense;

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

































//   const presslayout = async () => {
//     if (!description || !amount) {
//       // Alert.alert('Please enter both description and amount');
//       return;
//     }

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
