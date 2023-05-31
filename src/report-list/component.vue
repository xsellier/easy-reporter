<template>
  <div class="report-list-column">
    <div class="report-list-column-list">
      <v-list class="report-list-list" lines="three" select-strategy="multiple" density="compact" nav>
        <v-list-subheader>Reports ({{ filteredReports.length }} / {{ totalItems }})</v-list-subheader>
        <v-list-item v-for="report in filteredReports" :key="report.filename" :class="{'selected': isSelected(report.filename)}" active-color="primary" >
          <template v-slot:prepend>
            <v-checkbox-btn v-model="reportsBulkDelete" :value="report" v-if="report.deleted_at == null"></v-checkbox-btn>
          </template>
          <div v-on:click="info(report)">
            <v-list-item-title>{{ report.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ report.filename }}
            </v-list-item-subtitle>
            <v-chip-group>
              <v-chip pill=true size="x-small">
                <v-icon icon="mdi-eye" v-if="report.read == 1"></v-icon>
                <v-icon icon="mdi-eye-off" v-if="report.read == 0"></v-icon>
              </v-chip>
              <v-chip pill=true size="x-small" v-if="report.legit == 1">
                <v-icon icon="mdi-check-decagram"></v-icon>
              </v-chip>
              <v-chip pill=true size="x-small" v-if="report.deleted_at != null">
                <v-icon icon="mdi-delete"></v-icon>
              </v-chip>
              <v-chip pill=true size="x-small" :prepend-icon="getPlatformIcon(report.platform.toLowerCase())">
                {{ report.version }}
              </v-chip>
            </v-chip-group>
            <v-tooltip activator="parent" location="right">
              <v-list class="report-list-tooltip" lines="one" dense>
                <v-list-item>
                  <v-list-item-title>{{ report.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ report.filename }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ report.created_at }}</v-list-item-title>
                  <template v-slot:append>
                    <v-icon icon="mdi-bug" v-if="report.debug == 1"></v-icon>
                  </template>
                  <v-list-item-subtitle>Creation date</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ report.version }}</v-list-item-title>
                  <v-list-item-subtitle>Version</v-list-item-subtitle>
                  <template v-slot:append>
                    <v-icon icon="mdi-puzzle" v-if="report.manual == 1"></v-icon>
                  </template>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{ report.platform }}</v-list-item-title>
                  <v-list-item-subtitle>Platform</v-list-item-subtitle>
                  <template v-slot:append>
                    <v-icon icon="mdi-upload" v-if="report.uploaded == 1"></v-icon>
                    <v-icon icon="mdi-delete" v-if="report.deleted_at != null"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-tooltip>
          </div>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="report-list-footer">
        <v-row justify="center" no-gutters>
          <v-pagination v-model="currentPage" :length="totalPages" @update:modelValue="changePage()" size="x-small" total-visible=6 density="compact"></v-pagination>
        </v-row>
      </div>
    </div>
    <div class="report-list-column-details">
      <v-toolbar class="toolbar-first">
        <v-spacer></v-spacer>
        <v-select :items="version_list" v-model="versionSelected" label="Version"></v-select>
        <v-spacer></v-spacer>
        <v-select :items="platformKeys" v-model="platformSelected" label="Platform"></v-select>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-toolbar>
        <v-checkbox label="Debug" v-model="debug"></v-checkbox>
        <v-checkbox label="Manual" v-model="manual"></v-checkbox>
        <v-checkbox label="Uploaded" @click="checkboxChange('uploaded')" v-model="uploadedValue" :indeterminate="isCheckboxIndeterminate('uploaded')"></v-checkbox>
        <v-checkbox label="Cracked" @click="checkboxChange('cracked')" v-model="crackedValue" :indeterminate="isCheckboxIndeterminate('cracked')"></v-checkbox>
        <v-checkbox label="Fixed" @click="checkboxChange('fixed')" v-model="fixedValue" :indeterminate="isCheckboxIndeterminate('fixed')"></v-checkbox>
        <v-checkbox label="Select All" @click="selectAll()" v-model="selectAllValue"></v-checkbox>

        <v-btn color="indigo" v-on:click="list">Refresh</v-btn>
        <v-btn :disabled="reportsBulkDelete.length == 0" color="warning" v-on:click="bulkDelete()">Delete</v-btn>
      </v-toolbar>
      <div class="report-list-details">
        <v-container class="report-details-v-container">
          <v-progress-linear v-if="sending" :indeterminate="true"></v-progress-linear>
          <template v-if="report != null">
            <div class="report-list-column">
              <div class="report-list-report-details">
                <div class="report-list-column pb-2">
                  <v-btn color="info" :disabled="sending" @click="downloadReport()" >Download</v-btn>&nbsp;
                  <v-btn color="info" :disabled="sending" @click="copyclipboard()" >Copy Savegame</v-btn>&nbsp;
                  <v-btn color="warning" :disabled="sending" @click="deleteReport()" >Delete</v-btn>&nbsp;
                  <v-btn color="error" :disabled="sending" @click="setFlagReportCracked(true)" v-if="!report.cracked">Flag report as cracked</v-btn>&nbsp;
                  <v-btn color="info" :disabled="sending" @click="setFlagReportCracked(false)" v-if="report.cracked">Unflag report as cracked</v-btn>&nbsp;
                  <v-btn color="info" :disabled="sending" @click="setFlagBugFixed(true)" v-if="!report.fixed">Flag bug as fixed</v-btn>&nbsp;
                  <v-btn color="warning" :disabled="sending" @click="setFlagBugFixed(false)" v-if="report.fixed">Unflag bug as fixed</v-btn>
                </div>
                <div class="text-h5">
                  <v-icon icon="mdi-check-decagram" v-if="report.legit == 1"  color="success" size="x-small"></v-icon>
                  <v-icon icon="mdi-spider" v-if="report.cracked == 1"  color="warning" size="x-small"></v-icon>
                  {{ report.data != null ? report.data.error : "Custom bug report" }}
              </div>
                <v-container fluid class="report-details-v-container">
                  <v-textarea class="logdump" v-if="report.dump" rows="1" label="User input" readonly full-width no-resize v-model="report.dump"></v-textarea>
                </v-container>
                <v-container fluid class="report-details-v-container">
                  <v-textarea class="logdump logdump-complete" ref="reportDetails" v-if="report.logdump" label="Log dump" auto-grow :max-rows="computedMaxRow" no-resize readonly full-width v-model="report.logdump"></v-textarea>
                </v-container>
              </div>
              <v-col>
                <v-expansion-panels>
                  <v-expansion-panel class="pa-0">
                    <v-expansion-panel-title class="pa-1">{{report.data.source_func}} ({{ report.data.source_file }}:{{ report.data.source_line}})</v-expansion-panel-title>
                    <v-expansion-panel-text class="report-list-stacktrace">
                      <v-list density="compact" :lines="false" nav>
                        <v-list-item :title="report.data.source_file" :subtitle="report.data.source_line">
                          <v-tooltip activator="parent" location="left">{{ report.data.source_file }}:{{ report.data.source_line }}</v-tooltip>
                        </v-list-item>
                        <v-list-item v-for="item in formatCallstack(report.data.callstack)" :key="item.name" :title="item.name" :subtitle="item.line">
                          <v-tooltip activator="parent" location="left">{{ item.name }}:{{ item.line }}</v-tooltip>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-card v-if="report.data == null">
                  <template v-slot:title>
                    No stack trace
                  </template>

                  <template v-slot:subtitle>
                    Custom bug report
                  </template>
                </v-card>

                <v-card>
                  <template v-slot:title>
                    Hardware specifications
                  </template>

                  <v-list dense subheader>
                    <v-list-item>
                      <v-list-item-title>{{ report.version }}</v-list-item-title>
                      <v-list-item-subtitle>Version</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.name }}</v-list-item-title>
                      <v-list-item-subtitle>OS</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.cpu.thread }}</v-list-item-title>
                      <v-list-item-subtitle>Can thread</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.cpu.count }}</v-list-item-title>
                      <v-list-item-subtitle>CPU count</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.cpu.model }}</v-list-item-title>
                      <v-list-item-subtitle>Model</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.locale }}</v-list-item-title>
                      <v-list-item-subtitle>Locale</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.screen.vsync }}</v-list-item-title>
                      <v-list-item-subtitle>VSync</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.screen.resolution }}</v-list-item-title>
                      <v-list-item-subtitle>Resolution</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.screen.fullscreen }}</v-list-item-title>
                      <v-list-item-subtitle>Fullscreen</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.screen.size }}</v-list-item-title>
                      <v-list-item-subtitle>Window size</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>{{ report.system.executable }}</v-list-item-title>
                      <v-list-item-subtitle>Executable</v-list-item-subtitle>
                      <v-tooltip activator="parent" location="bottom">{{ report.system.executable }}</v-tooltip>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </div>
          </template>
        </v-container>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style src="./style.css" scoped></style>
