import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { generateAntWinLikelihoodCalculator } from "@/lib/utils";

Vue.use(Vuex);

const DEFAULT_STATE = {
  ants: []
};

export default new Vuex.Store({
  state: DEFAULT_STATE,
  getters: {
    getAntsData: state => {
      return state.ants;
    },
    getSortedAntsData: state => {
      let comparator = (a, b) => {
        // if Win Chance hasn't been determined yet
        // sort it to the bottom of the list
        let aw = typeof a["Win Chance"] === "string" ? -1 : a["Win Chance"],
          bw = typeof b["Win Chance"] === "string" ? -1 : b["Win Chance"];

        let comparison = 0;
        if (aw > bw) {
          comparison = -1;
        } else if (aw < bw) {
          comparison = 1;
        }
        return comparison;
      };

      // sort a copy of the state
      return [...state.ants].sort(comparator);
    },

    allAntsFinishedCalculating: state => {
      return state.ants.every(ant => typeof ant["Win Chance"] === "number");
    }
  },
  mutations: {
    RESET(state) {
      Object.assign(state, DEFAULT_STATE);
    },

    UPDATE_STATE(state, payload) {
      Object.assign(state, payload);
    },

    UPDATE_ANT(state, { id, newAnt }) {
      Object.assign(state.ants.find(ant => ant.id === id), newAnt);
    }
  },
  actions: {
    async initializeStore({ commit, dispatch }) {
      commit("RESET");
      await dispatch("fetchAntsData");
    },

    async fetchAntsData({ commit }) {
      await axios({
        url: "https://antserver-blocjgjbpw.now.sh/graphql",
        method: "post",
        data: {
          query: `{
            ants {
              name, weight, length, color
            }
          }`
        }
      })
        .then(result => {
          let resultData = result.data.data || {};

          // add an id for setting Win Chance
          // add win chance to track it per ant
          let cleanResult = resultData.ants.map((ant, i) => {
            return {
              id: i,
              ...ant,
              "Win Chance": "Not Yet Calculated"
            };
          });

          commit("UPDATE_STATE", { ants: cleanResult });
        })
        .catch(error => {
          console.log("error", error);
        });
    },

    updateAntsWinChanceById({ state, commit }, { id, winChance }) {
      let matchingAnt = Object.values(state.ants).find(ant => ant.id === id);
      let newAnt = Object.assign({}, matchingAnt);
      newAnt["Win Chance"] = winChance;

      commit("UPDATE_ANT", {
        newAnt: newAnt,
        id: id
      });
    },

    async calculateWinChanceForAnt({ state, dispatch }, { id }) {
      // Don't recalculate ant win chance if its been calculated
      // or if its loading
      let currentWinChance = state.ants.find(ant => ant.id === id)[
        "Win Chance"
      ];

      if (
        typeof currentWinChance === "number" ||
        currentWinChance === "Loading"
      ) {
        return;
      }

      dispatch("updateAntsWinChanceById", {
        id: id,
        winChance: "Loading"
      });

      let calculateWinChance = generateAntWinLikelihoodCalculator();

      await calculateWinChance(winChance => {
        dispatch("updateAntsWinChanceById", {
          id: id,
          winChance: winChance
        });
      });
    },

    async calculateWinChanceForAllAnts({ state, dispatch }) {
      let antsCopy = [...state.ants];

      antsCopy.forEach(async ant => {
        await dispatch("calculateWinChanceForAnt", {
          id: ant.id
        });
      });
    }
  }
});
