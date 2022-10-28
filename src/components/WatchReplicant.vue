<script setup>
/* global nodecg */
import { ref, defineProps, onMounted } from 'vue'
import { useStore } from 'vuex';

const state = useStore();


const dtToFormatString = (dt) => {

  const date = `${dt.getFullYear()}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}`;
  const time = `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`

  return `${date} ${time}`
}

onMounted(() => {
  /** @type import('../../../nodecg/speedcontrol').SpeedcontrolInstance */
  const scNodecg = nodecg;
  /** @type import('../../../nodecg/speedcontrol-additions').SpeedcontrolAdditionsInstance */
  const additionNodecg = nodecg;

  scNodecg.Replicant('runDataActiveRunSurrounding', 'nodecg-speedcontrol').on('change', (surrounding) => {
    scNodecg.readReplicant('runDataArray', 'nodecg-speedcontrol', (runArray) => {
    const current = surrounding.current;

      const currentIndex = Math.max(runArray.findIndex((run) => run.id === current), 0);

      additionNodecg.readReplicant('commentatorArray', 'speedcontrol-additions', (commentators) => {
        additionNodecg.readReplicant('speedcontrolUserAdditionArray', 'speedcontrol-additions', (userAdditions) => {

          const runs = runArray.slice(currentIndex, currentIndex + 4).map((run) => {
            return {
              title: run.game || '',
              category: run.category || '',
              platform: run.system || '',
              startsAt: dtToFormatString(new Date(run.scheduled)),
              est: run.estimate || '',
              runners: run.teams.flatMap(team => team.players.map((player) => {
                const addition = userAdditions.find(add => add.id === player.id);
                return {
                  id: team.id,
                  name: player.name,
                  accounts: {
                    twitch: player.social.twitch,
                    twitter: addition?.social?.twitter,
                    nico: addition?.social?.nico,
                    youtube: addition?.social?.youtube,
                  }
                };
              })),
              commentators: commentators.filter(commentator => commentator.assignedRunIdArray
                .includes(run.externalID)).map((commentator) => {
                  return {
                    name: commentator.name,
                    accounts: commentator.social,
                  };
                }),
            };
          });
          state.dispatch('setRuns', runs);
        });

      });
    });
  });

  const stateMapping = {
    stopped: 'suspend',
    running: 'running',
    paused: 'suspend',
    finished: 'complete',
  };
  scNodecg.Replicant('timer', 'nodecg-speedcontrol').on('change', (newVal) => {
    state.dispatch('setTimer', {
      time: newVal.time || '00:00',
      status: stateMapping[newVal.state || 'paused'],
      split: (Object.entries(newVal.teamFinishTimes) || []).map(([id, times]) => {
        return {
          id,
          time: times.time,
        };
      }),
    });
  });

  /** @type import('../../../nodecg/spotify').SpotifyWidgetInstance */
  const spotifyNodecg = nodecg;
  spotifyNodecg.Replicant('spotifyPlayingTrack', 'nodecg-spotify-widget').on('change', (newVal) => {
    state.dispatch('setMusic', {
      title: newVal?.name || '',
      artist: newVal?.artists.join(',') || '',
    });
  });

  /** @type import('../../../nodecg/twitter').TwitterWidgetInstance */
  const twitterNodecg = nodecg;
  twitterNodecg.Replicant('activeTweet', 'nodecg-twitter-widget').on('change', (newVal) => {
    state.dispatch('setTweet', newVal && {
      id: newVal.screenName,
      icon: newVal.profileImageUrl,
      content: newVal.text,
    });
  });

/** @type import('../../../browser/global').BundleNodecgInstance */
  const bundleNodecg = nodecg;
  bundleNodecg.Replicant('runner-scores').on('change', (newVal) => {
    state.dispatch('setScores', newVal.filter(score => score.score !== null));
  })
});

</script>
