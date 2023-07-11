import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';

import Login from './Pages/Auth/Login/Login';
import Sign from './Pages/Auth/Sign/Sign';
import Home from './Pages/BottomTabPages/Home/Home';
import Favorites from './Pages/BottomTabPages/Favorites/Favorites';
import BookDetail from './Pages/BookDetail/BookDetail';
import Profile from './Pages/BottomTabPages/Profile/Profile';
import Social from './Pages/BottomTabPages/Social/Social';
import GuestProfile from './Pages/GuestProfile/GuestProfile';
import TabBarIcon from './Components/TabBarIcon/TabBarIcon';
import colors from './styles/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged(loggedIn => {
      setUserSession(!!loggedIn);
    });
  }, []);
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="SignScreen" component={Sign} />
      </Stack.Navigator>
    );
  };

  const TabPages = () => {
    return (
      <Tab.Navigator screenOptions={TabBarScreenOptions}>
        <Tab.Screen name="Home" component={Home} options={HomeOptions} />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={FavoritesOptions}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={ProfileOptions}
        />
        <Tab.Screen name="Social" component={Social} options={SocialOptions} />
      </Tab.Navigator>
    );
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {!userSession ? (
            <Stack.Screen
              name="AuthScreen"
              component={AuthStack}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="TabPages"
              component={TabPages}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen name="BookDetail" component={BookDetail} />
          <Stack.Screen
            name="GuestProfile"
            component={GuestProfile}
            options={GuestProfileOptions}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
const TabBarScreenOptions = ({route}) => ({
  tabBarShowLabel: false,
  tabBarInactiveBackgroundColor: 'white',
  tabBarActiveBackgroundColor:
    route.name === 'Home'
      ? 'white'
      : route.name === 'Profile'
      ? 'white'
      : route.name === 'Settings'
      ? 'white'
      : 'white',
});

const HomeOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="home" focused={focused} />,
});

const FavoritesOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="favorite" focused={focused} />,
});
const ProfileOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3d342f',
  },
  tabBarIcon: ({focused}) => (
    <TabBarIcon name="account-circle" focused={focused} />
  ),
});
const SocialOptions = () => ({
  headerShown: false,
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#3d342f',
  },
  tabBarIcon: ({focused}) => <TabBarIcon name="sms" focused={focused} />,
});
const GuestProfileOptions = () => ({
  headerStyle: {
    backgroundColor: colors.darkgreen,
  },
  headerTitle: 'Profile',
  headerShown: true,
});
export default Router;
