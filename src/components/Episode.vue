<template>
    <transition name="episode">
        <article v-if="allReady" class="episode__expanded">
          <div class="film">
            <div class="film__poster">
              <img :src="film.poster" :alt="film.title" />
            </div>
            <ul class="film__links">
              <li v-if="mediaLinks.amazonURL">
                <a class="film__link" :href="mediaLinks.amazonURL + '/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0010R08PO&linkCode=as2&tag=csf0622-20'">
                  <font-awesome-icon size="3x" :icon="{ prefix: 'fab', iconName: 'amazon' }"/>
                </a>
              </li>
              <li v-if="mediaLinks.youtubeURL">
                <a class="film__link" :href="mediaLinks.youtubeURL">
                  <font-awesome-icon size="3x" :icon="{ prefix: 'fab', iconName: 'youtube' }"/>
                </a>
              </li>
              <li v-if="mediaLinks.itunesURL">
                <a class="film__link" :href="mediaLinks.itunesURL">
                  <font-awesome-icon size="3x" :icon="{ prefix: 'fab', iconName: 'itunes-note' }"/>
                </a>
              </li>
            </ul>
          </div>

          <div class="episode__content">
            <p class="episode__content__film">{{film.summary}}</p>
            <vue-plyr class="episode__content__trailer" v-if="film.trailer" ref="player">
              <div class="plyr__video-embed">
                <iframe :src="film.trailer" allowfullscreen allowtransparency allow="autoplay"></iframe>
              </div>
            </vue-plyr>
            <p class="episode__content__episode">{{episodeDescription}}</p>
          </div>

          <div class="guests">
            <div class="guests__content">
              <ul class="guest-list">
                <li v-if="guests.guestOne" class="guest-list__item">
                    <div class="guest-media">
                        <img class="guest__img" :src="guests.guestOne.photo" :alt="guests.guestOne.name" />
                    </div>
                    <div class="guest-description">
                      <h5 class="guest__name">{{guests.guestOne.name}}</h5>
                      <p class="guest__bio">{{guests.guestOne.bio}}</p>
                      <ul class="guest-plugs">
                        <li v-for="plug in guests.guestOne.plugs">
                          <a class="button" :href="plug.URL">
                            <img :src="plug.media" :alt="plug.title">
                            <p class="button__text">{{ plug.title }}</p>
                          </a>
                        </li>
                      </ul>
                    </div>
                </li>
                <li v-if="guests.guestTwo" class="guest-list__item">
                    <div class="guest-media">
                        <img class="guest__img" :src="guests.guestTwo.photo" :alt="guests.guestTwo.name" />
                    </div>
                    <div class="guest-description">
                      <h5 class="guest__name">{{guests.guestTwo.name}}</h5>
                      <p class="guest__bio">{{guests.guestTwo.bio}}</p>
                      <ul class="guest-plugs">
                        <li v-for="plug in guests.guestTwo.plugs">
                          <a :href="plug.URL">
                            <img :src="plug.media" :alt="plug.title">
                          </a>
                          <p>{{ plug.title }}</p>
                        </li>
                      </ul>
                    </div>
                </li>
                <li v-if="guests.guestThree" class="guest-list__item">
                    <div class="guest-media">
                        <img class="guest__img" :src="guests.guestThree.photo" :alt="guests.guestThree.name" />
                    </div>
                    <div class="guest-description">
                      <h5 class="guest__name">{{guests.guestThree.name}}</h5>
                      <p class="guest__bio">{{guests.guestThree.bio}}</p>
                      <ul class="guest-plugs">
<<<<<<< Updated upstream
                        <li v-for="plug in guests.guestThree.plugs">
                          <a :href="plug.URL">
=======
                        <li :click="plugJuice(plug.title, guests.guestThree.name)" v-for="plug in guests.guestThree.plugs">
                          <a target="_blank" :href="plug.URL">
>>>>>>> Stashed changes
                            <img :src="plug.media" :alt="plug.title">
                          </a>
                          <p>{{ plug.title }}</p>
                        </li>
                      </ul>
                    </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="subscribe">
            <h6 class="subscribe__heading">How Did This Get Made?</h6>
            <p class="subscribe__content">Get an email delivered to your inbox every time a new episode is available. Or just listen to this episode on <a :href="mediaLinks.stitcherURL">Stitcher</a>.</p>
            <a  class="subscribe__button" href="">Subscribe</a>
          </div>
          
        </article>
    </transition>
</template>
<script>
    import { kebabify, prettyDate } from '../helpers'
    
    export default {
      name: 'episode',
      resource: 'Episode',
      props: { episode: String },
    
      data() {
        return {
          film: '',
          guests: '',
          episodeDescription: '',
          mediaLinks: '',
          ready: false
        }
      },
    
      computed: {
        allReady() {
          return this.ready && this.episode;
        }
      },
    
      watch: {
        episode(to, from) {
          if (to === from || !this.episode) return;
    
          this.commentsReady = false
          this.$getResource('episode', to)
            .then(this.showComments)
            .then(() => {
              this.ready = true;
            });
        }
      },
    
      methods: {
        kebabify,
        prettyDate
      },
    
      mounted() {
        if (!this.episode) {
          this.ready = true;

          return;
        }
    
        this.$getResource('episode', this.episode)
          .then(() => {
            if (this.guests.guestOne) {
              if (this.guests.guestOne.plugs) {
                this.guests.guestOne.plugs.forEach(element => {
                  if (element.URL.includes('amazon')) {
                    element.URL = element.URL + '/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0010R08PO&linkCode=as2&tag=csf0622-20';
                    return element.URL
                  }
                });
              }
            }

            if (this.guests.guestTwo) {
              if (this.guests.guestTwo.plugs) {
                this.guests.guestTwo.plugs.forEach(element => {
                  if (element.URL.includes('amazon')) {
                    element.URL = element.URL + '/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0010R08PO&linkCode=as2&tag=csf0622-20';
                    return element.URL
                  }
                });
              }
            }

            if (this.guests.guestThree) {
              if (this.guests.guestThree.plugs) {
                this.guests.guestThree.plugs.forEach(element => {
                  if (element.URL.includes('amazon')) {
                    element.URL = element.URL + '/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0010R08PO&linkCode=as2&tag=csf0622-20';
                    return element.URL
                  }
                });
              }
            }
            this.ready = true;
          });
      }
    }
</script>