export default {
  name: 'BugList',
  props: ['application_data', 'token', 'version_list'],
  emits: ['update:token'],
  data: () => ({
    versions: {},
    versionKeys: [],
    versionSelected: 'None',

    selectedBug: null,
    sending: false,
    fixed: 0,

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
      this.versions = versionList.reduce((acc, item) => {
        acc[item.name] = item.cracked

        return acc
      }, {})
      this.versionKeys = ['None'].concat(Object.keys(this.versions))
      this.versionSelected = this.versionKeys[0]
    }
  },
  mounted() {
    this.versions = this.version_list.reduce((acc, item) => {
      acc[item.name] = item.cracked

      return acc
    }, {})
    this.versionKeys = ['None'].concat(Object.keys(this.versions))
    this.versionSelected = this.versionKeys[0]

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

      if (platformName == 'x11') {
        return 'mdi-debian'
      }

      return 'mdi-apple'
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
