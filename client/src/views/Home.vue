<template>
  <b-container id="home">
    <b-card title="Newest Questions" class="shadow bg-white" style="border-radius: 5px"></b-card>
    <Question v-for="question in questions" :key="question._id" :question="question" />
  </b-container>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { Question },
  computed: mapState(['questions']),
  methods: {
    goToDetail (id) {
      this.$router.push(`/questions/${id}`)
    }
  },
  created () {
    this.$store.dispatch('fetchQuestions')
  }
}
</script>
