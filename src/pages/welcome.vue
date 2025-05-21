<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showText = ref(false)
const showImage = ref(false)

onMounted(() => {
  
  setTimeout(() => {
    showText.value = true

    
    setTimeout(() => {
      showImage.value = true

      
      setTimeout(() => {
        router.push('/guid')
      }, 2000) 
    }, 1000)
  }, 50)
})
</script>

<template>
  <div class="layout">
    <div class="container">
     
      <img
        v-if="showImage"
        src="../assets/favicon.png"
        alt="logo"
        class="content-item image fade-in"
      />

     
      <h1
        v-if="showText"
        class="content-item text fade-in"
      >
        欢迎来到 infist 线上面试环节，期待你的加入！
      </h1>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  position: relative;
  width: 500px;
  height: 600px;
}

.content-item {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}

.image {
  top: 0;
  width: 500px;
  height: auto;
}

.text {
  top: 400px;
  font-size: 24px;
  text-align: center;
  width: 100%;
}


.fade-in {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateX(-50%);
  }
}
</style>