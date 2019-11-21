<template>
  <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="border-radius: 8px !important;">
    <div class="d-flex align-items-center">
      <h3 class="mr-auto" style="text-align: start">Answers</h3>
    </div>
      <ListAnswer class="px-3" v-for="answer in question.answers" :key="answer._id" :answer="answer"></ListAnswer>
    <FormAnswer :action="'add'" class="p-4"></FormAnswer>

  </b-card>
</template>

<script>
import ListAnswer from '../components/ListAnswer'
import FormAnswer from '../components/FormAnswer'

import { mapState } from 'vuex'
export default {
  name: 'AnswerDetail',
  components: { ListAnswer, FormAnswer },
  computed: mapState(['question']),
  methods: {

  },
  created () {
  }
}
</script>

<style>

</style>
