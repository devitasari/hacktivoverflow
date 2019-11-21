<template>
  <b-container>
    <QuestionDetail></QuestionDetail>
    <AnswerDetail></AnswerDetail>
  </b-container>
</template>

<script>
import QuestionDetail from '../components/QuestionDetail'
import AnswerDetail from '../components/AnswerDetail'

export default {
  name: 'Questions',
  components: { QuestionDetail, AnswerDetail }
}
</script>

<style>

</style>
