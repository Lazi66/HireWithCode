<template>
  <div class="markdown-content" v-html="renderedMarkdown"></div>
</template>

<script setup> 
import { marked } from 'marked'
import { computed } from 'vue'
    
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const renderedMarkdown = computed(() => marked(props.content))
</script>

<style scoped>
.markdown-content {
  @apply text-left p-5 bg-white rounded-lg shadow-sm;
}

.markdown-content >>> h1 {
  @apply text-2xl font-bold border-b border-gray-200 pb-2 mb-4;
}

.markdown-content >>> h2 {
  @apply text-xl font-semibold mt-6 mb-3;
}

.markdown-content >>> ul {
  @apply pl-5;
}

.markdown-content >>> li {
  @apply mb-2 list-disc;
}
</style>