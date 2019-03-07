<template>
  <div id="app">
    <LoginForm ref="loginForm" v-if="!token" v-on:login="login"></LoginForm>

    <template v-if="token">
      <md-tabs md-sync-route>
        <md-tab id="tab-charts" md-label="Charts">
          <BugCharts ref="bugCharts" v-on:error="showError"></BugCharts>
        </md-tab>
        <md-tab id="tab-reports" md-label="Reports">
          <BugReports ref="bugReports" v-on:list="list" v-on:error="showError"></BugReports>
        </md-tab>
      </md-tabs>
    </template>
    <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
  </div>
</template>

<script>
import ErrorSnackbar from "./components/ErrorSnackbar.vue";
import BugCharts from "./components/BugCharts.vue";
import BugReports from "./components/BugReports.vue";
import LoginForm from "./components/LoginForm.vue";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Application",
  components: {
    ErrorSnackbar,
    BugCharts,
    BugReports,
    LoginForm,
    VueApexCharts
  },
  data() {
    return {
      versions: {},
      reports: [],
      reportsBulkDelete: [],
      cache: {},
      report: null,
      username: "",
      password: "",
      filename: null,
      sending: false,
      token: null,
      debug: false,
      deleted: false,
      uploaded: true,
    };
  },
  computed: {
    filteredReports: function() {
      let self = this;

      return this.reports.filter(report => {
        return (
          report.uploaded == self.uploaded &&
          (report.deleted_at != null) == self.deleted &&
          report.debug == self.debug
        );
      });
    }
  },
  methods: {
    showError: function(message) {
      this.token = null;

      this.$refs.errorSnackbar.show(message);
    },
    login: function() {
      this.sending = true;

      this.$http
        .post(`/user/login`, {
          username: this.$refs.loginForm.username,
          password: this.$refs.loginForm.password
        })
        .then(response => {
          this.token = response.data;
          this.sending = false;

          this.$refs.loginForm.done();

          return this.listReports();
        })
        .then(() => this.listVersions())
        .catch(err => {
          this.sending = false;
          this.$refs.loginForm.done();
          this.token = null

          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`);
        });
    },
    list: function() {
      return this.listReports()
        .then(() => this.listVersions())
    },
    listReports: function() {
      this.sending = true;

      return this.$http({
        method: "get",
        url: "/report/list",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(response => {
          this.reports = response.data;
          this.reports.sort((a, b) => {
            return a.created_at < b.created_at;
          });
          this.sending = false;

          this.$refs.bugReports.login(this.token);
          this.$refs.bugCharts.refreshReports(this.reports);
          this.$refs.bugReports.refreshReports(this.reports);
        })
        .catch(err => {
          this.sending = false;
          this.token = null

          this.$refs.errorSnackbar.show(`Cannot list reports: ${err.message}`);
        });
    },
    listVersions: function() {
      this.sending = true;

      return this.$http({
        method: "get",
        url: "/version/list",
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(response => {
          this.versions = response.data.reduce((acc, item) => {
            acc[item.name] = item.cracked

            return acc
          }, {});
          this.sending = false;

          this.$refs.bugCharts.refreshVersions(this.versions);
          this.$refs.bugReports.refreshVersions(this.versions);
        })
        .catch(err => {
          this.sending = false;
          this.token = null

          this.$refs.errorSnackbar.show(`Cannot list versions: ${err.message}`);
        });
    }
  }
};
</script>
