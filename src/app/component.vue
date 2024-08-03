<template>
  <div>
    <v-app>
      <!-- Wizard form //-->
      <v-app-bar color="indigo" v-if="!setupAdminWizard">
        <v-divider class="border-opacity-0" color="info" vertical thickness="32"></v-divider>
        <v-toolbar-side-icon>
          <v-img class="mr-3" aspect-ratio="1/1" src="/images/logo.png" height="32px" width="32px"></v-img>
        </v-toolbar-side-icon>
        <v-toolbar-title>Indie Maker Tool</v-toolbar-title>
      </v-app-bar>

      <!-- Wizard done - not logged in //-->    
      <LandingPage v-if="!token && setupAdminWizard" @loggedIn="loggedIn" @error="showError"></LandingPage>

      <!-- User logged in //-->
      <v-app-bar color="indigo" v-if="token && setupAdminWizard">
        <v-toolbar-title>Indie Maker Tool</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" icon="mdi-book-refresh" @click="listVersions" class="mx-2">
          <v-icon>mdi-book-refresh</v-icon>
          <v-tooltip activator="parent" location="bottom" text="Refresh applications versions"></v-tooltip>
        </v-btn>
        <v-btn color="white" icon="mdi-key" @click="openJoinProjectDialog" class="mx-2">
          <v-icon>mdi-key</v-icon>
          <v-tooltip activator="parent" location="bottom" text="Add new project using an invitation key"></v-tooltip>
        </v-btn>
        <v-btn color="white" icon="mdi-home-plus-outline" @click="openCreateProjectDialog" class="mx-2" v-if="userType < 2">
          <v-icon>mdi-home-plus-outline</v-icon>
          <v-tooltip activator="parent" location="bottom" text="Create a new project"></v-tooltip>
        </v-btn>
        <v-select v-model="selectedApplication" :items="applications" label="Games" item-title="name" :item-props="true" return-object>
          <template v-slot:item="{ props }" >
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <v-icon :disabled="isProjectFavorite(props)" @click="setFavoriteProject(props)">{{ computeProjectFavoriteIcon(props) }}</v-icon>
              </template>
            </v-list-item>
          </template>
        </v-select>
        <v-btn icon @click="logout" class="mx-2">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-app-bar color="white" v-if="token && setupAdminWizard">
        <v-spacer></v-spacer>
        <v-tabs v-model="tabView" v-if="setupProjectWizard">
          <v-tab value="buglist">Bug List</v-tab>
          <v-tab value="steamanalytics" :disabled="!isSteamIdValid()">Analytics Steam</v-tab>
          <v-tab value="reportList">Report list</v-tab>
          <v-tab value="playtests">Playtests</v-tab>
          <v-tab value="settings">Settings</v-tab>
          <v-tab value="administration" v-if="userType == 0">Administration</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <CreateAdminForm v-if="!setupAdminWizard" @adminCreated="adminCreated" @error="showError"></CreateAdminForm>
        <CreateProjectForm ref="createProjectForm" @projectCreated="projectCreated" @error="showError" @info="showInfo" v-model:token="token" v-if="userType < 2"></CreateProjectForm>
        <JoinProjectForm ref="joinProjectForm" @projectJoined="projectCreated" @error="showError" @info="showInfo" v-model:token="token"></JoinProjectForm>
        
        <v-window v-model="tabView" v-if="token && setupAdminWizard && selectedApplication != null">
          <v-window-item value="buglist">
            <BugList @error="showError" @info="showInfo" @openReport="openReportView" v-model:token="token" :application_data="selectedApplication" :version_list="versionList"></BugList>
          </v-window-item>
          <v-window-item value="steamanalytics">
            <SteamAnalytics @error="showError" @info="showInfo" v-model:token="token" :application_data="selectedApplication"></SteamAnalytics>
          </v-window-item>
          <v-window-item value="reportList">
            <ReportList @error="showError" @info="showInfo" v-model:token="token" :application_data="selectedApplication" :version_list="versionList" :report_data="reportData"></ReportList>
          </v-window-item>
          <v-window-item value="playtests">
            <Playtests @error="showError" @info="showInfo" v-model:token="token" :application_data="selectedApplication"></Playtests>
          </v-window-item>
          <v-window-item value="settings">
            <ProjectSettings @error="showError" @info="showInfo" @updateApplicationData="updateApplicationData" v-model:token="token" :application_data="selectedApplication"></ProjectSettings>
          </v-window-item>
          <v-window-item value="administration" v-if="userType == 0">
            <Administration @error="showError" @info="showInfo" v-model:token="token"></Administration>
          </v-window-item>
        </v-window>
        <NotificationSnackbar :infoMessage="infoMessage" :errorObject="errorObject" :errorMessage="errorMesage"></NotificationSnackbar>
      </v-main>
      <v-footer color="indigo" app inset id="application-footer">
        <span class="white--text">&copy; Binogure Studio 2025</span>
      </v-footer>
    </v-app>

    <div class="scroll-button">
      <v-btn v-show="showButton" color="indigo" @click="scrollToTop" icon="mdi-arrow-up"></v-btn>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css"></style>
