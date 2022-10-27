<template>
  <WatchReplicant></WatchReplicant>
  <Background></Background>
  <header>
    <Header></Header>
  </header>
  <main :style="{ gridTemplateColumns: `1fr ${video1.width}` }">
    <div id="sidebar">
      <Video :style="video2"></Video>
      <Tweet small></Tweet>
      <div id="infos">
        <InfoBox
          v-for="runner in runners"
          :key="runner.id"
          label="Runner"
          :value="runner.name"
          :account="runner.currentAccount()"
        ></InfoBox>
        <InfoBox
          v-for="(commentator, index) in commentators"
          :key="index"
          label="Commentator"
          :value="commentator.name"
          :account="commentator.currentAccount()"
        ></InfoBox>
        <InfoBox time label="EST" id="est">
          <TimeValue :value="est"></TimeValue>
        </InfoBox>
        <InfoBox time label="Current Time" id="current-time">
          <TimeValue :value="time" :status="timerStatus"></TimeValue>
        </InfoBox>
      </div>
    </div>
    <Video :style="video1"></Video>
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Background from './components/Background.vue'
import Header from './components/game/Header.vue'
import Tweet from './components/Tweet.vue'
import InfoBox from './components/game/InfoBox.vue'
import TimeValue from './components/game/TimeValue.vue'
import Video from './components/game/Video.vue'
import Footer from './components/game/Footer.vue'
import WatchReplicant from './components/WatchReplicant.vue'

const video1 = computed(() => ({
  width: `${1920 * 0.64}px`,
  height: `${1080 * 0.64}px`
}))
const video2 = computed(() => ({
  width: `${720 * 0.8}px`,
  height: `${480 * 0.8}px`
}))

const store = useStore()
const est = computed(() => store.getters.currentEst)
const time = computed(() => store.getters.formattedTime)
const timerStatus = computed(() => store.state.timer.status)
const runners = computed(() => store.state.runs.currentRunners)
const commentators = computed(() => store.state.runs.currentCommentators)

onMounted(() => {
  setInterval(() => {
    store.dispatch('rotateAccounts')
  }, 10000)
})
</script>

<style lang="scss">
@import '/src/stylesheets/common.css';
@import '/src/stylesheets/game.css';

header {
  margin: 0 16px;
  padding: 8px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
}

main {
  margin: 0 16px;
  display: grid;
  flex-grow: 1;
  align-items: flex-end;
}

#sidebar {
  height: 100%;
  margin-right: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

#infos {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

#est, #current-time {
  grid-row: 2;
}

footer {
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  line-height: 1em;
}
</style>
