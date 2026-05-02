import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const started = () => {
    const navigation = useNavigation('')
    return (
        <View style={styles.container}>

            <Image
                source={require('../Assests/Expense.png')}
                style={styles.Image} />

            <Text style={styles.Text}>
                Always take control {'\n'}of your expenses.
            </Text>

            <Text style={styles.bottomtext}>
                Expenses must be arranged to set {'\n'} a better lifestyle in the future.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate("login") }}>

                <Text style={styles.buttontext} >
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default started

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "center",
    },

    Image: {
        height: 250,
        width: 350,
        alignSelf: 'center',
        alignContent: 'center',
    },

    Text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 60,
    },

    bottomtext: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
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

})