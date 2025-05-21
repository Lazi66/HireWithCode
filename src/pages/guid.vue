<template>
  <div class="layout">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">面试流程说明</h1>
    <markdown :content="markdownContent" />
    <button 
      @click="nextStep"
      class="button"
    >
      gogogo
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import markdown from '../components/markdown.vue'

const router = useRouter()

const markdownContent = `
## 面试流程

1. **第一步：接受挑战**
   - 输入您的GitHub ID和邮箱
   - 点击"接受挑战"按钮

2. **第二步：完成项目**
   - 根据要求完成编码挑战
   - 将代码提交到GitHub仓库
   - 部署到Vercel平台

3. **第三步：提交作品**
   - 返回本页面提交您的作品链接
   - 包括GitHub仓库和Vercel部署地址

4. **第四步：等待评估**
   - 我们的团队会评审您的提交
   - 通过后会联系您安排后续面试

## 注意事项

- 请确保所有提交的信息准确无误
- 项目需要在48小时内完成
- 如有任何问题，请联系hr@infist.com
`

const nextStep = () => {
  router.push('/accept')
}
</script>

<style lang="less" scoped>
  //居中
  .layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  margin: 0 auto;
  width: 500px; // 可选：固定宽度
  padding: 30px;
  border: 1px solid #e0e0e0; // 浅灰色边框
  background-color: #fff; // 白色背景
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); // 轻柔的阴影
  border-radius: 12px; // 圆角边框
  }
  .button {
    width: 60rpx;
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

</style>