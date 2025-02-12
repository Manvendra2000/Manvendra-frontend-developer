<template>
    <div
      class="food-item bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
      @click="$emit('click')"
    >
      <img :src="food.strMealThumb" alt="Food Image" class="w-full h-40 object-cover rounded-lg" />
      <h3 class="text-lg font-semibold mt-2">{{ food.strMeal }}</h3>
      <p class="text-yellow-500">⭐ {{ food.rating }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      food: Object,
    },
  };
  </script>