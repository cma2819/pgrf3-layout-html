<template>
  <Background></Background>
  <header>
    <Header></Header>
  </header>
  <main>
    <div id="videos">
      <Video :style="{ width: mainWidth, height: mainHeight }"></Video>
      <Video :style="{ width: subWidth, height: subHeight }"></Video>
    </div>
    <div id="others">
      <div id="participators">
        <InfoBox
          dense
          v-for="runner in runners"
          :key="runner.id"
          label="Runner"
          :value="runner.name"
          :account="runner.currentAccount()"
        ></InfoBox>
        <InfoBox dense v-for="( commentator, index ) in commentators" :key="index" label="Commentator">
          <TextValue :value="commentator.name" :account="commentator.currentAccount()"></TextValue>
        </InfoBox>
      </div>
      <div id="times">
        <InfoBox dense time label="EST">
          <TimeValue :value="est"></TimeValue>
        </InfoBox>
        <InfoBox dense time label="Current Time">
          <TimeValue :value="time" :status="timerStatus"></TimeValue>
        </InfoBox>
      </div>
      <Tweet from="right" small></Tweet>
    </div>
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
import InfoBox from './components/game/InfoBox.vue'
import TextValue from './components/game/TextValue.vue'
import TimeValue from './components/game/TimeValue.vue'
import Video from './components/game/Video.vue'
import Tweet from './components/Tweet.vue'
import Footer from './components/game/Footer.vue'

const mainWidth = ref(`${1920 * 0.64}px`)
const mainHeight = ref(`${1152 * 0.64}px`)
const subWidth = ref(`${1920 * 0.28}px`)
const subHeight = ref(`${1440 * 0.28}px`)

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
  flex-grow: 1;
  margin: 0 $marginX;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#videos {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
}

.runner {
  display: flex;
  flex-direction: column;
}

#others {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 32px;
  align-items: end;
}

#participators {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  gap: 2%;
}

#times {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

footer {
  height: 2em;
  margin: 0 $marginX;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  line-height: 1em;
}
</style>
