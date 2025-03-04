<script setup lang="ts">
import { NLayout, NAlert, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const amount = 35000; // ✅ Số tiền cố định 35,000 VND
const bankName = "BVBank";
const accountName = "MOMO_DO TRUONG AN";
const accountNumber = "99MM23340M48449187";
const branch = "Ha Noi";
const transferNote = "Buy Premium - Email: youremail@gmail.com";

// ✅ Đường dẫn ảnh mã QR (Thay bằng link ảnh QR code của bạn)
const qrImageUrl = "/qrCode.jpg"; // Đảm bảo ảnh nằm trong thư mục `public`

// ✅ Xử lý quay về trang Home
const goToHome = () => {
  router.push('/home');
};
</script>

<template>
  <NLayout style="height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
    <NLayoutContent 
      style="
        width: 900px; 
        display: flex; 
        flex-direction: row; 
        align-items: center; 
        justify-content: space-between;
        padding: 30px;
        background: #1e1e1e;
        border-radius: 12px;
        box-shadow: 0px 0px 10px rgba(255,255,255,0.1);
        text-align: center;"
    >
      <!-- ✅ Cột 1: Thông tin chuyển khoản -->
      <div style="width: 50%; padding-right: 20px;">
        <h2>Mua gói Premium</h2>
        <h3>Số tiền: <span style="color: #ff4d4f;">{{ amount.toLocaleString() }} VND</span></h3>

        <h3>Thông tin chuyển khoản</h3>
        <p><strong>Ngân hàng:</strong> {{ bankName }}</p>
        <p><strong>Chủ tài khoản:</strong> {{ accountName }}</p>
        <p><strong>Số tài khoản:</strong> {{ accountNumber }}</p>
        <p><strong>Chi nhánh:</strong> {{ branch }}</p>
        <p><strong>Nội dung chuyển khoản:</strong> <span style="color: #1677ff;">{{ transferNote }}</span></p>

        <NAlert type="info" title="Sau khi chuyển khoản, vui lòng chờ xác nhận hoặc liên hệ admin!" style="margin-bottom: 15px;" />

        <!-- ✅ Nút quay về trang Home -->
        <NButton type="primary" @click="goToHome">
          Quay về trang chủ
        </NButton>
      </div>

      <!-- ✅ Cột 2: Mã QR -->
      <div style="width: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h3>Quét mã QR để chuyển khoản</h3>
        <img :src="qrImageUrl" alt="QR Code Momo" style="width: 80%; max-width: 300px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255,255,255,0.2);" />
      </div>

    </NLayoutContent>
  </NLayout>
</template>
