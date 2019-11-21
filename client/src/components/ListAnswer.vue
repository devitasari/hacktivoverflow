<template>
  <div>
    <div v-if="!editing" class="d-flex mt-4 py-2" style="border-bottom: solid 1px black">
      <div class="d-flex flex-column mx-4">
        <div id="upvote" @click.prevent="upvoteAnswer">
            <font-awesome-icon :icon="['fas', 'arrow-up']" style="" />
        </div>
        <span> {{ answer.upvotes.length - answer.downvotes.length }} </span>
        <div id="downvote" @click.prevent="downvoteAnswer">
            <font-awesome-icon :icon="['fas', 'arrow-down']" />
        </div>
      </div>
      <div class="d-flex flex-column align-items-start justify-content-between mr-auto">
        <div v-html="answer.description"></div>

      </div>
      <div class="d-flex flex-column justify-content-between align-items-end">
        <div id="action" class="">
          <span id="editQuestion" @click="goToEditAnswer">
          <font-awesome-icon :icon="['fas', 'pen']" class="mr-2"/>
          </span>
          <span id="deleteQuestion" @click="deleteAnswer">
            <font-awesome-icon :icon="['fas', 'trash']" class="mx-2" />
          </span>
        </div>
        by: {{ answer.user.name }}
      </div>

    </div>
    <div v-else class="p-4">
      <b-form class="d-flex flex-column align-items-start" @submit="onSubmit" @reset="onReset">
        <h5>Your Answer</h5>
        <quill-editor v-model="form.description"
                ref="myQuillEditor">
        </quill-editor>
        <b-form-group class="d-flex flex-row mt-2 mb-0">
            <b-button class="mr-1" type="submit" size="sm" variant="outline-warning">
                <b-spinner v-if="loading" small type="grow"></b-spinner>
                Submit
            </b-button>
            <b-button class="mr-1" size="sm" variant="outline-secondary" @click="cancel" >
                Cancel
            </b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ListAnswer',
  props: ['answer'],
  data () {
    return {
      editing: false,
      form: {
        description: ''
      },
      loading: false
    }
  },
  methods: {
    upvoteAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('upvoteAnswer', payload)
        .then(message => {
          this.loading = false

          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'warning',
              title: error
            })
          })
        })
    },
    downvoteAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.id
      }
      this.$store.dispatch('downvoteAnswer', payload)
        .then(message => {
          this.loading = false

          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'warning',
              title: error
            })
          })
        })
    },
    goToEditAnswer () {
      this.form.description = this.answer.description
      this.editing = true
    },
    cancel () {
      this.editing = false
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.editAnswer()
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.description = ''
      this.$nextTick(() => {
        this.show = true
      })
    },
    editAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$store.state.question._id,
        data: this.form
      }
      this.loading = true
      this.$store.dispatch('editAnswer', payload)
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
          this.editing = false
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
    deleteAnswer () {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$store.state.question._id
      }

      this.$swal.fire({
        title: 'Are you sure to delete this answer?',
        text: "You can't revert this changes!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteAnswer', payload)
            .then(message => {
              this.$swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000
              }).fire({
                type: 'success',
                title: message
              })
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
      })
    }
  }

}
</script>

<style scoped>
  #action, #upvote, #downvote {
    cursor:pointer;
  }
</style>
