<template>
  <div class="bg-gray-100 min-h-screen">
    <Header/>
    <HomeView />
    <Footer/>
  </div>
</template>

<script>
import HomeView from "./views/HomeView.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { HomeView, Header, Footer },
};
</script>