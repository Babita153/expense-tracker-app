import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MenuProvider } from 'react-native-popup-menu';

import Home from '../Component/Home';
import Profile from '../Component/Profile';
import Addbutton from '../Component/Addbutton';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        // <MenuProvider>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "8%",
                    width: "80%",
                    borderRadius: 50,
                    backgroundColor: "black",
                    position: 'absolute',
                    bottom: 26,
                    paddingTop: '4%',
                    marginLeft: "10%",
                }
            }} >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 30, width: 30, tintColor: "white" }}
                            source={focused ?
                                require('../Assests/home1.png') :
                                require('../Assests/home.png')} />
                    )
                }}
            />



            <Tab.Screen
                name="Addbutton"
                component={Addbutton}
                options={{
                    tabBarIcon: () => (
                        <View style={styles.addbuttoncontainer}>
                            <View style={styles.addbutton}>
                                <Image
                                    style={{ height: 25, width: 25, tintColor: "black" }}
                                    source={require('../Assests/plus.png')}
                                />
                            </View>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={{ height: 30, width: 30, tintColor: "white" }}
                            source={focused ?
                                require('../Assests/user1.png') :
                                require('../Assests/user.png')} />
                    )
                }}
            />
        </Tab.Navigator>
        // </MenuProvider>
    );
}

export default Tabs;

const styles = StyleSheet.create({
    addbuttoncontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    addbutton: {
        backgroundColor: "white",
        borderRadius: 30,
        height: 55,
        width: 55,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
    }
});
