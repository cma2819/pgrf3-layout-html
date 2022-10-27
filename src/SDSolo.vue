<template>
  <WatchReplicant></WatchReplicant>
  <Background></Background>
  <header>
    <Header></Header>
  </header>
  <main>
    <div id="sidebar">
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
          v-for="( commentator, index ) in commentators"
          :key="index"
          label="Commentator"
          :value="commentator.name"
          :account="commentator.currentAccount()"
        ></InfoBox>
        <InfoBox time label="EST">
          <TimeValue :value="est"></TimeValue>
        </InfoBox>
        <InfoBox time label="Current Time">
          <TimeValue :value="time" :status="timerStatus"></TimeValue>
        </InfoBox>
      </div>
    </div>
    <Video :style="{ width, height }"></Video>
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Background from './components/Background.vue'
import Header from './components/game/Header.vue'
import Tweet from './components/Tweet.vue'
import InfoBox from './components/game/InfoBox.vue'
import TimeValue from './components/game/TimeValue.vue'
import Video from './components/game/Video.vue'
import Footer from './components/game/Footer.vue'
import WatchReplicant from './components/WatchReplicant.vue'

const width = ref(`${1920 * 0.64}px`)
const height = ref(`${1440 * 0.64}px`)

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

$marginX: 64px;

header {
  margin: 0 $marginX;
  padding: 8px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
}

main {
  margin: 0 $marginX;
  display: flex;
  justify-content: space-evenly;
}

#sidebar {
  width: 420px;
  display: flex;
  flex-direction: column;
}

#infos {
  margin-top: auto;
}

footer {
  margin: 0 $marginX;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  line-height: 1em;
}
</style>
