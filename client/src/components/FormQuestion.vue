<template>
  <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="max-width: 70rem; border-radius: 8px !important;">
    <b-form class="d-flex flex-column align-items-start" @submit="onSubmit" @reset="onReset" v-if="show">
      <h2 v-if="action === 'add'">Add Question</h2>
      <h2 v-else>Edit Question</h2>
      <b-form-input id="title" class="mt-3 my-2" v-model="form.title" type="text" placeholder="Title" required></b-form-input>
      <quill-editor class="my-2" v-model="form.description"
              ref="myQuillEditor">
      </quill-editor>

      <b-form-group class="d-flex flex-row mt-4 mb-0">
        <b-button class="mr-1" type="submit" size="sm" variant="outline-warning">
          <b-spinner v-if="loading" small type="grow"></b-spinner>
          Submit
        </b-button>

        <b-button size="sm" variant="outline-secondary" @click="cancel">Cancel</b-button>
      </b-form-group>
      </b-form>
    </b-card>
</template>

<script>
export default {
  name: 'FormQuestion',
  props: ['action'],
  data () {
    return {
      form: {
        title: '',
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
        this.addQuestion()
      } else {
        this.editQuestion()
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.title = ''
      this.form.description = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addQuestion () {
      this.loading = true
      this.$store.dispatch('addQuestion', this.form)
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
          this.$router.push('/')
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
    },
    editQuestion () {
      let payload = {
        questionId: this.$route.params.id,
        data: this.form
      }
      this.loading = true
      this.$store.dispatch('editQuestion', payload)
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
          this.$router.push(`/question/${this.$route.params.id}`)
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
    },
    cancel () {
      this.$router.go(-1)
    },
    doStuff (id) {
      console.log(id)
    }
  },
  created () {
    if (this.action === 'edit') {
      this.$store.dispatch('getQuestion', this.$route.params.id)
        .then(question => {
          this.form.title = question.title
          this.form.description = question.description
        })
    }
  },
  watch: {
    '$route.params.id': function (id) {
      this.doStuff(id)
    }
  }
}
</script>

<style scoped>
  quill-editor {
    margin-bottom: 10px;
  }
</style>
