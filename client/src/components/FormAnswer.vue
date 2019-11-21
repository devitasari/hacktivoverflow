<template>
  <b-form class="d-flex flex-column align-items-start" @submit="onSubmit" @reset="onReset" v-if="show">
      <h5>Your Answer</h5>
      <quill-editor v-model="form.description"
              ref="myQuillEditor">
      </quill-editor>
      <b-form-group class="d-flex flex-row mt-2 mb-0">
          <b-button class="mr-1" type="submit" size="sm" variant="outline-warning">
              <b-spinner v-if="loading" small type="grow"></b-spinner>
              Submit
          </b-button>
      </b-form-group>
  </b-form>
</template>

<script>

export default {
  name: 'FormAnswer',
  props: ['action', 'answer'],
  data () {
    return {
      form: {
        description: ''
      },
      show: true,
      loading: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.action === 'add') {
        this.addAnswer()
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.description = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addAnswer () {
      let payload = {
        questionId: this.$route.params.id,
        data: this.form
      }
      this.loading = true
      this.$store.dispatch('addAnswer', payload)
        .then(message => {
          this.loading = false

          this.$swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
          this.form.description = ''
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'warning',
              title: error
            })
          })
        })
    }
  },
  created () {

  }

}
</script>

<style>

</style>
