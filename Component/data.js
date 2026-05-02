import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'

const DATA = [
    { id: 1, Name: 'Avengers', Image: { uri: "https://images-cdn.ubuy.co.in/668f03f763dc6918441092c0-avengers-infinity-war-movie-poster.jpg" } },
    { id: 2, Name: 'Kalki', Image: { uri: "https://i.pinimg.com/originals/fb/55/dc/fb55dc632b7a7ffbabf104b1208b27fc.jpg" } },
    { id: 3, Name: 'Saiyaara', Image: { uri: "https://m.media-amazon.com/images/M/MV5BMTk2ZmFhYjctYWZiYy00N2IxLWEzMWItZGRiMDY4ZDQwZWFlXkEyXkFqcGc@._V1_.jpg" } },
    { id: 4, Name: 'War2', Image: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSC_cbnjlAo2ozCzpEYAJzMmE5XIBlzMSXag&s" } },
    { id: 5, Name: 'Stree2', Image: { uri: "https://m.media-amazon.com/images/M/MV5BMTA1NmUxYzItZmVmNy00YmQxLTk4Y2UtZjVkMWUwMWQ5N2IxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" } },
];

const data = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 50, marginTop: 20, marginBottom: 10 }}
                            source={item.Image}
                        />

                        <Text style={styles.name}>{item.id + '. '}</Text>
                        <Text style={styles.name}>{item.Name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<View style={{ height: 10 }} />}
                // numColumns={2}
                // columnWrapperStyle={{gap:10}}
                horizontal
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "grey",
        paddingHorizontal: 15,
        marginTop: 50,
    },

    Imagestyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    name: {
        fontSize: 20,
        padding: 3,
        textAlign: "center",
        alignItems: "center",
    },

    card: {
        width: "100%",
        height: 200,
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default data;