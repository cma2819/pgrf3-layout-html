export default {
  state: () => ({
    tweet: null,
  }),
  getters: {
    tweet: ({ tweet }) => tweet
  },
  mutations: {
    setTweet (state, tweet) {
      state.tweet = tweet
    }
  },
  actions: {
    setTweet ({ commit }, tweet) {
      commit('setTweet', tweet)
    }
  }
}