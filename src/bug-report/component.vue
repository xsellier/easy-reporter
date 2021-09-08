<template v-if="token">
  <v-layout fill-height>
    <v-navigation-drawer>
      <v-list dense>
        <v-layout wrap align-center>
          <v-flex>
            <v-list-tile ></v-list-tile>
          </v-flex>
          <v-flex>
            <v-list-tile >
              <v-select :items="versionKeys" v-model="versionSelected" label="Version"></v-select>
            </v-list-tile>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-list-tile>
              <v-checkbox v-model="debug" v-on:change="emitUpdateSignal()"></v-checkbox>
              <v-list-tile-title>Debug</v-list-tile-title>
            </v-list-tile>
          </v-flex>
          <v-flex xs6>
            <v-list-tile>
              <v-checkbox v-model="manual" v-on:change="emitUpdateSignal()"></v-checkbox>
              <v-list-tile-title>Manual</v-list-tile-title>
            </v-list-tile>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6>
            <v-list-tile>
              <v-checkbox v-model="uploaded" v-on:change="emitUpdateSignal()"></v-checkbox>
              <v-list-tile-title>Uploaded</v-list-tile-title>
            </v-list-tile>
          </v-flex>
          <v-flex xs6>
            <v-list-tile>
              <v-checkbox v-model="cracked"></v-checkbox>
              <v-list-tile-title>Cracked</v-list-tile-title>
            </v-list-tile>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-list-tile>
              <v-checkbox v-model="fixed" v-on:change="emitUpdateSignal()"></v-checkbox>
              <v-list-tile-title>Fixed</v-list-tile-title>
            </v-list-tile>
          </v-flex>
          <v-flex xs6>
            <v-list-tile>
              <!-- <v-checkbox v-on:change="selectAll()" v-model="selectAllValue"></v-checkbox> -->
              <v-checkbox v-on:change="selectAll()" :value="reportsBulkDelete.length >= filteredReports.length && filteredReports.length > 0"></v-checkbox>
              <v-list-tile-title>Select all</v-list-tile-title>
            </v-list-tile>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6>
            <v-list-tile>
              <v-btn color="primary" dark small v-on:click="list">Refresh</v-btn>
            </v-list-tile>
          </v-flex>
          <v-flex xs6  v-if="reportsBulkDelete.length > 0">
            <v-list-tile>
              <v-btn color="warning" dark small v-on:click="bulkDelete()">Delete</v-btn>
            </v-list-tile>
          </v-flex>
        </v-layout>

        <v-layout wrap align-center>
          <v-list-tile d-flex>
            <v-pagination v-model="currentPage" :length="totalPages" v-on:input="changePage()" v-on:next="emitUpdateSignal()" v-on:previous="emitUpdateSignal()"></v-pagination>
          </v-list-tile>
        </v-layout>

        <v-layout wrap align-center>
          <v-list-tile d-flex>
              <v-list-tile-title>Items: {{ filteredReports.length }} / {{ totalItems }}</v-list-tile-title>
          </v-list-tile>
        </v-layout>

        <v-divider inset></v-divider>

        <v-subheader inset>Reports</v-subheader>
          <v-list two-line id='report-list'>
            <template v-for="report in filteredReports">
              <v-list-tile avatar ripple :key="report.filename" :class="{'selected': isSelected(report.filename)}" v-on:click="">
                <v-list-tile-action>
                  <v-checkbox v-model="reportsBulkDelete"
                    v-if="report.deleted_at == null"
                    :value="report.filename"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content v-on:click="info(report)">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-list-tile-title v-on="on">
                        {{ report.title }}
                      </v-list-tile-title>
                    </template>
                    <span>{{ report.title }}</span>
                  </v-tooltip>
                  <v-list-tile-sub-title class="text--primary">
                    {{ report.version }}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    {{ report.created_at }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </template>
          </v-btn-toggle>
        </v-list>

      </v-list>
    </v-navigation-drawer>
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
              <v-btn
                color="info"
                :disabled="sending"
                @click="flagBugAsFixed()"
                v-if="!report.fixed"
              >Flag bug as fixed</v-btn>
              <v-btn
                color="warning"
                :disabled="sending"
                @click="unflagBugAsFixed()"
                v-if="report.fixed"
              >Unflag bug as fixed</v-btn>
            </v-flex>
            <v-layout column>
              <v-flex xs7 v-if="report.dump">
                <v-textarea
                  class="logdump"
                  readonly
                  full-width
                  rows=4
                  no-resize
                  :value="report.dump"
                ></v-textarea>
              </v-flex>
              <v-flex xs7 v-if="report.logdump">
                <v-textarea
                  class="logdump"
                  readonly
                  full-width
                  rows=29
                  no-resize
                  box
                  :value="report.logdump"
                ></v-textarea>
              </v-flex>
            </v-layout>
            <v-flex xs2>
              <v-card v-if="report.data != null">
                <v-toolbar dense>
                  {{report.data.source_func}}<br />
                  {{ report.data.source_file }} ({{ report.data.source_line}})
                </v-toolbar>
                <v-list dense>
                  <template v-for="item in formatCallstack(report.data.callstack)">
                    <v-list-tile :key="item.name">
                      <v-list-tile-content>
                        {{ item.name }} ({{ item.line }})
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card>
              <v-flex v-if="report.data != null">
                <v-list-tile ></v-list-tile>
              </v-flex>
              <v-card>
                <v-list dense subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ report.version }}</v-list-tile-title>
                      <v-list-tile-sub-title>Version</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
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
                  <v-divider></v-divider>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title v-on="on">{{ report.system.executable }}</v-list-tile-title>
                          <v-list-tile-sub-title>Executable</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                    <span>{{ report.system.executable }}</span>
                  </v-tooltip>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-layout>
    </v-container>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; Easy reporter 2019</span>
    </v-footer>
  </v-layout>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
