<template>
  <main class="series" :class="{ 'series--expanded': this.episode }">

    <div class="intro" :class="{'intro--closed': isIntroClosed}">
      <div class="quote">
        <blockquote>"There's a boozy, birdy housewife with a glass of chardonnay and her tits out diddling herself in the bath. Guess what this isn't for? Fourth graders. Guess what this is for? My spank bank."</blockquote>
        <cite>- <img class="cite__pic" src="/static/assets/hosts/jason.jpg" alt="Jason Mantzoukas" /></cite>
      </div>

      <div class="intro__cta">
        <span @click="closeIntro()" class="button__continue">Continue!</span>
      </div>
    </div>

    <span class="nav__info" @click="isInfoOpen = !isInfoOpen">
      <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'info-circle' }"/>
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
    closeIntro() {
      this.isIntroClosed = true;
      this.$localStorage.set('introViewed', true);
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
  }
}
</script>
