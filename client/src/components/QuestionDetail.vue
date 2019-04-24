<template>
  <v-container align-content-center>
    <h1 class="display-1 t mt-4">Question</h1>
    <br>
    <h3 class="md-2">
      Upvotes:
      <span>{{ question.upvotes.length }}</span> |
      Downvotes:
      <span>{{ question.downvotes.length }}</span>
    </h3>
    <h1 class="display-2">{{ question.title }}</h1>
    <h1 class="display-1 mt-2">{{ question.content }}</h1>
    <div v-for="(comment, i) in question.comments" :key="i">
      <p>
        {{ comment.content }} -
        <span class="username">{{ comment.userId.username }}</span>
      </p>
    </div>
    <hr class="mt-5">
    <h1 class="display-1 t mt-4">Answers</h1>
    <v-flex v-for="(answer, i) in question.answers" :key="i">
      <br>
      <h3>
        upvotes
        <span>{{ answer.upvotes.length }}</span> |
        downvotes
        <span>{{ answer.downvotes.length }}</span>
      </h3>
      <h2 class="display-1">{{ answer.content }}</h2>

      <div v-for="(comment, i) in answer.comments" :key="i">
        <p>
          {{ comment.content }} -
          <span class="username">{{ comment.userId.username }}</span>
        </p>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "question-detail",
  data() {
    return {
      question: ""
    };
  },
  created() {
    axios
      .get("http://localhost:3000/questions/" + this.$route.params.id, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        this.question = data;
      })
      .catch(err => {
        if (err) {
          swal(err.response.data.message);
          this.$router.push("/");
        }
      });
  }
};
</script>

<style>
.t, .username {
  color: #ff8f00;
}
</style>
