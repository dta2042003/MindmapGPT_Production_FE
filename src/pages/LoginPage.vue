<script setup lang="ts">
import { NCard, NLayout, NLayoutContent, NForm, NFormItem, NInput, NButton  } from 'naive-ui'
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { loginUser } from '@/api/auth.ts';;
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

const { handleSubmit } = useForm({ validationSchema: loginSchema });

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const message = ref('');
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  const result = await loginUser({
    email: email.value,
    passwordHash: password.value,
  });
  loading.value = false;

  if (result.success) {
    message.value = 'Đăng nhập thành công..';
    window.location.href = "http://localhost:5173/home";
  } else {
    message.value = result.message;
  }
};

const onSubmit = handleSubmit(() => {
  handleLogin();
});
</script>

<template>
  <NLayout style="height: 100vh; display: flex; align-items: center; justify-content: center;">
    <NLayoutContent>
      <NCard style="width: 400px;">
        <h2>Đăng nhập</h2>
        <NForm @submit="onSubmit">
    <NFormItem label="Email" :feedback="emailError">
      <NInput v-model:value="email" placeholder="Nhập email" />
    </NFormItem>

    <NFormItem label="Mật khẩu" :feedback="passwordError">
      <NInput v-model:value="password" type="password" placeholder="Nhập mật khẩu" />
    </NFormItem>

    <NButton type="primary" block attr-type="submit">Đăng nhập</NButton>
    <p>{{ message }}</p>
  </NForm>
  <div class="register-link">
    <span>Bạn chưa có tài khoản?</span>
    <router-link to="/register">Đăng ký ngay</router-link>
  </div>
      </NCard>
    </NLayoutContent>
  </NLayout>
</template>
