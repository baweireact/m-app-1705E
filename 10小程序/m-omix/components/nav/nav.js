import create from '../../utils/create'
import store from '../../store'

create(store, {
  use: [
    'motto'
  ],
  handleUpdate() {
    this.store.data.motto = '1'
  },
  methods: {
    handleUpdate() {
      this.store.data.motto = '1'
    }
  }
})