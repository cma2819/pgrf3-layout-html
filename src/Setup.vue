<template>
  <WatchReplicant></WatchReplicant>
  <Background animated></Background>
  <header>
    <Header></Header>
  </header>
  <main>
    <Schedule style="width: 1440px;"></Schedule>
    <div id="tweet-container" style="height: 150px;">
      <Tweet from="top" style="width: 1600px"></Tweet>
    </div>
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script setup>
import Background from './components/Background.vue'
import Header from './components/setup/Header.vue'
import Footer from './components/setup/Footer.vue'
import Schedule from './components/setup/Schedule.vue'
import Tweet from './components/Tweet.vue'
import WatchReplicant from './components/WatchReplicant.vue'
</script>

<style lang="scss">
@import '/src/stylesheets/common.css';
$headerHeight: 120px;
$footerHeight: 80px;

#root {
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: $headerHeight;
  padding: 0 48px;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 1080px - $headerHeight;
  padding: 0 64px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $footerHeight;
  padding: 0 48px;
}
</style>
