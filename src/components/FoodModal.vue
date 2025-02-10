<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button class="absolute top-2 right-2 text-gray-600" @click="$emit('close')">✖</button>
        <h2 class="text-xl font-bold mb-2">{{ food.strMeal }}</h2>
        <img :src="food.strMealThumb" class="w-full h-48 object-cover rounded-lg" />
        <p class="mt-2 text-gray-600">{{ food.strInstructions }}</p>
        <a
          v-if="food.strYoutube"
          :href="food.strYoutube"
          target="_blank"
          class="text-blue-500 mt-2 inline-block"
          >Watch Recipe Video 🎥</a
        >
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      food: Object,
    },
  };
  </script>