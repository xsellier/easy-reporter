<template>
  <div class="bug-list-column">
    <div class="bug-list-column-list">
      <v-list class="bug-list-list" :lines="false" density="compact" nav>
        <v-list-subheader>Bugs ({{ bugList.length }} / {{ totalItems }})</v-list-subheader>
        <v-list-item v-for="bugData in bugList" :key="bugData.title" :class="{'selected': isSelected(bugData.title)}" active-color="primary" @click="info(bugData)">
          <v-list-item-title>{{ bugData.title }}</v-list-item-title>
          <v-tooltip activator="parent" location="right">
            <v-sheet class="bug-list-tooltip">{{ bugData.title }}</v-sheet>
          </v-tooltip>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="bug-list-footer">
        <v-row justify="center" no-gutters>
          <v-pagination v-model="currentPage" :length="totalPages" @update:modelValue="changePage()" size="x-small" total-visible=6 density="compact"></v-pagination>
        </v-row>
      </div>
    </div>
    <div class="bug-list-column-details">
      <v-toolbar class="toolbar-first">
        <v-spacer></v-spacer>
        <v-select :items="version_list" v-model="versionSelected" label="Version"></v-select>
        <v-spacer></v-spacer>
        <v-checkbox label="Fixed" @click="checkboxChange('fixed')" v-model="fixedValue" :indeterminate="isCheckboxIndeterminate('fixed')"></v-checkbox>
        <v-checkbox label="Show ignored bugs" v-model="ignored"></v-checkbox>
        <v-btn color="indigo" :disabled="sending" v-on:click="list">Refresh</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="bug-list-informations" v-if="selectedBug != null">
        <v-btn :prepend-icon="selectedBug.ignored ? 'mdi-bell-off' : 'mdi-bell'" class="text-none" variant="text" @click="setFlagBugIgnored(selectedBug.title, !selectedBug.ignored)">{{ selectedBug.title }}</v-btn>
        <v-list lines="two">
          <v-list-item v-for="bugreport in bugInformations" :key="bugreport.filename">
            <v-list-item-subtitle>Number of report: {{ bugreport.number_of_report }}</v-list-item-subtitle>
            <v-list-item-title>Version {{ bugreport.version }}</v-list-item-title>
            <v-list-item-subtitle>{{ bugreport.created_at }}</v-list-item-subtitle>

            <template v-slot:prepend>
              <v-avatar>
                <v-icon color="indigo">{{ getPlatformIcon(bugreport.platform.toLowerCase()) }}</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn :disabled="sending" color="green-lighten-2" icon="mdi-check-circle" variant="text" v-if="bugreport.fixed == 1" @click="setFlagBugFixed(bugreport, false)"></v-btn>
              <v-btn :disabled="sending" color="red-lighten-3" icon="mdi-message-alert" variant="text" v-if="bugreport.fixed != 1" @click="setFlagBugFixed(bugreport, true)"></v-btn>
              <v-btn :disabled="sending" color="grey-darken-1" icon="mdi-folder-open" variant="text" @click="openReport(bugreport.filename, bugreport.version)"></v-btn>
              <v-btn :disabled="sending" color="grey-darken-1" icon="mdi-refresh-circle" variant="text" @click="info(selectedBug)"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
