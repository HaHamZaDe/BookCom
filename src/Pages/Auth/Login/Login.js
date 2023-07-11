import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import styles from './Login.style';
import Loading from '../../../Components/Loading/Loading';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  usermail: yup
    .string()
    .email('Geçerli bir e-posta adresi girin')
    .required('E-posta adresi gereklidir'),
  password: yup.string().required('Şifre gereklidir'),
});

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const handleSignUp = () => {
    navigation.navigate('SignScreen');
  };

  async function handleFormSubmit(values) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(values.usermail, values.password);
      setLoading(false);
      navigation.navigate('TabPages');
    } catch (error) {
      console.log(error);
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/LogoBookCom.png')}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.form_container}>
          <Formik
            initialValues={formValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            enableReinitialize>
            {({handleChange, handleSubmit, errors, touched}) => (
              <>
                <Input
                  value={formValues.usermail}
                  onType={value => {
                    handleChange('usermail')(value);
                    setFormValues(prevFormValues => ({
                      ...prevFormValues,
                      usermail: value,
                    }));
                  }}
                  placeholder="e-posta giriniz"
                  error={touched.usermail && errors.usermail}
                  name="email"
                  size={17}
                />
                <Input
                  value={formValues.password}
                  onType={value => {
                    handleChange('password')(value);
                    setFormValues(prevFormValues => ({
                      ...prevFormValues,
                      password: value,
                    }));
                  }}
                  placeholder="şifre giriniz"
                  isSecure
                  error={touched.password && errors.password}
                  name="vpn-key"
                  size={17}
                />
                <Button text={'Giriş Yapın'} onPress={handleSubmit} />
              </>
            )}
          </Formik>
          <Button
            text={'Kayıt Ol'}
            theme="secondary"
            onPress={handleSignUp}
            loading={loading}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
