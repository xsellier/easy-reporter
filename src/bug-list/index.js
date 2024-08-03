export default {
  name: 'BugList',
  props: ['application_data', 'token', 'version_list'],
  emits: ['update:token'],
  data: () => ({
    versionSelected: 'None',

    selectedBug: null,
    sending: false,
    ignored: false,
    fixed: 2,

    bugList: [],
    bugInformations: [],

    totalPages: 1,
    currentPage: 1,
    totalItems: 0
  }),
  computed: {
    fixedValue: {
      get: function() {
        return this.isCheckboxChecked('fixed')
      },
      set: function(value) {
        // noop
      }
    }
  },
  watch: {
    application_data() {
      return this.list()
    },
    version_list(versionList) {

      this.versionSelected = versionList[0]
    }
  },
  mounted() {

    this.versionSelected = this.version_list[0]

    return this.list()
  },
  methods: {
    checkboxChange(modelName) {
      this[modelName] = (this[modelName] + 1) % 3
    },
    isCheckboxChecked(modelName) {
      return this[modelName] == 1
    },
    isCheckboxIndeterminate(modelName) {
      return this[modelName] == 0
    },
    getCheckboxValue(modelName) {
      if (this.isCheckboxChecked(modelName)) {
        return true
      }

      if (this.isCheckboxIndeterminate(modelName)) {
        return undefined
      }

      return false
    },

    getSelectedVersion: function() {
      return this.versionSelected != 'None' ? this.versionSelected : undefined
    },

    isSelected: function (bugTitle) {
      return this.selectedBug != null && bugTitle == this.selectedBug.title
    },

    getPlatformIcon: function (platformName) {
      if (platformName == 'windows') {
        return 'mdi-microsoft-windows'
      }

      if (platformName == 'x11' || platformName == 'linux') {
        return 'mdi-debian'
      }

      return 'mdi-apple'
    },

    setFlagBugIgnored: function (bugTitle, isIgnored) {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/bug/ignore`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.application_data.name,
          title: this.selectedBug.title,
          ignore: isIgnored
        }
      })
      .then(() => {
        this.selectedBug.ignored = isIgnored
        this.sending = false
        this.$emit('info', `"${bugTitle}" ${isIgnored ? 'flagged' : 'unflagged'} as ignored`)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update bug', err)
      })
    },

    setFlagBugFixed: function (bugData, isFixed) {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/bug/fixed`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          name: this.application_data.name,
          version: bugData.version,
          title: this.selectedBug.title,
          fixed: isFixed
        }
      })
      .then(() => {
        bugData.fixed = isFixed

        this.sending = false
        this.$emit('info', `"${this.selectedBug.title}" ${isFixed ? 'flagged' : 'unflagged'} as fixed`)
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot update bug', err)
      })
    },

    info: function (bugData) {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/bug/info/${this.application_data.name}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          title: bugData.title
        }
      })
      .then((response) => {
        this.sending = false
        this.selectedBug = bugData
        this.bugInformations = response.data
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list versions', err)
      })
    },

    openReport: function (filename, version) {
      this.$emit('openReport', { filename, version, title: this.selectedBug.title, uploaded: true })
    },

    list: function () {
      this.sending = true

      return this.$http({
        method: 'post',
        url: `/bug/list/${this.application_data.name}/${this.currentPage}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          fixed: this.getCheckboxValue('fixed'),
          ignored: this.ignored,
          version: this.getSelectedVersion()
        }
      })
      .then((response) => {
        response.data.list.sort((a, b) => {
          return a.updated_at < b.updated_at
        })

        this.sending = false
        this.bugList = response.data.list
        this.totalPages = response.data.maxPage
        this.currentPage = Math.min(this.currentPage, response.data.maxPage)
        this.totalItems = response.data.total
      })
      .catch((err) => {
        if (err.response && err.response.status < 500) {
          this.$emit('update:token', null)
        }

        this.sending = false
        this.$emit('error', 'Cannot list versions', err)
      })
    }
  }
}
