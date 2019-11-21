<template>
  <b-card @click="goToDetail(question._id)" id="question" class="shadow" style="border-radius: 5px">
    <div  class="d-flex">
      <div id="votes" class="mr-3">
        <div style="font-size: 1.3em; font-weight: 500">
          {{ question.upvotes.length - question.downvotes.length }}
        </div>
        <div style="font-size: 0.85em;">
          votes
        </div>
      </div>
      <div id="answers" class="mr-3">
        <div style="font-size: 1.3em; font-weight: 500">
           {{ question.answers.length }}
        </div>
        <div style="font-size: 0.85em;">
          answers
        </div>
      </div>
      <div id="content-question" class="d-flex flex-column align-items-start mr-auto">
        <h4>{{ question.title }}</h4>
        <div v-html="question.description" style="text-align: start" ></div>
      </div>
      <div id="askedBy" class="align-self-end" style="font-size: 0.8em">
        by: {{ question.user.name }}
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Question',
  props: ['question'],
  methods: {
    goToDetail (id) {
      this.$router.push(`/question/${id}`)
    }
  }

}
</script>

<style>
  #question {
    cursor: pointer;
    background-color: white;
  }

  #question:hover {
    background-color: #F6F6F6;
  }
</style>
