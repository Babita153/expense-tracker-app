import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [expenses, setExpenses] = useState(0);
    const [income, setIncome] = useState('');
    
    const getincome = async () => {
        const myIncome = await AsyncStorage.getItem('income');
        setIncome(myIncome);
    }
    console.log(income, 'data')

    useEffect(() => {
            getincome();
        }, []);

    // Fetch Expenses from API
    const getExpenses = () => {
        setLoading(true);
        fetch('https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses')
            .then(response => response.json())
            .then(data => {
                setTransactions(data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            });
    };

    // Calculate total expenses whenever transactions change
    useEffect(() => {
        const total = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        setExpenses(total);
    }, [transactions]);

    // Refresh data when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            getExpenses();
        }, [])
    );

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const deleteExpense = (id) => {
        fetch(`https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete expense');
                }
                Alert.alert('Success', 'Expense Deleted!');
                getExpenses(); // Refresh after delete
                setOpenDropdownId(null);
            })
            .catch(error => {
                console.error('Delete error:', error);
                Alert.alert('Error', 'An error occurred while deleting');
            });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.transactionRow}>
                <View style={{ width: '60%', justifyContent: 'center' }}>
                    <Text style={styles.innerText}>{item.description || 'No Description'}</Text>
                </View>

                <View style={{ width: '35%' }}>
                    <Text style={styles.innerText}>{item.amount || 0}</Text>
                </View>

                <TouchableOpacity onPress={() => toggleDropdown(item.id)}>
                    <Text style={styles.triggerText}> ⋮ </Text>
                </TouchableOpacity>

                {openDropdownId === item.id && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                navigation.navigate('editexpense', {
                                    id: item.id,
                                    description: item.description,
                                    amount: item.amount
                                });
                            }}>
                            <Text style={styles.optionText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => deleteExpense(item.id)}>
                            <Text style={styles.optionText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.box1}>
                <Text style={styles.text}>Home</Text>
                <Image style={styles.Image} source={require('../Assests/search.png')} />
            </View>

            {/* Expenses Section */}
            <View style={styles.box2}>
                <Text style={{ color: 'white', fontSize: 25 }}>Your Monthly Income</Text>
                <Text style={{ fontSize: 36, color: "green" }}>{income}</Text>
                
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{ color: 'white', fontSize: 23 }}>Total Expenses</Text>
                    <Text style={{ fontSize: 27, color: "red" }}>{expenses}</Text>
                </View>
                
            </View>

            {/* Transactions Section */}
            <View style={styles.box3}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions</Text>
                <View style={{ marginBottom: 150 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : transactions.length > 0 ? (
                        <FlatList
                            data={transactions}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        />
                    ) : (
                        <Text style={{ fontSize: 18, marginTop: 20, color: "gray" }}>No transactions yet</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: '15%',
        padding: 15
    },
    box1: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        fontSize: 25,
        fontWeight: "bold"
    },
    Image: {
        height: 30,
        width: 30
    },
    box2: {
        backgroundColor: 'black',
        padding: 32,
        flex: 1.4,
        borderRadius: 40,
        marginBottom: 70,
        justifyContent: "space-between"
    },
    box3: {
        backgroundColor: 'offwhite',
        flex: 4
    },
    innerText: {
        fontSize: 20,
    },
    card: {
        padding: 15,
        backgroundColor: '#bdb3b33d',
        marginTop: 15,
        borderRadius: 20
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        padding: 3.5,
        justifyContent: 'center',
    },
    triggerText: {
        color: 'black',
        fontSize: 30,
    },
    dropdown: {
        position: 'absolute',
        top: 0,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 6,
        paddingVertical: 10,
        zIndex: 999,
        elevation: 5,
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});


































// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Home = () => {
//     const navigation = useNavigation()
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [openDropdownId, setOpenDropdownId] = useState(null);
//     const [income, setIncome] = useState('');

//     const getincome = async () => {
//         const myIncome = await AsyncStorage.getItem('income');
//         setIncome(myIncome);
//     }
//     console.log(income, 'data')

//     useEffect(() => {
//         getincome();
//     }, []);

//     const toggleDropdown = (id) => {
//         if (openDropdownId === id) {
//             setOpenDropdownId(null); // Close if already open
//         } else {
//             setOpenDropdownId(id); // Open this item
//         }
//     };
//     // const [showDropdown, setShowDropdown] = useState(false);

//     // const toggleDropdown = () => {
//     //     setShowDropdown(!showDropdown);
//     // };

//     const getData = () => {
//         setLoading(true); // Show loader before fetching

//         fetch('https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses')
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data, 'Fetched Data');
//                 setTransactions(data || []); // If no data, set empty array
//                 setLoading(false); // Hide loader
//             });
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             getData();

//         }, [])
//     );

//     const deleteExpense = (id) => {
//         fetch(`https://689c47ef58a27b18087d8ae8.mockapi.io/api/v1/expenses/${id}`, {
//             method: 'DELETE',
//         })
//             .then(response => {
//                 // console.log(response,'response')
//                 if (!response.ok) {
//                     throw new Error('Failed to delete expense');
//                 }
//                 Alert.alert('Success', 'Expense Deleted!');
//                 getData();
//                 setOpenDropdownId(null); // Close dropdown after delete
//             })
//             .catch(error => {
//                 console.error('Delete error:', error);
//                 Alert.alert('Error', 'An error occurred while deleting');
//             });
//     };

//     // const getData = async () => {
//     //     const response = await fetch('9');
//     // };


//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <View style={styles.transactionRow}>
//                 <View style={{ width: '60%', justifyContent: 'center' }}>
//                     <Text style={styles.innerText}>{item.description || 'No Description'}</Text>
//                 </View>

//                 <View style={{ width: '35%' }}>
//                     <Text style={styles.innerText}>{item.amount || 0}</Text>
//                 </View>
//                 {/* <TouchableOpacity style={styles.menuButton}>
//                     <Text style={styles.dots}> ⋮ </Text>
//                 </TouchableOpacity> */}

//                 {/* <TouchableOpacity onPress={toggleDropdown}>
//                     <Text style={styles.triggerText}> ⋮ </Text>
//                 </TouchableOpacity>

//                 {showDropdown && (
//                     <View style={styles.dropdown}>
//                         <TouchableOpacity style={styles.option} onPress={() => alert('Edit clicked')}>
//                             <Text style={styles.optionText}>Edit</Text>
                           
//                         </TouchableOpacity>

//                         <TouchableOpacity style={styles.option} onPress={() => alert('Delete clicked')}>
//                             <Text style={styles.optionText}>Delete</Text>
                            
//                         </TouchableOpacity>
//                     </View>
//                 )} */}


//                 <TouchableOpacity onPress={() => toggleDropdown(item.id)}>
//                     <Text style={styles.triggerText}> ⋮ </Text>
//                 </TouchableOpacity>

//                 {openDropdownId === item.id && (
//                     <View style={styles.dropdown}>
//                         <TouchableOpacity
//                             style={styles.option}
//                             onPress={() => {
//                                 navigation.navigate('editexpense', {
//                                     id: item.id,
//                                     description: item.description,
//                                     amount: item.amount
//                                 });
//                             }}>
//                             <Text style={styles.optionText}>Edit</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.option}
//                             onPress={() => deleteExpense(item.id)}>
//                             <Text style={styles.optionText}>Delete</Text>
//                         </TouchableOpacity>

//                     </View>
//                 )}

//             </View>
//         </View >
//     );

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.box1}>
//                 <Text style={styles.text}>Home</Text>
//                 <Image style={styles.Image} source={require('../Assests/search.png')} />
//             </View>

//             {/* Balance Section */}
//             <View style={styles.box2}>
//                 <View>
//                     <Text style={{ color: 'white', fontSize: 25 }}>Your Monthly Income</Text>
//                     <Text style={{ fontSize: 36, color: "white" }}>{income}</Text>
//                     {/* <Text style={{ color: 'white', fontSize: 36 }}>234.67</Text> */}
//                 </View>

//                 <View >
//                     {/* <View>
//                         <Image style={{ height: 20, width: 19, tintColor: "white" }} source={require('../Assests/arrow-down.png')} />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Income</Text>
//                         <Text style={{ fontSize: 24, color: "green" }}>567.2</Text>
//                     </View> */}

//                     <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                         <View style={{ flexDirection: "row" }}>
//                             <Image style={{ height: 20, width: 20, tintColor: "white" }} source={require('../Assests/up-arrow.png')} />
//                             <Text style={{ color: 'white', fontSize: 24, alignSelf: "center" }}> Expenses</Text>
//                         </View>
//                         <Text style={{ fontSize: 24, color: "red" }}>856.34</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* Transactions Section */}
//             <View style={styles.box3}>
//                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions</Text>
//                 <View style={{ marginBottom: 150 }}>
//                     {loading ?
//                         (
//                             <ActivityIndicator size="large" color="blue" />
//                         )
//                         :
//                         transactions.length > 0 ?
//                             (
//                                 <FlatList
//                                     data={transactions}
//                                     renderItem={renderItem}
//                                     keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//                                 />
//                             )
//                             :
//                             (
//                                 <Text style={{ fontSize: 18, marginTop: 20, color: "gray" }}>No transactions yet</Text>
//                             )}
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         marginTop: '15%',
//         padding: 15
//     },
//     box1: {
//         flex: 0.5,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center"
//     },
//     text: {
//         fontSize: 25,
//         fontWeight: "bold"
//     },
//     Image: {
//         height: 30,
//         width: 30
//     },
//     box2: {
//         backgroundColor: 'black',
//         padding: 32,
//         flex: 1.4,
//         borderRadius: 40,
//         marginBottom: 70,
//         justifyContent: "space-between"
//     },
//     box3: {
//         backgroundColor: 'offwhite',
//         flex: 4
//     },
//     innerText: {
//         fontSize: 20,
//         // justifyContent: "space-evenly"
//     },
//     card: {
//         padding: 15,
//         backgroundColor: '#bdb3b33d',
//         marginTop: 15,
//         borderRadius: 20
//     },
//     dots: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     transactionRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 50,
//         padding: 8,
//         justifyContent: 'center',
//         // justifyContent: 'space-between'
//     },
//     // iconimagemage: {
//     //     height: 0.3,
//     //     width: 0.3,
//     // },


//     // triggerButton: {
//     //     backgroundColor: '#333',
//     //     padding: 10,
//     //     borderRadius: 5,
//     // },
//     triggerText: {
//         color: 'black',
//         fontSize: 30,
//     },
//     dropdown: {
//         position: 'absolute',
//         // flexDirection:"row",
//         top: 0, // Adjust as per your layout
//         right: 20,
//         backgroundColor: 'white',
//         borderRadius: 6,
//         paddingVertical: 10,
//         zIndex: 999,
//         elevation: 5, // for Android shadow
//         // shadowOffset: { width: 0, height: 2 },
//         // shadowOpacity: 0.25,
//         // shadowRadius: 3.84,
//     },
//     option: {
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//     },
//     optionText: {
//         fontSize: 16,
//         color: '#333',
//     },
// });


























// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';

// const Home = () => {
//     const [transactions, setTransactions] = useState([]);

//     //   useEffect(() => {
//     //     getData();
//     //   }, []);

//     //   const getData = async () => {
//     //     try {
//     //       const data = await AsyncStorage.getItem('expenses');
//     //       if (data) {
//     //         const myData = JSON.parse(data);
//     //         setTransactions(myData);
//     //       } else {
//     //         setTransactions([]); // empty array if nothing in storage
//     //       }
//     //     } catch (error) {
//     //       console.error('Error loading data:', error);
//     //     }
//     //   };

//     useFocusEffect(
//         React.useCallback(() => {
//             const getData = async () => {
//                 try {
//                     const data = await AsyncStorage.getItem('expenses');
//                     if (data) {
//                         const myData = JSON.parse(data);
//                         setTransactions(myData);
//                     } else {
//                         setTransactions([]); // empty array if nothing in storage
//                     }
//                 } catch (error) {
//                     console.error('Error loading data:', error);
//                 }
//             };

//             getData();
//         }, [])
//     );


//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <TouchableOpacity style={styles.transactionRow}>
//                 <Text style={styles.innerText}>{item.description}</Text>
//                 <Text style={styles.innerText}>{item.amount}</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={styles.container}>

//             {/* Header */}
//             <View style={styles.box1}>
//                 <Text style={styles.text}>Home</Text>
//                 <Image
//                     style={styles.Image}
//                     source={require('../Assests/search.png')}
//                 />
//             </View>

//             {/* Balance Section */}
//             <View style={styles.box2}>
//                 <View>
//                     <Text style={{ color: 'white', fontSize: 25 }}>Total Balance</Text>
//                     <Text style={{ color: 'white', fontSize: 36 }}>234.67</Text>
//                 </View>

//                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                     <View>
//                         <Image
//                             style={{ height: 20, width: 19, tintColor: "white" }}
//                             source={require('../Assests/arrow-down.png')}
//                         />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Income</Text>
//                         <Text style={{ fontSize: 24, color: "green" }}>567.2</Text>
//                     </View>

//                     <View>
//                         <Image
//                             style={{ height: 19, width: 19, tintColor: "white" }}
//                             source={require('../Assests/up-arrow.png')}
//                         />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Expenses</Text>
//                         <Text style={{ fontSize: 24, color: "red" }}>856.34</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* Transactions Section */}
//             <View style={styles.box3}>
//                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions</Text>
//                 <View style={{ marginBottom: 150 }}>
//                     {transactions.length > 0 ? (
//                         <FlatList
//                             data={transactions}
//                             renderItem={renderItem}
//                             keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//                         />
//                     ) : (
//                         <Text style={{ fontSize: 18, marginTop: 20, color: "gray" }}>
//                             No transactions yet
//                         </Text>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         marginTop: '15%',
//         padding: 15,
//     },
//     box1: {
//         flex: 0.5,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center"
//     },
//     text: {
//         fontSize: 25,
//         fontWeight: "bold",
//     },
//     Image: {
//         height: 30,
//         width: 30,
//     },
//     box2: {
//         backgroundColor: 'black',
//         padding: 32,
//         flex: 1.4,
//         borderRadius: 40,
//         marginBottom: 70,
//         justifyContent: "space-between",
//     },
//     box3: {
//         backgroundColor: 'offwhite',
//         flex: 4,
//     },
//     innerText: {
//         fontSize: 20,
//     },
//     card: {
//         padding: 15,
//         backgroundColor: '#b3a5a53d',
//         marginTop: 15,
//         borderRadius: 20,
//     },
//     transactionRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     }
// });




// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Home = () => {
//     const [transactions, setTransactions] = useState([]);

//     useEffect(() => {
//         getData();
//     }, []);

//     const getData = async () => {
//         try {
//             const data = await AsyncStorage.getItem('expenses');
//             if (data) {
//                 const myData = JSON.parse(data);
//                 setTransactions(myData);
//             } else {
//                 setTransactions([]); // empty array if nothing in storage
//             }
//         } catch (error) {
//             console.error('Error loading data:', error);
//         }
//         // const data = await AsyncStorage.getItem('expenses');
//         // const myData = JSON.parse(data)
//         // setTransactions(myData)
//     };


//     console.log(transactions, 'transactions')


//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <TouchableOpacity style={styles.transactionRow}>
//                 <Text style={styles.innerText}>{item.description}</Text>
//                 <Text style={styles.innerText}>{item.amount}</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     return (
//         <View style={styles.container}>

//             {/* Header */}
//             <View style={styles.box1}>
//                 <Text style={styles.text}>Home</Text>
//                 <Image
//                     style={styles.Image}
//                     source={require('../Assests/search.png')}
//                 />
//             </View>

//             {/* Balance Section */}
//             <View style={styles.box2}>
//                 <View>
//                     <Text style={{ color: 'white', fontSize: 25 }}>Total Balance</Text>
//                     <Text style={{ color: 'white', fontSize: 36 }}>234.67</Text>
//                 </View>

//                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                     <View>
//                         <Image
//                             style={{ height: 20, width: 19, tintColor: "white" }}
//                             source={require('../Assests/arrow-down.png')}
//                         />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Income</Text>
//                         <Text style={{ fontSize: 24, color: "green" }}>567.2</Text>
//                     </View>

//                     <View>
//                         <Image
//                             style={{ height: 19, width: 19, tintColor: "white" }}
//                             source={require('../Assests/up-arrow.png')}
//                         />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Expenses</Text>
//                         <Text style={{ fontSize: 24, color: "red" }}>856.34</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* Transactions Section */}
//             <View style={styles.box3}>
//                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions</Text>
//                 <View style={{ marginBottom: 150 }}>
//                     <FlatList
//                         data={transactions}
//                         renderItem={renderItem}
//                         keyExtractor={(item) => item.id}
//                     />
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         marginTop: '15%',
//         padding: 15,
//     },
//     box1: {
//         flex: 0.5,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center"
//     },
//     text: {
//         fontSize: 25,
//         fontWeight: "bold",
//     },
//     Image: {
//         height: 30,
//         width: 30,
//     },
//     box2: {
//         backgroundColor: 'black',
//         padding: 32,
//         flex: 1.4,
//         borderRadius: 40,
//         marginBottom: 70,
//         justifyContent: "space-between",
//     },
//     box3: {
//         backgroundColor: 'offwhite',
//         flex: 4,
//     },
//     innerText: {
//         fontSize: 20,
//     },
//     card: {
//         padding: 15,
//         backgroundColor: '#b3a5a53d',
//         marginTop: 15,
//         borderRadius: 20,
//     },
//     transactionRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     }
// });











// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// // const expense = [
// //     // { id: 1, Name: 'Travel', Amount: '1000' },
// //     // { id: 2, Name: 'Shopping', Amount: '635' },
// //     // { id: 3, Name: 'Rent', Amount: '5000' },
// //     // { id: 4, Name: 'Food', Amount: '4000' },
// //     // { id: 5, Name: 'Zepto', Amount: '100' },
// //     // { id: 6, Name: 'Swiggy', Amount: '379' },
// //     // { id: 7, Name: 'Blinkit', Amount: '856' },
// //     // { id: 8, Name: 'Cab', Amount: '356' },
// //      <Text style={{ fontSize: 20 }}>{description}</Text>
// //     <Text style={{ fontSize: 15 }}>{amount}</Text>
// // ]

// const Home = () => {
//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Text style={styles.innertext}>{item.Name}</Text>
//                 <Text style={styles.innertext}>{item.Amount}</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     const [description, setdescription] = useState('');
//     const [amount, setamount] = useState('');

//     useEffect(() => {
//         getdata();
//     }, []);

//     const getdata = async () => {
//         const myDescription = await AsyncStorage.getItem('description');
//         const myAmount = await AsyncStorage.getItem('amount');

//         setdescription(myDescription);
//         setamount(myAmount);

//         if (myDescription && myAmount) {
//             setTransactions([
//                 { id: '1', Name: myDescription, Amount: myAmount }
//             ]);
//         }

//     }
//     console.log(description, 'data')
//     console.log(amount, 'data')


//     return (
//         <View style={styles.container}>

//             <View style={styles.box1}>
//                 <Text style={styles.text}>Home</Text>

//                 <Image
//                     style={styles.Image}
//                     source={require('../Assests/search.png')} />

//             </View>

//             <View style={styles.box2}>
//                 <View>
//                     <Text style={{ color: 'white', fontSize: 25, }}>Total Balance</Text>
//                     <Text style={{ color: 'white', fontSize: 36 }}>234.67</Text>
//                 </View>

//                 <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                     <View>
//                         <Image
//                             style={{ height: 20, width: 19, tintColor: "white" }}
//                             source={require('../Assests/arrow-down.png')} />

//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Income</Text>
//                         <Text style={{ color: 'white', fontSize: 24, color: "green" }}>567.2</Text>
//                     </View>

//                     <View>
//                         <Image
//                             style={{ height: 19, width: 19, tintColor: "white" }}
//                             source={require('../Assests/up-arrow.png')} />
//                         <Text style={{ color: 'white', fontSize: 23, alignSelf: "center" }}>Expenses</Text>
//                         <Text style={{ color: 'white', fontSize: 24, color: "red" }}>856.34</Text>
//                     </View>

//                 </View>

//             </View>

//             <View style={styles.box3}>
//                 <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions</Text>
//         <View style={{ marginBottom: 150 }}>
//           <FlatList
//             data={transactions}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//           />
//         </View>
//                 {/* <Text style={{ fontSize: 25, fontWeight: "bold" }}>Transactions </Text>



//                 <View style={{ marginBottom: 150 }} >
//                     <FlatList
//                         data={expense}
//                         renderItem={renderItem}
//                     // ItemSeparatorComponent={<View style={{ height: 10 }} />}
//                     />
//                 </View> */}
//             </View>
//         </View>
//     )
// }

// export default Home;

// const styles = StyleSheet.create({

//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         marginTop: '15%',
//         padding: 15,
//     },

//     box1: {
//         flex: 0.5,
//         flexDirection: "row",
//         gap: "60%"
//     },

//     text: {
//         fontSize: 25,
//         fontWeight: "bold",
//     },

//     Image: {
//         height: "70%",
//         width: "13%",
//         // position: "absolute",
//         // zIndex: 2,
//         // marginHorizontal: "10%",
//     },

//     box2: {
//         backgroundColor: 'black',
//         padding: 32,
//         flex: 1.4,
//         borderRadius: 40,
//         marginBottom: 70,
//         justifyContent: "space-between",
//     },

//     box3: {
//         backgroundColor: 'offwhite',
//         flex: 4,

//     },

//     innertext: {
//         fontSize: 20,
//     },

//     card: {
//         padding: 15,
//         backgroundColor: '#b3a5a53d',
//         marginTop: 15,
//         borderRadius: 20,
//     }
// })