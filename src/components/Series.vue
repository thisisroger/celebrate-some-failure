<template>
  <main class="series" :class="{ 'series--expanded': this.episode }">
    <span class="nav__info" @click="isInfoOpen = !isInfoOpen">
      <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'info-circle' }"/>
    </span>
    <span class="nav__back-to-top" @click="scrollTo(0, 220)">
      <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'arrow-alt-circle-up' }"/>
    </span>
    <blog-nav :content="content" :filters="filters" :navs="navs"/>
    <series-feed :filters="filters" />
    
    <episode :class="episode" :episode="episode" />

    <div class="info" :class="{'info--open': isInfoOpen}">
      <div class="info__back" @click="isInfoOpen = false">
        <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'sign-out-alt' }"/>
      </div>
      <div class="info__box">
        <h6 class="logo logo--info">celebrate some <span>failure!</span></h6>
        <ul class="info__hosts">
          <li class="info__host">
            <img src="/static/assets/hosts/paul.jpg" alt="Paul Scheer" />
          </li>
          <li class="info__host">
            <img src="/static/assets/hosts/june.jpg" alt="June Diane Raphael" />
          </li>
          <li class="info__host">
            <img src="/static/assets/hosts/jason.jpg" alt="Jason Mantzoukas" />
          </li>
        </ul>
        <div class="info__podcast">
          <p class="info__podcast__text">Discover more HDTGM episodes on <a class="info__podcast__link" href="" target="_blank">Apple Podcasts</a>, <a class="info__podcast__link" href="" target="_blank">Spotify</a>, or <a class="info__podcast__link" href="" target="_blank">Stitcher</a>.
          Stay up to date with the latest news at <a class="info__podcast__link" href="https://www.hdtgminfo.com" target="_blank">hdtgminfo.com</a>.</p>
        </div>
      </div>
      <p class="info__shameless">Crafted by <span>Roger Flanagan</span> in San Francisco, CA</p>
    </div>
  </main>
</template>

<script>
import BlogNav from './BlogNav'
import SeriesFeed from './SeriesFeed'
import Episode from './Episode'

import { scrollTo } from '../helpers'

export default {
  name: 'series',
  components: { BlogNav, SeriesFeed, Episode },
  resource: 'Series',
  props: {
    guest: String,
    episode: String
  },

  data() {
    return {
      navs: 0,
      title: '',
      isInfoOpen: false,
      isIntroClosed: false,
      labels: {
        episode: '',
        guest: ''
      }
    }
  },
  computed: {
    content() {
      return { title: this.title, labels: this.labels }
    },
    filters() {
      let filters = {}

      if (this.episode) filters.episode = this.episode
      if (this.guest) filters.guest = this.guest

      return filters
    }
  },
  methods: {
    scrollTo,
    handleScroll(event) {
      let backToTopEl = document.querySelector('.nav__back-to-top');
      if (window.scrollY < 100) {
        backToTopEl.classList.add('element--fade-out');
      } else if (window.scrollY > 100) {
        backToTopEl.classList.remove('element--fade-out');
      }
    }
  },
  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },
  mounted() {
    this.$getResource('series').then(x => {})
    const introSeen = this.$localStorage.get('introViewed')
    if (introSeen) {
      this.isIntroClosed = true;
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
