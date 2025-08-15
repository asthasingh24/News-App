// App.js
import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, Modal, TouchableOpacity,
    RefreshControl, ActivityIndicator, Linking
} from 'react-native';
import { Card, Icon, Overlay } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { styles as appStyles, pickerSelectStyles } from './styles';

const App = () => {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState('general');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, [selectedCategory]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await fetch(
`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=9bdec2f445554a4e824679c8b3db6b83`
            );
            const result = await response.json();
            setNews(
                result.articles
                    .map(
                        article =>
                        (
                            {
                                ...article,
                                category: selectedCategory
                            }
                        )));
        } catch (error) {
            console.error('Error fetching news:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchNews();
        } finally {
            setRefreshing(false);
        }
    };

    const openNewsLink = () => {
        if (selectedNews?.url) {
            Linking.openURL(selectedNews.url);
        }
    };

    const renderItem = ({ item }) => (
        <Card containerStyle={appStyles.cardContainer}>
            <Card.Title
                style={appStyles.cardTitle}>
                {item.title}
            </Card.Title>
            <Card.Image
                source={{ uri: item.urlToImage }}
                style={appStyles.cardImage} />
            <Text
                style={appStyles.description}>
                {item.description}
            </Text>
            <View style={appStyles.cardFooter}>
                <View style={appStyles.categoryContainer}>
                    <Icon name="tag"
                        type="font-awesome"
                        color="gray" size={16} />
                    <Text style={appStyles.categoryLabel}>
                        {item.category}
                    </Text>
                </View>
                <TouchableOpacity
                    style={appStyles.readMoreButton}
                    onPress={() => {
                        setSelectedNews(item);
                        setModalVisible(true);
                    }}
                >
                    <Text style={appStyles.readMoreButtonText}>
                        Read more
                    </Text>
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={appStyles.container}>
            <View style={appStyles.headerContainer}>
                <Icon name="newspaper-o"
                    type="font-awesome"
                    color="green" size={30} />
                <Text style={appStyles.header}>
                    News-Mania
                </Text>
            </View>
            <View style={appStyles.categoryPickerContainer}>
                <Text style={appStyles.categoryPickerLabel}>
                    Select Category:
                </Text>
                <RNPickerSelect
                    placeholder={{}}
                    onValueChange={
                        (itemValue) =>
                            setSelectedCategory(itemValue)
                    }
                    items={[
                        { label: 'General', value: 'general' },
                        { label: 'Business', value: 'business' },
                        { label: 'Technology', value: 'technology' },
                        { label: 'Sports', value: 'sports' },
                    ]}
                    style={pickerSelectStyles}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large"
                    color="#3498db"
                    style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.url}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                />
            )}

            <Modal animationType="slide"
                transparent={false} visible={modalVisible}>
                <Overlay isVisible={modalVisible}
                    overlayStyle={appStyles.modalContainer}
                    onBackdropPress={
                        () => setModalVisible(false)
                    }>
                    <Card containerStyle={appStyles.modalCard}>
                        <Card.Title style={appStyles.cardTitle}>
                            {selectedNews?.title}
                        </Card.Title>
                        <Card.Image source={{ uri: selectedNews?.urlToImage }}
                            style={appStyles.cardImage} />
                        <Text>{selectedNews?.content}</Text>
                        <TouchableOpacity style={appStyles.readMoreButton}
                            onPress={openNewsLink}>
                            <Text style={appStyles.readMoreButtonText}>
                                Read Full Article
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </Overlay>
            </Modal>
        </View>
    );
};

export default App;