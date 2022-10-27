<template>
  <WatchReplicant></WatchReplicant>
  <Background></Background>
  <header>
    <Header></Header>
  </header>
  <main>
    <div id="runners">
      <div class="runner" v-if="runners[0]">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense label="Runner I">
          <TextValue
            :value="runners[0].name"
            :account="runners[0].currentAccount()"
          ></TextValue>
        </InfoBox>
        <Split :id="runners[0].id"></Split>
      </div>
      <div class="runner" v-if="runners[1]">
        <Video :style="{ width, height }"></Video>
        <InfoBox dense label="Runner II" v-if="runners[1]">
          <TextValue
            :value="runners[1].name"
            :account="runners[1].currentAccount()"
          ></TextValue>
        </InfoBox>
        <Split :id="runners[1].id" v-if="runners[1]"></Split>
      </div>
    </div>
    <div id="others">
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
import Split from './components/game/Split.vue'
import Video from './components/game/Video.vue'
import Tweet from './components/Tweet.vue'
import Footer from './components/game/Footer.vue'
import WatchReplicant from './components/WatchReplicant.vue'

const width = ref(`${1920 * 0.48}px`)
const height = ref(`${1080 * 0.48}px`)

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
  flex-grow: 1;
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#runners {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.runner {
  display: flex;
  flex-direction: column;
}

#others {
  flex-grow: 1;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 32px;
  align-items: end;
}

#commentators{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2%;
}

#times {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

footer {
  height: 2em;
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  line-height: 1em;
}
</style>
