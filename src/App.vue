<template>
  <div id="app">
    <template v-if="token">
      <div class="page-container">
        <md-app>
          <md-app-toolbar class="md-primary">
            <span class="md-title">Informations</span>
          </md-app-toolbar>
          <md-app-drawer md-permanent="full">
            <md-toolbar class="md-dense" id="toolbar">
              <md-list>
                <md-list-item>
                  <md-checkbox v-model="debug">Debug</md-checkbox>
                  <md-checkbox v-model="deleted">Deleted</md-checkbox>
                  <md-checkbox v-model="uploaded">Uploaded</md-checkbox>
                </md-list-item>
                <md-list-item>
                  <md-button class="md-raised md-accent" v-on:click="list">Refresh</md-button>
                  <md-button
                    class="md-raised md-accent"
                    :disabled="reportsBulkDelete.length <= 0"
                    v-on:click="bulkDelete()"
                  >Delete</md-button>
                </md-list-item>
              </md-list>
            </md-toolbar>
            <md-content class="md-scrollbar">
              <md-list class="md-triple-line">
                <md-list-item v-for="report in filteredReports" :key="report.filename">
                  <md-checkbox
                    v-model="reportsBulkDelete"
                    v-if="report.deleted_at == null"
                    :value="report.filename"
                    class="md-primary"
                  ></md-checkbox>
                  <md-icon
                    v-bind:class="{ 'success': report.uploaded, 'failure': !report.uploaded }"
                  >cloud_upload</md-icon>
                  <div class="md-list-item-text">
                    <span>{{ report.filename }}</span>
                    <span>Version: {{ report.version }}</span>
                    <p>Created: {{ report.created_at }}</p>
                  </div>
                  <md-icon class="failure" v-if="report.deleted_at">deleted_at</md-icon>
                  <md-icon class="failure" v-if="report.debug">bug_report</md-icon>
                  <md-button
                    class="md-dense md-raised md-primary"
                    v-if="report.deleted_at == null"
                    v-on:click="info(report)"
                  >Open</md-button>
                </md-list-item>
              </md-list>
            </md-content>
          </md-app-drawer>
          <md-app-content>
            <template>
              <div v-if="sending">
                <md-progress-bar md-mode="indeterminate"></md-progress-bar>
              </div>
              <div class="md-layout" md-card v-if="report != null">
                <md-button
                  class="md-raised md-primary"
                  :disabled="sending"
                  @click="downloadReport()"
                >Download</md-button>
                <md-button
                  class="md-raised md-accent"
                  :disabled="sending"
                  @click="deleteReport()"
                >Delete</md-button>
              </div>
              <div class="md-layout" v-if="report != null">
                <div class="md-layout-item md-size-60" v-if="report != null && report.data != null">
                  <md-content>
                    <p class="md-display-1">{{ report.data.error }}</p>
                    <p class="md-body-2">{{ report.data.error_descr }}</p>
                  </md-content>
                </div>
                <div class="md-layout-item md-size-15">
                  <md-card id="system-info">
                    <md-card-header>
                      <div class="md-title">System</div>
                    </md-card-header>

                    <md-card-content>
                      <div class="md-list-item-text">
                        <span>OS: {{ report.system.name }}</span>
                        <span>Can thread: {{ report.system.cpu.thread }}</span>
                        <span>CPU count: {{ report.system.cpu.count }}</span>
                        <span>Model: {{ report.system.cpu.model }}</span>
                        <span>Locale: {{ report.system.locale }}</span>
                        <span>VSync: {{ report.system.screen.vsync }}</span>
                        <span>Resolution: {{ report.system.screen.resolution }}</span>
                        <span>Fullscreen: {{ report.system.screen.fullscreen }}</span>
                        <span>Window size: {{ report.system.screen.size }}</span>
                      </div>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout" v-if="report != null">
                <div class="md-layout-item md-size-33" v-if="report != null && report.data != null">
                  <md-card id="callstack">
                    <md-card-header>
                      <div class="md-title">Callstack</div>
                    </md-card-header>

                    <md-card-content>
                      <div class="md-list-item-text">
                        <span>{{ report.data.source_file }}: {{ report.data.source_line }} ({{ report.data.source_func }})</span>
                      </div>
                      <div
                        class="md-list-item-text"
                        v-for="item in formatCallstack(report.data.callstack)"
                        :key="item.name"
                      >
                        <span>{{ item.name }}: {{ item.line }}</span>
                      </div>
                    </md-card-content>
                  </md-card>
                </div>
                <div class="md-layout-item md-size-60">
                  <pre>
                    {{ report.dump }}
                  </pre>
                  <md-divider></md-divider>
                  <pre>
                    {{ report.logdump }}
                  </pre>
                </div>
              </div>
            </template>
          </md-app-content>
        </md-app>
      </div>
    </template>
    <LoginForm ref="loginForm" v-if="!token" v-on:login="login()"></LoginForm>
    <ErrorSnackbar ref="errorSnackbar"></ErrorSnackbar>
  </div>
</template>

<script>
import ErrorSnackbar from "./components/ErrorSnackbar.vue";
import LoginForm from "./components/LoginForm.vue";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Reports",
  components: {
    ErrorSnackbar,
    LoginForm,
    VueApexCharts
  },
  data() {
    return {
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
      chartOptions: {
        chart: {
          height: 380,
          type: "line",
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        markers: {
          size: 0
        },
        stroke: {
          curve: "straight",
          lineCap: "round",
          width: 1
        },
        yaxis: {
          min: 0,
          max: 120000,
          labels: {
            formatter: function(val) {
              return `${val} ms`;
            }
          }
        }
      }
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
    bulkDelete: function() {
      this.sending = true;

      this.$http({
        method: "POST",
        url: `/report/bulk/delete`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          reports: this.reportsBulkDelete
        }
      })
        .then(() => {
          this.report = null;
          this.filename = null;

          this.sending = false;
          this.reportsBulkDelete = [];

          return this.list();
        })
        .catch(err => {
          this.sending = false;

          this.$refs.errorSnackbar.show(
            `Cannot delete reports: ${err.message}`
          );
        });
    },
    formatCallstack: function(callstack) {
      return callstack.reduce((acc, item, index) => {
        let computed_index = parseInt(Math.floor(index / 2), 10);

        if (index % 2 == 0) {
          acc[computed_index] = {
            name: item
          };
        } else {
          acc[computed_index].line = item;
        }

        return acc;
      }, []);
    },
    downloadReport: function() {
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(this.report, null, 2));
      var downloadAnchorNode = document.createElement("a");

      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", this.filename + ".json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    deleteReport: function() {
      this.sending = true;

      this.$http({
        method: "DELETE",
        url: `/report/${encodeURIComponent(this.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(() => {
          this.report = null;
          this.filename = null;

          this.sending = false;

          return this.list();
        })
        .catch(err => {
          this.sending = false;

          this.$refs.errorSnackbar.show(`Cannot delete report: ${err.message}`);
        });
    },
    info: function(report) {
      this.report = null;
      this.filename = null;

      if (report.deleted_at != null || !report.uploaded) {
        return;
      }

      this.sending = true;

      this.$http({
        method: "get",
        url: `/report/${encodeURIComponent(report.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then(response => {
          let rawReport = pako.ungzip(atob(response.data), { to: "string" });

          this.filename = report.filename;
          this.report = JSON.parse(rawReport);
          this.sending = false;
        })
        .catch(err => {
          this.sending = false;

          this.$refs.errorSnackbar.show(
            `Cannot download report: ${err.message}`
          );
        });
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
          return this.list();
        })
        .catch(err => {
          this.sending = false;
          this.$refs.loginForm.done();

          this.$refs.errorSnackbar.show(`Login failed: ${err.message}`);
        });
    },
    list: function() {
      this.sending = true;

      this.$http({
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
        })
        .catch(err => {
          this.sending = false;

          this.$refs.errorSnackbar.show(`Cannot list reports: ${err.message}`);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#toolbar {
  position: sticky;
  position: -webkit-sticky;
  top: 1px;
  z-index: 1000;
}

.full-control > .md-list {
  width: 100%;
  max-width: 100%;
  display: inline-block;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}

.success {
  color: green !important;
}

.failure {
  color: red !important;
}

.md-drawer {
  width: 512px;
  max-width: calc(100vw - 125px);
}

.md-app {
  max-height: 900px;

  border: 1px solid rgba(#000, 0.12);
}

.md-progress-bar {
  margin: 24px;
}

.md-app-content {
  overflow-x: none;
}

#system-info {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

#callstack {
  width: 400px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.logdump {
  width: 100%;
  height: 100%;
}
</style>
