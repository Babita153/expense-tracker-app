import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const firstpage = () => {
    const navigation = useNavigation('')

    useEffect(() => {
        // Delay for 4 seconds and navigate
        const timer = setTimeout(() => {
            navigation.replace('started');
        }, 4000);
        return () => clearTimeout(timer); // cleanup
    }, []);

    return (
        <View styles={styles.container}>

            <Image
                style={styles.image}
                source={require('../Assests/smartspend.png')} />
            <TouchableOpacity onPress={() => { navigation.navigate('started') }}>
                <Text style={styles.firstpage}>
                    Smartspend
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default firstpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },

    image: {
        height: "30%",
        width: "40%",
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: "80%",
    },

    firstpage: {
        fontSize: 40,
        textAlign: 'center',
        justifyContent: "center",
        alignContent: "center",
        fontFamily: 'sans-serif-medium',
    }

})