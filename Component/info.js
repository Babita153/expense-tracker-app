import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, StatusBar, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Info = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const [modalvisible, setModalvisible] = useState(false);
    const navigation = useNavigation();

    const [name, setname] = useState('');
    const [mobile, setmobile] = useState('');
    const [income, setincome] = useState('');
    const [Gender, setgender] = useState('');

    const presslayout = () => {
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('mobile', mobile);
        AsyncStorage.setItem('income', income);
        AsyncStorage.setItem('gender', Gender);

        setModalvisible(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Image
                style={{ height: 250, width: 300, alignSelf: 'center', marginTop: 19 }}
                source={require('../Assests/budget.png')}
            />

            <Text style={styles.text}>Name : </Text>
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Enter your name'
                value={name}
                onChangeText={setname}
            />

            <Text style={styles.text}>Mobile : </Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Enter your mobile number'
                value={mobile}
                onChangeText={setmobile}
            />

            <Text style={styles.text}>Monthly Income : </Text>
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Enter your monthly income'
                value={income}
                onChangeText={setincome}
            />

            <Text style={styles.text}>Gender : </Text>
            <View style={{ flexDirection: "row" }} onChangeText={setgender}>
                <TouchableOpacity onPress={() => setSelectedRadio(1)}>
                    <View style={styles.radioview}>
                        <View style={styles.radio}>
                            {selectedRadio === 1 ? <View style={styles.radiobg}></View> : null}
                        </View>
                        <Text style={styles.radiotext}>Male</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedRadio(2)}>
                    <View style={styles.radioview}>
                        <View style={styles.radio}>
                            {selectedRadio === 2 ? <View style={styles.radiobg}></View> : null}
                        </View>
                        <Text style={styles.radiotext}>Female</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalvisible(true)} >
                <Text style={styles.continuetext}>
                    Continue
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalvisible}
                animationType='slide'
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={{ height: "40%", width: "45%" }}
                            source={require('../Assests/checkmark.png')} />

                        <Text style={{ fontSize: 25, textAlign: "center" }}> Success! </Text>
                        <Text style={{ fontSize: 17, padding: 12, textAlign: "center" }}>
                            Congratulations, you have successfully registered!
                        </Text>

                        <TouchableOpacity onPress={presslayout}>
                            <Text style={styles.modaltext}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: "white",
        gap: "1.5%",
    },
    text: {
        fontSize: 19,
    },
    input: {
        flexDirection: 'row',
        padding: 10,
        height: 50,
        width: '100%',
        borderWidth: 0.9,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        elevation: 5,
    },
    radiotext: {
        fontSize: 15,
        color: "black",
    },
    radio: {
        height: 30,
        width: 30,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        margin: 10,
    },
    radiobg: {
        backgroundColor: "black",
        height: 20,
        width: 20,
        borderRadius: 20,
        margin: 3,
    },
    radioview: {
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        borderWidth: 1,
        backgroundColor: "black",
        height: 50,
        width: "80%",
        marginTop: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
    },
    continuetext: {
        color: "white",
        fontSize: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 25,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: '#f2f2f2',
        height: "40%",
        width: "80%",
        padding: 20,
        borderRadius: 20,
        shadowColor: 'black',
        elevation: 5,
        alignItems: "center",
    },
    modaltext: {
        fontSize: 18,
        textAlign: "center",
        backgroundColor: "skyblue",
        padding: 8
    }
});





























// const submit = () => {
//     console.log(name);
//     console.log(mobile);
//     console.log(income);
// };

// const data={
//     name: name,
//     mobile: mobile,
//     income: income,
// };

// AsyncStorage.setItem('data', data);


// const presslayout = () => {
//     setModalvisible(false)
//     navigation.reset({
//         index: 0,
//         routes: [{ name: 'Tabs' }],
//     });
//     // navigation.navigate('Tabs')
// };

