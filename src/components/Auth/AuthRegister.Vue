<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { registerUser } from '../../api/auth';
import * as yup from 'yup'; 
import { NForm, NFormItem, NInput, NButton } from 'naive-ui';

const loginSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

const { handleSubmit } = useForm({ validationSchema: loginSchema });

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const message = ref('');
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  const result = await registerUser({
    email: email.value,
    passwordHash: password.value,
  });
  loading.value = false;

  if (result.success) {
    message.value = 'Đăng ký thành công! Chuyển hướng đến trang đăng nhập...';
    window.location.href = "http://localhost:5173/login";
  } else {
    message.value = result.message;
  }
};
const onSubmit = handleSubmit(() => {
  handleRegister();
});
</script>

<template>
  <NForm @submit="onSubmit">
    <NFormItem label="Email" :feedback="emailError">
      <NInput v-model:value="email" placeholder="Nhập email" />
    </NFormItem>

    <NFormItem label="Mật khẩu" :feedback="passwordError">
      <NInput v-model:value="password" type="password" placeholder="Nhập mật khẩu" />
    </NFormItem>

    <NButton type="primary" block attr-type="submit">Đăng Ký</NButton>
    <p>{{ message }}</p>
  </NForm>
  <div class="register-link">
    <span>Bạn đã có tài khoản?</span>
    <router-link to="/login">Đăng nhập ngay</router-link>
  </div>
</template>
