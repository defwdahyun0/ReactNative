import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components'; 
//import { images } from './utils/images' //백엔드에서 이미지 불러오기
//import {TouchableWithoutFeedback, Keyboard} from 'react-native'; //키보드 감추는 기능
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; //키보드 스크롤 기능
import { validateEmail, removeWhitespace} from '../utils/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'; //화면짤림문제해결, 노치 디자인 대응, padding값 얻기,useSafeAreaInsets Hook

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(); //키보드 next(tab)로 아이디 입력창에서 비밀번호 입력창으로 이동 가능
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(id && password && !errorMessage));
  }, [id, password, errorMessage]);

  const _handleIdChange = id => {
    setId(removeWhitespace(id));
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };
  const _handleLoginButtonPress = () => {};

  return (
    <Container insets={insets}>
      <Image />
        <Input
          label="ID"
          value={id}
          onChangeText={_handleIdChange} 
          onSubmitEditing={() => (_handleLoginButtonPress)}
          placeholder="ID"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={()=>{}}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
    </Container>
  );
};

export default Login;

/*
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Alert, Button } from 'react-native';
import { Image, Input } from '../components'; 
//import { images } from './utils/images' //백엔드에서 이미지 불러오기
//import {TouchableWithoutFeedback, Keyboard} from 'react-native'; //키보드 감추는 기능
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; //키보드 스크롤 기능
import { validateEmail, removeWhitespace} from '../utils/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'; //화면짤림문제해결, 노치 디자인 대응, padding값 얻기,useSafeAreaInsets Hook
import { ProgressContext, UserContext } from '../contexts'; 
import { useContext } from 'react';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(UserContext);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(); //키보드 next(tab)로 아이디 입력창에서 비밀번호 입력창으로 이동 가능
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(!(id && password && !errorMessage));
  }, [id, password, errorMessage]);

  const _handleIdChange = id => {
    setId(removeWhitespace(id));
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };
  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await Login({id, password});
      dispatch(user);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container insets={insets}>
      <Image />
        <Input
          label="ID"
          value={id}
          onChangeText={_handleIdChange} 
          onSubmitEditing={() => (_handleLoginButtonPress)}
          placeholder="ID"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={()=>{}}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
    </Container>
  );
};

export default Login;
*/