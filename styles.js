//styles.js
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    categoryPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryPickerLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    cardContainer: {
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardImage: {
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryLabel: {
        color: 'gray',
        marginLeft: 5,
    },
    description: {
        marginVertical: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
    },
    readMoreButton: {
        backgroundColor: '#3498db',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    readMoreButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        padding: 20,
    },
    modalCard: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
export { styles, pickerSelectStyles };