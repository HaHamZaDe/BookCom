import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from './PostCard.style';
import {compareDesc, formatDistanceToNow, parseISO} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const getCurrentUser = () => {
    const currentUser = auth().currentUser;
    return currentUser ? currentUser.uid : null;
  };

  useEffect(() => {
    database()
      .ref('users/')
      .on('value', snapshot => {
        const usersData = snapshot.val();
        const posts = [];

        for (const userId in usersData) {
          const user = usersData[userId];

          if (user.shared && user.photos) {
            for (const postId in user.shared) {
              const post = user.shared[postId];
              post.name = user.profile.name;
              post.profile = {photo: user.photos.profile};
              post.userId = userId;
              post.likes = post.likes ?? 0;
              post.isLiked = likedPosts.includes(postId);
              post.id = postId;
              posts.push(post);
            }
          }
        }
        const sortedPosts = posts.sort((a, b) => {
          if (a.date === b.date) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
          return compareDesc(new Date(a.date), new Date(b.date));
        });

        setPosts(sortedPosts);
      });
  }, []);

  const navigation = useNavigation();
  const handleUserProfile = userId => {
    navigation.navigate('GuestProfile', {userId: userId});
  };

  const handleLike = post => {
    if (likedPosts.includes(post.id)) {
      showMessage({
        message: 'You liked this post before!',
        type: 'info',
      });
    } else {
      const updatedPosts = posts.map(p => {
        if (p.id === post.id) {
          return {
            ...p,
            likes: p.likes + 1,
            isLiked: true,
          };
        }
        return p;
      });
      setPosts(updatedPosts);
      setLikedPosts([...likedPosts, post.id]);

      database()
        .ref(`users/${post.userId}/shared/${post.id}/likes`)
        .set(post.likes + 1);

      showMessage({
        message: 'You liked the post!',
        type: 'success',
      });
    }
  };
  const handleDelete = post => {
    Alert.alert(
      'Gönderi Silme',
      'Bu gönderiyi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            // Remove the post from the database
            database().ref(`users/${post.userId}/shared/${post.id}`).remove();

            // Remove the post from the local state
            const updatedPosts = posts.filter(p => p.id !== post.id);
            setPosts(updatedPosts);

            showMessage({
              message: 'Bildirim',
              description: 'Gönderi silindi!',
              type: 'success',
            });
          },
        },
      ],
      {cancelable: false},
    );
  };
  const currentUser = getCurrentUser();

  return (
    <ScrollView style={styles.scroll_view}>
      {posts.map(post => (
        <View key={post.text} style={styles.container}>
          <View style={styles.header_container}>
            <View style={styles.header_info}>
              <TouchableOpacity onPress={() => handleUserProfile(post.userId)}>
                {post.profile.photo ? (
                  <Image
                    style={styles.profile_image}
                    source={{uri: post.profile.photo}}
                  />
                ) : (
                  <Image
                    style={styles.profile_image}
                    source={require('../../../assets/images/defaultProfile.png')}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.name_date}>
                <Text style={styles.user_name}>{post.name}</Text>
                <Text style={styles.date}>
                  {formatDistanceToNow(parseISO(post.date), {addSuffix: true})}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.likes_container}
              onPress={() => handleLike(post)}>
              <Icon
                name="recommend"
                size={22}
                color={post.isLiked ? 'blue' : '#3d342f'}
              />
              <Text style={styles.likes}>{post.likes}</Text>
            </TouchableOpacity>
            {post.userId === currentUser && (
              <TouchableOpacity onPress={() => handleDelete(post)}>
                <Icon name="delete" size={22} color="#3d342f" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.message}>{post.text}</Text>
          <View style={styles.shared_image_container}>
            {post.photo && (
              <Image style={styles.shared_image} source={{uri: post.photo}} />
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PostCard;
