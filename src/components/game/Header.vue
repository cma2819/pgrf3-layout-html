<template>
  <img id="logo" :src="logo" />
  <div id="title" :class="{ dense }">
    <div id="game-title" :class="{ dense }" ref="title">{{ info.title }}</div>
    <p id="category-platform">{{ info.category }} - {{ info.platform }}</p>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  dense: Boolean
})
const store = useStore()
const info = computed(() => store.getters.headerInfo)

const title = ref(null)
const scaleTitle = () => {
  const maxTitleWidth = 1700

  const titleTextElement = title.value
  const titleWidth = titleTextElement.getBoundingClientRect()['width']

  if (titleWidth > maxTitleWidth) {
    titleTextElement.style.transform = `scale(${maxTitleWidth / titleWidth})`
    const scaledWidth = titleTextElement.getBoundingClientRect()['width']
    titleTextElement.parentNode.style.width = `${scaledWidth}px`
  } else {
    titleTextElement.style.transform = ''
    titleTextElement.parentNode.style.width = ''
  }
}

const logo = ref('');

onMounted(() => {
  nodecg.Replicant('assets:logo').on('change', (newVal) => {
    logo.value = newVal[0]?.url || '';
  });
  scaleTitle();
})
onUpdated(scaleTitle)
</script>

<style lang="scss" scoped>
#logo {
  height: 100%;
  margin-right: calc(1080px * 0.02);

  &.dense {
    height: 60%;
  }
}

#title {
  &.dense {
    display: flex;
    align-items: center;
  }

  div, p {
    margin-top: -0.2em;
    margin-bottom: 0;
    line-height: 1.2em;
    white-space: nowrap;
  }
}

#game-title {
  font-size: 1.9em;
  font-weight: bolder;
  transform-origin: left;

  &.dense {
    font-size: 1.6em;
    margin-right: 1em;
  }
}

#category-platform {
  font-size: 1.2em;
}
</style>
