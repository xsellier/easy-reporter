<template>
  <div class="steam-analytics-container">
    <v-card class="filters">
      <template v-if="sending">
        <v-progress-linear indeterminate color="indigo" class="mb-0" ></v-progress-linear> 
      </template>
      <div class="steam-analytics-row">
        <v-select class="mx-2 steam-analytics-select" v-model="filter" :items="filterList" :rules="[rules.required]" label="Filter" required></v-select>
        <v-select class="mx-2 steam-analytics-select" v-model="review_type" :items="review_type_list" :rules="[rules.required]" label="Review type" required></v-select>
        <v-select class="mx-2 steam-analytics-select" v-model="purchase_type" :items="purchase_type_list" :rules="[rules.required]" label="Buyer type" required></v-select>
      </div>
      <v-card-actions>
        <v-btn :disabled="sending" variant="flat" color="indigo" prepend-icon="mdi-refresh" @click="list()">Refresh</v-btn>
      </v-card-actions>
    </v-card>
    <div class="steam-analytics-row">
      <div class="review-list">
        <v-list lines="three">
          <v-list-subheader>Reviews</v-list-subheader>

          <v-list-item v-for="item_data in reviews" :value="reviews" :href="getReviewLink(item_data)" target="_blank" :class="computeBackgroundColor(item_data)" class="bt-2">
            <v-list-item-subtitle v-text="item_data.review"></v-list-item-subtitle>

            <v-chip-group>
              <v-chip pill=true size="small" prepend-icon="mdi-currency-usd" v-if="item_data.steam_purchase">Bought</v-chip>
              <v-chip pill=true size="small" prepend-icon="mdi-message" v-if="item_data.developer_response">Answered</v-chip>

              <v-chip pill=true size="small" prepend-icon="mdi-calendar-blank">{{new Date(item_data.timestamp_created * 1000).toLocaleDateString() }}</v-chip>
              <v-chip pill=true size="small" prepend-icon="mdi-calendar-edit" v-if="item_data.timestamp_created != item_data.timestamp_updated">{{new Date(item_data.timestamp_updated * 1000).toLocaleDateString() }}</v-chip>

              <v-chip pill=true size="small" prepend-icon="mdi-thumb-up" v-if="item_data.votes_up != null && item_data.votes_up != 0">Upvotes: {{ item_data.votes_up }}</v-chip>
              <v-chip pill=true size="small" prepend-icon="mdi-emoticon" v-if="item_data.votes_funny != null && item_data.votes_funny != 0">Funny: {{ item_data.votes_funny }}</v-chip>
            </v-chip-group>

            <v-tooltip activator="parent" location="left">
              Playtime: {{ Math.round(item_data.author.playtime_forever / 60) }} hours<br />
              Playtime last two weeks: {{ Math.round(item_data.author.playtime_last_two_weeks / 60) }} hours<br />
              Playtime at review: {{ Math.round(item_data.author.playtime_at_review / 60) }} hours
            </v-tooltip>
          </v-list-item>
        </v-list>
      </div>
      <div class="steam-analytics-summary">
        <v-card class="steam-summary-card">
          <div class="steam-analytics-row steam-analytics-center steam-summary-item">
            <div class="steam-analytics-column steam-analytics-center steam-summary-item">
              <span class="steam-analytics-value">{{ review_score }}</span>
              <span class="steam-analytics-description">Review score</span>
            </div>
            <div class="steam-analytics-column steam-analytics-center steam-summary-item">
              <span class="steam-analytics-value">{{ review_score_desc }}</span>
              <span class="steam-analytics-description">Review description</span>
            </div>
          </div>
          <div class="steam-analytics-row steam-analytics-center steam-summary-item">
            <div class="steam-analytics-column steam-analytics-center steam-summary-item">
              <span class="steam-analytics-value">{{ total_reviews }}</span>
              <span class="steam-analytics-description">Total reviews</span>
            </div>

            <div class="steam-analytics-column steam-analytics-center steam-summary-item text-green">
              <span class="steam-analytics-value">{{ total_positive }}</span>
              <span class="steam-analytics-description">Total positive reviews</span>
            </div>
            <div class="steam-analytics-column steam-analytics-center steam-summary-item text-red">
              <span class="steam-analytics-value">{{ total_negative }}</span>
              <span class="steam-analytics-description">Total negative reviews</span>
            </div>
          </div>
          <div class="steam-analytics-column steam-summary-item">
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need</span>
              <span class="steam-analytics-value text-red">{{ getRatioNegative(1.0 - (steamScoreFiveRounded - 5) / 100.0) }}</span>
              <span class="steam-analytics-description"> negative review to reach</span>
              <span class="steam-analytics-value">{{ steamScoreFiveRounded - 5 }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need</span>
              <span class="steam-analytics-value text-red">{{ getRatioNegative(1.0 - (steamScoreFiveRounded) / 100.0) }}</span>
              <span class="steam-analytics-description">negative review to reach</span>
              <span class="steam-analytics-value">{{ steamScoreFiveRounded }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need </span>
              <span class="steam-analytics-value text-red">{{ getRatioNegative(1.0 - (steamScore) / 100.0) }}</span>
              <span class="steam-analytics-description">negative review to reach</span>
              <span class="steam-analytics-value">{{ steamScore - 1 }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Current: </span>
              <span class="steam-analytics-value">{{ steamScore }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need </span>
              <span class="steam-analytics-value text-green">{{ getRatio((steamScore + 1) / 100.0) }}</span>
              <span class="steam-analytics-description">positive review to reach</span>
              <span class="steam-analytics-value">{{ steamScore + 1 }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need </span>
              <span class="steam-analytics-value text-green">{{ getRatio((steamScoreFiveRounded + 5) / 100.0) }}</span>
              <span class="steam-analytics-description">positive review to reach</span>
              <span class="steam-analytics-value">{{ steamScoreFiveRounded + 5 }}%</span>
            </div>
            <div class="steam-analytics-center">
              <span class="steam-analytics-description">Need </span>
              <span class="steam-analytics-value text-green">{{ getRatio((steamScoreFiveRounded + 10) / 100.0) }}</span>
              <span class="steam-analytics-description">positive review to reach</span>
              <span class="steam-analytics-value">{{ steamScoreFiveRounded + 10 }}%</span>
            </div>
          </div>

        <v-card-actions>
          <v-btn variant="flat" color="indigo" prepend-icon="mdi-steam" :href="getSteamPage()" target="_blank">Steam</v-btn>
          <v-btn variant="flat" color="indigo" prepend-icon="mdi-database" :href="getSteamDBPage()" target="_blank">SteamDB</v-btn>
        </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style src="./style.css" scoped></style>
