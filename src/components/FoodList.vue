<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Food Items</h1>

    <!-- Filters Section -->
    <FilterSection @filter="fetchFoodByArea" @sort="sortFoods" />

    <!-- Food Items Section -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <FoodItem
        v-for="food in paginatedFoods"
        :key="food.idMeal"
        :food="food"
        @click="selectFood(food.idMeal)"
      />
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center items-center mt-6 space-x-2">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="px-4 py-2 rounded-lg"
        :class="currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'"
        @click="currentPage = page"
      >
        {{ page }}
      </button>

      <button
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>

    <FoodModal v-if="selectedFood" :food="selectedFood" @close="selectedFood = null" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import FilterSection from "./FilterSection.vue";
import FoodItem from "./FoodItem.vue";
import FoodModal from "./FoodModal.vue";

export default {
  components: { FilterSection, FoodItem, FoodModal },
  setup() {
    const foodItems = ref([]);
    const selectedFood = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(8); // Items displayed per page
    const sortOrder = ref("asc");

    const fetchFoodByArea = async (area) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await res.json();
        foodItems.value = data.meals.map((meal) => ({
          ...meal,
          rating: (Math.random() * 5).toFixed(1),
        }));
        currentPage.value = 1; // Reset to first page on new fetch
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    const selectFood = async (id) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        selectedFood.value = data.meals[0];
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    const sortFoods = (order) => {
      sortOrder.value = order;
    };

    const sortedFoods = computed(() => {
      return [...foodItems.value].sort((a, b) =>
        sortOrder.value === "asc"
          ? a.strMeal.localeCompare(b.strMeal)
          : b.strMeal.localeCompare(a.strMeal)
      );
    });

    const totalPages = computed(() => {
      return Math.ceil(sortedFoods.value.length / itemsPerPage.value);
    });

    const paginatedFoods = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return sortedFoods.value.slice(start, end);
    });

    onMounted(() => fetchFoodByArea("Indian"));

    return {
      foodItems,
      selectedFood,
      currentPage,
      totalPages,
      paginatedFoods,
      fetchFoodByArea,
      selectFood,
      sortFoods,
    };
  },
};
</script>