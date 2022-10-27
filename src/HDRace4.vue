<template>
  <WatchReplicant></WatchReplicant>
  <Background></Background>
  <header>
    <Header dense></Header>
  </header>
  <main>
    <div id="others">
      <Tweet from="left" small style="margin-bottom: auto"></Tweet>
      <div id="commentators">
        <InfoBox v-for="( commentator, index ) in commentators" :key="index" label="Commentator">
          <TextValue :value="commentator.name" :account="commentator.currentAccount()"></TextValue>
        </InfoBox>
      </div>
      <div id="times">
        <InfoBox time label="EST">
          <TimeValue :value="est"></TimeValue>
        </InfoBox>
        <InfoBox time label="Current Time">
          <TimeValue :value="time" :status="timerStatus"></TimeValue>
        </InfoBox>
      </div>
    </div>
    <div id="runners" v-if="runners[0]">
      <div class="runner">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense>
          <TextValue
            one-line
            :value="runners[0].name"
            :account="runners[0].currentAccount()"
          ></TextValue>
        </InfoBox>
        <slot name="split1" :runnerId="runners[0].id">
          <Split small :id="runners[0].id"></Split>
        </slot>
      </div>
      <div class="runner" v-if="runners[1]">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense v-if="runners[1]">
          <TextValue
            one-line
            :value="runners[1].name"
            :account="runners[1].currentAccount()"
          ></TextValue>
        </InfoBox>
        <slot name="split2" :runnerId="runners[1].id" v-if="runners[1]">
          <Split small :id="runners[1].id"></Split>
        </slot>
      </div>
      <div class="runner" v-if="runners[2]">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense v-if="runners[2]">
          <TextValue
            one-line
            :value="runners[2].name"
            :account="runners[2].currentAccount()"
          ></TextValue>
        </InfoBox>
        <slot name="split3" :runnerId="runners[2].id" v-if="runners[2]">
          <Split small :id="runners[2].id"></Split>
        </slot>
      </div>
      <div class="runner" v-if="runners[3]">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense v-if="runners[3]">
          <TextValue
            one-line
            :value="runners[3].name"
            :account="runners[3].currentAccount()"
          ></TextValue>
        </InfoBox>
        <slot name="split4" :runnerId="runners[3].id" v-if="runners[3]">
          <Split small :id="runners[3].id"></Split>
        </slot>
      </div>
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
import Split from './components/game/Split.vue'
import Video from './components/game/Video.vue'
import Tweet from './components/Tweet.vue'
import Footer from './components/game/Footer.vue'
import WatchReplicant from './components/WatchReplicant.vue'

const scale = 0.37
const width = ref(`${1920 * scale}px`)
const height = ref(`${1080 * scale}px`)

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
  height: 60px;
}

main {
  flex-grow: 1;
  margin: 0 $marginX;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 32px;
}

#runners {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  justify-content: center;
  row-gap: 4px;
  column-gap: 16px;
}

.runner {
  display: flex;
  flex-direction: column;
}

#others {
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 320px;
}

#commentators{
  display: flex;
  flex-direction: column;
  width: 100%;
}

#times {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
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
