<template>
  <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="border-radius: 8px !important;">
    <div class="d-flex align-items-center">
      <h2 class="mr-auto" style="text-align: start">{{ question.title }}</h2>
      <div id="action">
        <span id="editQuestion" @click="goToEditQuestion">
          <font-awesome-icon :icon="['fas', 'pen']" class="mr-2"/>
        </span>
        <span id="deleteQuestion" @click="deleteQuestion">
          <font-awesome-icon :icon="['fas', 'trash']" class="mx-2" />
        </span>
      </div>
    </div>
    <div class="d-flex mt-4">
      <div class="d-flex flex-column mx-4">
          <div id="upvote" @click.prevent="upvoteQuestion">
              <font-awesome-icon :icon="['fas', 'arrow-up']" style="" />
          </div>
          <span> {{ question.upvotes.length - question.downvotes.length }} </span>
          <div id="downvote" @click.prevent="downvoteQuestion">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
          </div>
      </div>
      <div class="d-flex flex-column align-items-start justify-content-between mr-auto">
          <div v-html="question.description" style="text-align: start" ></div>
          <div id="s" class="mt-2">
            <b-button v-for="question in questions" :key="question._id" variant="outline-secondary" size="sm" pill style="font-size: 0.8em; margin-left: 5px">{{  }}</b-button>
          </div>
      </div>
      <div class="align-self-end">
          by: {{ question.user.name }}
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QuestionDetail',
  computed: {
    ...mapState({
      question: state => state.question
    })
  },
  methods: {
    goToEditQuestion () {
      this.$router.push(`/question/edit/${this.$route.params.id}`)
    },
    getQuestion () {
      this.$store.dispatch('getQuestion')
    },
    upvoteQuestion () {
      this.$store.dispatch('upvoteQuestion', this.$route.params.id)
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
    downvoteQuestion () {
      this.$store.dispatch('downvoteQuestion', this.$route.params.id)
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
    deleteQuestion () {
      this.$swal.fire({
        title: 'Are you sure to delete this question?',
        text: 'You will be revert this changes!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteQuestion', this.$route.params.id)
            .then(message => {
              this.$swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
              }).fire({
                type: 'success',
                title: message
              })

              this.$router.push('/')
            })
            .catch(errors => {
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
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getQuestion', this.$route.params.id)
      .then()
      .catch(errors => {
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
        this.$router.push('/')
      })
  }
}
</script>

<style scoped>
  #action, #upvote, #downvote {
    cursor:pointer;
  }
</style>
