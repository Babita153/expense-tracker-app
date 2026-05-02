import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DATA = [
    { id: 1, Name: 'Notifications' },
    { id: 2, Name: 'Security' },
    { id: 3, Name: 'Help' },
    { id: 4, Name: 'Contact us' },
]

const Profile = () => {
    const renderItem = ({ item }) => (
        <View style={{}}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
                <Text style={styles.innertext}>{item.Name}</Text>
                <Image source={require('../Assests/right-arrow.png')} style={{ height: 17, width: 18 }} />
            </TouchableOpacity>
        </View>
    );

    const [modalvisible, setModalvisible] = useState('');
    const navigation = useNavigation('');


    useEffect(() => {
        getdata();
    }, []);


    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [income, setIncome] = useState('');

    const getdata = async () => {
        const myName = await AsyncStorage.getItem('name');
        const myMobile = await AsyncStorage.getItem('mobile');
        const myIncome = await AsyncStorage.getItem('income');
        
        setName(myName);
        setMobile(myMobile);
        setIncome(myIncome);
    }
    console.log(name, 'data')
    console.log(mobile, 'data')
    console.log(income, 'data')


    const presslayout =async () => {
        setModalvisible(false)
        await AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
        // navigation.navigate('login')
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />

            <Text style={styles.text}>Profile</Text>
            <View style={{ flexDirection: "row" }}>
                <Image
                    style={{ height: 70, width: 70 }}
                    source={require('../Assests/woman.png')} />
                <View style={{ flexDirection: "column", padding: 20 }}>
                    <Text style={{ fontSize: 20 }}>{name}</Text>
                    <Text style={{ fontSize: 15 }}>{mobile}</Text>
                </View>

            </View>


            <View style={{ height: '50%' }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                // ItemSeparatorComponent={<View style={{ height: 10 }} />}
                />
            </View>

            <TouchableOpacity onPress={() => setModalvisible(!modalvisible)} >
                <Text style={styles.logouttext}>
                    Log Out
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalvisible}
                animationType='slide'
            >
                <View style={styles.centeredView}>
                    
                    <View style={styles.modalView}>

                        <Text style={{ fontSize: 25, textAlign: "center" }}>Log out </Text>

                        <Text style={{ fontSize: 17, padding: 10 }}>Are you sure you want to {'\n'}log out?</Text>

                        <View style={styles.modalbutton}>

                            <TouchableOpacity onPress={() => setModalvisible(!modalvisible)} >
                                <Text style={styles.modalbuttontext}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={presslayout} >
                                <Text style={styles.modalbuttontext}>Okay </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: "white",
    },

    text: {
        fontSize: 30,
        marginTop: 70,
        marginBottom: 20,
    },

    innertext: {
        fontSize: 20,
        marginBottom: 15,
    },

    logouttext: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: "100%",
        color: 'blue',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalView: {
        backgroundColor: '#f2f2f2',
        height: "28%",
        padding: 30,
        borderRadius: 20,
        shadowColor: 'black',
        elevation: 5,
    },

    modalbutton: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: "1%",
    },

    modalbuttontext: {
        fontSize: 18,
        textAlign: "center",
        backgroundColor: "skyblue",
        padding: 7,
        width: "140%",
    }
})