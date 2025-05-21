<template>
  <div class="layout">
    <form @submit.prevent="submitForm">
      <div class="form-group githubid">
        <label>Git仓库:</label>
        <input 
          type="url" 
          placeholder="GitHub 仓库 URL" 
          v-model="data.git_url"
          pattern="https?://github.com/.*"
          required
        >
      </div>

      <div class="form-group email">
        <label>体验地址:</label>
        <input 
          type="url" 
          placeholder="Vercel 在线地址" 
          v-model="data.use_url"
          pattern="https?://.*"
          required
        >
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? '提交中...' : '提交作品' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { submitSubmission } from '../utils/supabaseClient.js'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const data = ref({ git_url: '', use_url: '' })

onMounted(() => {
  if (route.query.fromAccept) {
    localStorage.removeItem('accepted')
  }
})

const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const submitForm = async () => {
  try {
    loading.value = true

    // 前端验证
    if (!data.value.git_url.trim() || !data.value.use_url.trim()) {
      throw new Error('请填写完整信息！')
    }

    if (!validateURL(data.value.git_url) || !validateURL(data.value.use_url)) {
      throw new Error('请输入有效的 URL 地址！')
    }

    // 提交到 Supabase
    const success = await submitSubmission(
      data.value.git_url.trim(),
      data.value.use_url.trim()
    )

    if (!success) throw new Error('提交失败，请重试')

    // 成功处理
    alert('提交成功！')
    router.push('/success') // 创建 success 页面或跳转到其他路由
    
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>



<style lang="less" scoped>
.layout {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa; 
}

form {
    width: 100%;
    max-width: 420px;
    padding: 36px 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    font-family: 'Segoe UI', sans-serif;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-group {
   display: flex;
    align-items: center;
    margin-bottom: 24px;
    gap: 12px; 

    label {
    width: 40px;
    font-size: 15px;
    color: #555;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-end; 
    height: 40px;
    box-sizing: border-box;
    }

    input {
        flex: 1;              
        padding: 12px 14px;
        font-size: 15px;
        border: 1px solid #dcdcdc;
        border-radius: 10px;
        background-color: #fdfdfd;
        transition: all 0.3s ease;
        outline: none;
        box-sizing: border-box;
        // margin-left: 8px;     
        margin-right: 16px;   
    }

    input:focus {
        border-color: #aaa;
        background-color: white;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}


.githubid{
    margin-bottom: 20px;
}
.email {
    margin-bottom: 20px;
}

input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: all 0.3s ease;
    outline: none;
    background-color: #f9f9f9;
}

input[type="text"]:focus,
input[type="email"]:focus {
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
    background-color: #ffffff;
}

::placeholder {
    color: #a0a0a0;
    opacity: 1;
}

button[type="submit"] {
    width: 100%;
    padding: 12px;
    background-color: #4c9ffe;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 12px;
    box-shadow: 0 4px 12px rgba(76, 159, 254, 0.2);
}

button[type="submit"]:hover {
    background-color: #3a8ce5;
}

button[type="submit"]:active {
    transform: translateY(0);
}

@media (max-width: 480px) {
    form {
        padding: 24px 28px;
        border-radius: 12px;
    }

    .form-group {
        flex-direction: row;
        margin-bottom: 20px;
    }

    button[type="submit"] {
        padding: 10px;
        font-size: 15px;
    }
}
</style>