export default {
  name: 'SteamAnalytics',
  props: ['token', 'application_data'],
  emits: ['update:token'],
  data: () => ({
    sending: false,
    endpoint: 'https://store.steampowered.com/',

    // Query parameters
    filterList: ['summary', 'all', 'recent', 'updated'],
    filter: 'summary',
    language: 'all',

    review_type_list: ['all', 'positive', 'negative'],
    review_type: 'all',

    purchase_type_list: ['steam', 'non_steam_purchase', 'all'],
    purchase_type: 'steam',

    day_range: 30,
    num_per_page: 100,
    rules: {
      required: (value) => !!value || 'Required'
    },

    // Result
    review_score: 0,
    review_score_desc: '',
    total_positive: 0,
    total_negative: 0,
    total_reviews: 0,
    reviews: []
  }),
  watch: {
    application_data() {
      return this.list()
    }
  },
  mounted() {
    return this.list()
  },
  methods: {
    computeBackgroundColor: function (review_data) {
      return review_data.voted_up ? 'bg-green-lighten-4' : 'bg-red-lighten-4'
    },
    getSteamPage: function () {
      return `https://store.steampowered.com/app/${this.application_data.steam_id}`
    },
    getSteamDBPage: function () {
      return `https://steamdb.info/app/${this.application_data.steam_id}/graphs/`
    },
    getReviewLink(reviewData) {
      return `https://steamcommunity.com/profiles/${reviewData.author.steamid}/recommended/${this.application_data.steam_id} `
    },
    getRating: function (positiveVotes, negativeVotes) {
      const totalVotes = positiveVotes + negativeVotes;
      const average = positiveVotes / totalVotes;
      const score = average - ( average - 0.5 ) * Math.pow( 2, -Math.log10( totalVotes + 1 ) );

      return score * 100;
    },
    getRatio: function (percent) {
      return Math.ceil(Math.max(0, (this.total_reviews * percent) - this.total_positive) / (1.0 - percent))
    },
    getRatioNegative: function (percent) {
      return Math.ceil(Math.max(0, (this.total_reviews * percent) - this.total_negative) / (1.0 - percent))
    },
    list: function () {
      this.sending = true

      return this.$http({
        method: 'get',
        url: `/proxy/${this.endpoint}appreviews/${this.application_data.steam_id}${encodeURIComponent('?')}json=1&start_date=-1&end_date=-1&date_range_type=all&filter=${this.filter}&language=${this.language}&review_type=${this.review_type}&day_range=${this.day_range}&num_per_page=${this.num_per_page}&purchase_type=${this.purchase_type}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then((response) => {
        this.sending = false

        this.review_score = response.data.query_summary.review_score != null ? response.data.query_summary.review_score : this.review_score
        this.review_score_desc = response.data.query_summary.review_score_desc != null ? response.data.query_summary.review_score_desc : this.review_score_desc

        this.total_positive = response.data.query_summary.total_positive != null ? response.data.query_summary.total_positive : this.total_positive
        this.total_negative = response.data.query_summary.total_negative != null ? response.data.query_summary.total_negative : this.total_negative
        this.total_reviews = response.data.query_summary.total_reviews != null ? response.data.query_summary.total_reviews : this.total_reviews
        this.reviews = Object.values(response.data.reviews)

        this.steamScore = Math.floor(this.total_positive / (this.total_positive + this.total_negative) * 100.0)
        this.steamScoreFiveRounded = (this.steamScore - (this.steamScore % 5))
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot query steam', err)
      })
    }
  }
}
