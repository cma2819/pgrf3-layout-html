<template>
  <WatchReplicant></WatchReplicant>
  <SDRace4>
    <template #split1="{ runnerId }">
      <div class="score">
        <p><Counter :destination="scoreOf(runnerId)"></Counter>pts.</p>
      </div>
    </template>
    <template #split2="{ runnerId }">
      <div class="score">
        <p><Counter :destination="scoreOf(runnerId)"></Counter>pts.</p>
      </div>
    </template>
    <template #split3="{ runnerId }">
      <div class="score">
        <p><Counter :destination="scoreOf(runnerId)"></Counter>pts.</p>
      </div>
    </template>
    <template #split4="{ runnerId }">
      <div class="score">
        <p><Counter :destination="scoreOf(runnerId)"></Counter>pts.</p>
      </div>
    </template>
  </SDRace4>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SDRace4 from './SDRace4.vue'
import Counter from './components/game/Counter.vue'
import WatchReplicant from './components/WatchReplicant.vue'

const store = useStore()
const scoreOf = computed(() => store.getters.scoreOf)
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); 
$height: 1.1em;

.score {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    font-family: 'Press Start 2P', sans-serif;
    font-size: 0.8em;
    height: $height;
    line-height: $height;
    margin-top: 4px;
    text-align: right;
    color: white;
    background-color: black;
    padding: 0.2em;
  }
}
</style>