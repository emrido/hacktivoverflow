<template>
  <div>
    <v-container align-content-center grid-list-xl>
      <v-flex v-for="(question, i) in questions" :key="i" >
          
        <Question :question="question" />
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Question from "@/components/Question.vue"
export default {
  name: "questions",
  components: {
    Question
  },
  data() {
    return {
      questions: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/questions/", { 
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        this.questions = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
