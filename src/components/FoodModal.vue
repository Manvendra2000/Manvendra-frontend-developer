<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      class="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto relative p-6 shadow-lg"
    >
      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        @click="$emit('close')"
      >
        ✖
      </button>

      <!-- Modal Title -->
      <h2 class="text-xl font-bold mb-4">{{ food.strMeal }}</h2>

      <!-- Modal Image -->
      <img
        :src="food.strMealThumb"
        alt="Food Image"
        class="w-full h-48 object-cover rounded-lg mb-4"
      />

      <!-- Instructions with Text Limit -->
      <div>
        <p v-if="!showFullText" class="text-gray-600">
          {{ truncatedInstructions }}...
          <button
            class="text-orange-500 underline ml-2"
            @click="showFullText = true"
          >
            Read more
          </button>
        </p>
        <p v-else class="text-gray-600">
          {{ food.strInstructions }}
          <button
            class="text-orange-500 underline ml-2"
            @click="showFullText = false"
          >
            Show less
          </button>
        </p>
      </div>

      <!-- Recipe Video -->
      <a
        v-if="food.strYoutube"
        :href="food.strYoutube"
        target="_blank"
        class="text-blue-500 inline-block mt-4"
      >
        Watch Recipe Video 🎥
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object,
  },
  data() {
    return {
      showFullText: false, // Tracks whether full text is shown
    };
  },
  computed: {
    // Truncated text for long instructions
    truncatedInstructions() {
      const maxLength = 100; // Adjust text limit here
      return this.food.strInstructions?.slice(0, maxLength) || "";
    },
  },
};
</script>

<style>
/* Custom scroll styling */
.max-h-[90vh]::-webkit-scrollbar {
  width: 8px;
}
.max-h-[90vh]::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>