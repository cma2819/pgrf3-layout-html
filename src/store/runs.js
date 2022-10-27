import { Run } from '../types/run.js'
import { Participant } from '../types/runner.js'

export default {
  state: () => ({
    runs: [],
    currentRunners: [],
    currentCommentators: [],
  }),
  getters: {
    runsOnSchedule ({ runs }) {
      return runs.slice(0, 3).map(run => new Run(run))
    },
    currentEst ({ runs }) {
      return runs[0]?.est
    },
    headerInfo ({ runs }) {
      return {
        title: runs[0]?.title,
        category: runs[0]?.category,
        platform: runs[0]?.platform
      }
    },
    footerInfo ({ runs }) {
      if (runs.length > 1 && runs[1].category) {
        return {
          title: runs[1].title,
          category: runs[1].category
        }
      } else {
        return undefined
      }
    }
  },
  mutations: {
    setRuns (state, runs) {
      state.runs = runs
      state.currentRunners = runs[0].runners
        .map(runner => new Participant(runner))
      state.currentCommentators = runs[0].commentators
        .map(commentator => new Participant(commentator))
    },
    rotateAccounts ({ currentRunners, currentCommentators }) {
      currentRunners.forEach(runner => {
        runner.rotateAccountTypes()
      })
      currentCommentators.forEach(commentator => {
        commentator.rotateAccountTypes()
      })
    }
  },
  actions: {
    setRuns ({ commit }, runs) {
      commit('setRuns', runs)
    },
    rotateAccounts ({ commit }) {
      commit('rotateAccounts')
    }
  }
}