<template>
  <div>
    <router-link :to="{ name: 'question-detail', params: { id: question._id }}" id="name">
      <h1>{{ question.title }}</h1>
    </router-link>
      <h3> votes 
        <span>
        {{ question.upvotes.length - question.downvotes.length }}
        </span>  
      </h3>
      <h3> comments 
        <span>
        {{ question.comments.length }}
        </span>  
      </h3>
      <h3> answers 
        <span>
        {{ question.answers.length }}
        </span>  
      </h3>
  </div>
</template>

<script>
export default {
  name: "question",
  props: ["question"],
  data() {
    return {};
  }
};
</script>

<style>
#name {
  text-decoration: none;
}
</style>
