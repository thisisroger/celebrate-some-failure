<template>
  <nav class="nav">
    <span class="nav__goback" @click="navBack">
      <font-awesome-icon size="2x" :icon="{ prefix: 'fas', iconName: 'arrow-alt-circle-left' }"/>
    </span>
    <h6 class="logo logo--mark" @scroll="handleScroll">
      <span>f!</span>
    </h6>
  </nav>
</template>

<script>
export default {
  name: 'blog-nav',
  props: {
    navs: Number,
    content: Object,
    filters: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      scrollPosition: null
    }
  },

  computed: {
    labels() {
      return Object.keys(this.filters)
        .map(filter => this.content.labels[filter])
    }
  },

  methods: {
    navBack() {
      if (this.navs && !this.filters.episode) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    handleScroll(event) {
      let logo = document.querySelector('.logo--mark');
      if (window.scrollY > 100) {
        logo.classList.add('element--fade-out');
      } else if (window.scrollY < 100) {
        logo.classList.remove('element--fade-out');
      }
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
