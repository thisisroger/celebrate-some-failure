<template>
<div>
  <span class="nav__search" @click="searchOpen()">
    <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'search' }"/>
  </span>

  <div class="episode__search" :class="{'search--open': isSearchOpen}">
    <input id="search" type="text" v-model="searchQuery" placeholder="Find a Movie" autofocus  />
    <font-awesome-icon class="episode__search-close" @click="searchClose()" size="2x" :icon="{ prefix: 'fas', iconName: 'window-close' }"/>
  </div>
  
  <transition-group tag="ul" :name="transition">
    <li v-for="episode in series" class="preview episode" :class="'episode--' + episode.id" :key="episode.id">
        <router-link class="episode__link"
              :to="`/episode/${episode.id}`"
              @click.native="scrollTo(0, 220)">
            <div class="episode__meta">
              <div class="episode__heading">
                <h1 class="episode__title">{{episode.film.title}}</h1>
                <h2 class="episode__guest">
                    <span v-if="episode.guests.guestOne">{{episode.guests.guestOne.name}}</span>
                    <span v-if="episode.guests.guestTwo">, {{episode.guests.guestTwo.name}}</span>
                    <span v-if="episode.guests.guestThree">, {{episode.guests.guestThree.name}}</span>
                </h2>
            </div>
          </div>
        </router-link>
    </li>
  </transition-group>
</div>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../helpers'

export default {
  name: 'series-feed',
  resource: 'SeriesFeed',

  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      episodes: [],
      transition: 'preview-appear',
      searchQuery: '',
      isSearchOpen: false
    }
  },

  computed: {
    reading() { return this.filters.episode },
    scrollDelay() { return (this.$device.phone) ? 0 : 1560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },
    series() {
      const filterBy = {
        episode: (filter, { id }) => filter === id
      }

      return this.episodes.filter(episode => {
        if (this.searchQuery) {
          return episode.film.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        } else {
          return Object.keys(this.filters).every(filter => {
            return filterBy[filter](this.filters[filter], episode)
          })
        }
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,
    stackPosts(episodes) {
      let interval
      const stack = () => {
        this.episodes.push(episodes.shift())

        if (!episodes.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    },
    searchOpen() {
      document.getElementById('search').focus();
      this.isSearchOpen = true;
      this.$ga.event('send', 'click', 'Search Open', 4);
    },
    searchClose() {
      this.isSearchOpen = false;
      this.searchQuery = '';
      this.$ga.event('send', 'click', 'Search Close', 5);
    }
  },

  mounted() {
    this.$getResource('series')
      .then(episodes => {
        if (!Object.keys(this.filters).length) {
          this.stackPosts(episodes)
        } else {
          this.episodes = episodes
          this.transition = 'preview'
        }
      })
  }
}
</script>
