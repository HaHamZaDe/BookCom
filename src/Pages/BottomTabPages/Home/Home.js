import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, FlatList, ScrollView} from 'react-native';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useFetch from '../../../hooks/useFetch/useFetch';
import Loading from '../../../Components/Loading/Loading';
import Error from '../../../Components/Error/Error';
import BookCard from '../../../Components/cards/BookCard/BookCard';
import Input from '../../../Components/Input/Input';
import styles from './Home.style';
import colors from '../../../styles/colors';

const Home = ({navigation}) => {
  const urls = [
    Config.ScienceFiction_API_URL,
    Config.Horror_API_URL,
    Config.Theatre_API_URL,
    Config.History_API_URL,
  ];
  const [listData, setListData] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  const {loading, data, error} = useFetch(urls);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const updatedListData = data.map(item => item.items);
      setListData(updatedListData);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  const handleBookSelect = item => {
    navigation.navigate('BookDetail', {item});
  };
  const renderBooks = ({item}) => {
    if (
      searchedText &&
      !item.volumeInfo.title.toLowerCase().includes(searchedText.toLowerCase())
    ) {
      return null;
    }
    return (
      <BookCard
        volumeInfo={item.volumeInfo}
        onSelect={() => handleBookSelect(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input_container}>
        <Input
          value={searchedText}
          placeholder="Search books..."
          onType={text => setSearchedText(text)}
        />
        <Icon
          style={styles.input_icon}
          name="search"
          size={30}
          color={colors.darkgreen}
        />
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <Text style={styles.headers}>Science Fiction Books</Text>
          <FlatList
            horizontal
            data={listData[0]}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        </View>

        <View>
          <Text style={styles.headers}>Horror Books</Text>
          <FlatList
            horizontal
            data={listData[1]}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        </View>

        <View>
          <Text style={styles.headers}>Theatre Books</Text>
          <FlatList
            horizontal
            data={listData[2]}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        </View>

        <View>
          <Text style={styles.headers}>History Books</Text>
          <FlatList
            horizontal
            data={listData[3]}
            renderItem={renderBooks}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
