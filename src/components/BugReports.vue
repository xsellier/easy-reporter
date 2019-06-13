<template v-if="token">
  <div class="page-container">
    <v-navigation-drawer
      fixed
      app
    >
      <v-list dense subheader>
        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox v-model="debug"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Debug</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox v-model="deleted"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Deleted</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox v-model="uploaded"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Uploaded</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox v-model="cracked"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cracked</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-checkbox v-on:change="selectAll()" v-model="selectAllValue"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Select all</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-btn color="primary" dark small v-on:click="list">Refresh</v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn color="primary" dark small :disabled="reportsBulkDelete.length <= 0" v-on:click="bulkDelete()">Delete</v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Total: {{ filteredReports.length }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-subheader inset>Reports</v-subheader>

        <v-list-tile v-for="report in filteredReports" :key="report.filename">
          <v-list-tile-avatar>
            <v-checkbox v-model="reportsBulkDelete"
                v-if="report.deleted_at == null"
                :value="report.filename"></v-checkbox>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ report.version }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ report.created_at }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              small
              v-if="report.deleted_at == null"
              v-on:click="info(report)">Open</v-btn>
          </v-list-tile-action>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
          row wrap
        >
          <template v-if="sending">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </template>
          <template v-if="report != null">
            <v-layout row wrap>
              <v-flex xs12 tag="h1" class="headline" v-if="report.data != null">{{ report.data.error }}</v-flex>
              <v-flex xs12 tag="h1" class="headline" v-if="report.data == null">Custom bug report</v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <v-btn
                  color="info"
                  :disabled="sending"
                  @click="downloadReport()"
                >Download</v-btn>
                <v-btn
                  color="warning"
                  :disabled="sending"
                  @click="deleteReport()"
                >Delete</v-btn>
                <v-btn
                  color="error"
                  :disabled="sending"
                  @click="flagVersionAsCracked()"
                  v-if="!report.cracked"
                >Flag version as cracked</v-btn>
                <v-btn
                  color="info"
                  :disabled="sending"
                  @click="unflagVersionAsCracked()"
                  v-if="report.cracked"
                >Unflag version as cracked</v-btn>                
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs3 v-if="report.data != null">
                <v-card>
                  <v-toolbar dense>
                    <v-toolbar-title>Callstack</v-toolbar-title>
                  </v-toolbar>
                  <v-list dense subheader>
                    <v-spacer></v-spacer>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.data.source_file }} ({{ report.data.source_line }})</v-list-tile-title>
                        <v-list-tile-sub-title>{{ report.data.source_func }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <template v-for="item in formatCallstack(report.data.callstack)">
                        <v-list-tile-content :key="item.name">
                          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ item.line }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </template>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-layout column>
                <v-flex xs7 v-if="report.dump">
                  <v-textarea
                    label="Dump"
                    class="logdump"
                    readonly
                    auto-grow
                    :value="report.dump"
                  ></v-textarea>
                </v-flex>
                <v-flex xs7 v-if="report.logdump">
                  <v-textarea
                    label="Logs"
                    class="logdump"
                    readonly
                    auto-grow
                    :value="report.logdump"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <v-flex xs2>
                <v-card>
                  <v-list dense subheader>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.name }}</v-list-tile-title>
                        <v-list-tile-sub-title>OS</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.cpu.thread }}</v-list-tile-title>
                        <v-list-tile-sub-title>Can thread</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.cpu.count }}</v-list-tile-title>
                        <v-list-tile-sub-title>CPU count</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.cpu.model }}</v-list-tile-title>
                        <v-list-tile-sub-title>Model</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.locale }}</v-list-tile-title>
                        <v-list-tile-sub-title>Locale</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.screen.vsync }}</v-list-tile-title>
                        <v-list-tile-sub-title>VSync</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.screen.resolution }}</v-list-tile-title>
                        <v-list-tile-sub-title>Resolution</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.screen.fullscreen }}</v-list-tile-title>
                        <v-list-tile-sub-title>Fullscreen</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ report.system.screen.size }}</v-list-tile-title>
                        <v-list-tile-sub-title>Window size</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; Easy reporter 2019</span>
    </v-footer>

  </div>
</template>

<script>
export default {
  name: "BugReports",
  components: {
  },
  data() {
    return {
      versions: {},
      reports: [],
      version: [],
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
      cracked: false,
      selectAllValue: false
    }
  },
  computed: {
    filteredReports: function() {
      let self = this

      return this.reports.filter(report => {
        // Validate uploaded filter
        var valid = report.uploaded == self.uploaded

        // Validate deleted filter
        valid &= (report.deleted_at != null) == self.deleted

        // Validate debug filter
        valid &= report.debug == self.debug

        // Validate crack filter
        var cracked = false

        if (self.versions[report.version] != null) {
          cracked = self.versions[report.version]
        }

        valid &= cracked == self.cracked

        return valid
      })
    }
  },
  methods: {
    selectAll: function() {
      if (this.selectAllValue) {
        this.reportsBulkDelete = this.filteredReports.map((report) => report.filename)
      } else {
        this.reportsBulkDelete = []
      }
    },
    bulkDelete: function() {
      this.sending = true

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
          this.report = null
          this.filename = null

          this.sending = false
          this.reportsBulkDelete = []

          return this.list()
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot delete reports: ${err.message}`)
        })
    },
    formatCallstack: function(callstack) {
      return callstack.reduce((acc, item, index) => {
        let computed_index = parseInt(Math.floor(index / 2), 10)

        if (index % 2 == 0) {
          acc[computed_index] = {
            name: item
          }
        } else {
          acc[computed_index].line = item
        }

        return acc
      }, [])
    },
    downloadReport: function() {
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(this.report, null, 2))
      var downloadAnchorNode = document.createElement("a")

      downloadAnchorNode.setAttribute("href", dataStr)
      downloadAnchorNode.setAttribute("download", this.filename + ".json")
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    deleteReport: function() {
      this.sending = true

      this.$http({
        method: "DELETE",
        url: `/report/${encodeURIComponent(this.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      .then(() => {
        this.report = null
        this.filename = null

        this.sending = false

        return this.list()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.$emit('error', this.token, `Cannot delete report: ${err.message}`)
      })
    },
    info: function(report) {
      this.report = null
      this.filename = null

      if (report.deleted_at != null || !report.uploaded) {
        return
      }

      this.sending = true

      this.$http({
        method: "get",
        url: `/report/${encodeURIComponent(report.filename)}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
        .then((response) => {
          let rawReport = pako.ungzip(atob(response.data), { to: "string" })

          this.filename = report.filename
          this.report = JSON.parse(rawReport)
          this.report.version = report.version
          this.report.cracked = this.versions[this.report.version] || false
          this.sending = false
        })
        .catch((err) => {
          if (err.response && err.response.status < 500) {
            this.token = null
          }

          this.sending = false
          this.$emit('error', this.token, `Cannot download report: ${err.message}`)
        })
    },
    flagVersionAsCracked: function (version) {
      return this._setFlagVersionCracked(version, true)
    },
    unflagVersionAsCracked: function (version) {
      return this._setFlagVersionCracked(version, false)
    },
    _setFlagVersionCracked: function(version, cracked) {
      return this.$http({
        method: "post",
        url: `/version/update`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.report.version,
          cracked: cracked
        }
      })
      .then(() => {
        this.versions[version] = cracked
        this.report.cracked = cracked
        this.sending = false
        this.$forceUpdate()
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.token = null
        }

        this.sending = false
        this.$emit('error', this.token, `Cannot download report: ${err.message}`)
      })
    },
    login: function(token) {
      this.token = token
    },
    list: function() {
      this.sending = true

      this.$emit('list')
    },
    refreshReports: function(list) {
      this.sending = false
      this.reports = list
    },
    refreshVersions: function(list) {
      this.sending = false
      this.versions = list
    }
  }
}
</script>

<style lang="scss" scoped>
.logdump {  
  font-family: "courier new" !important;
  font-size: 14px !important;
}
</style>
