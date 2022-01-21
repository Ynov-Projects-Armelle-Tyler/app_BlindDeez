import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
// import { getApi } from '../services/getApi';

export default function Login() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    const result = await getApi.login({ data });
    if (result) setIsLogged(true)
  };

  return (
        <View>
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Username'
              />
            )}
            name="username"
          />
          { errors.email && (
                <Text style={{ color: 'red' }}>Invalid username</Text>
          )}
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Email'
              />
            )}
            name="email"
          />
          { errors.email && (
                <Text style={{ color: 'red' }}>Invalid email</Text>
          )}
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Password'
              />
            )}
            name="password"
          />
         { errors.password && (
                <Text style={{ color: 'red' }}>Invalid password</Text>
          )}
            <Button
              onPress={handleSubmit(onSubmit)}
              title="Signup"
            />
      </View>
  );
}
