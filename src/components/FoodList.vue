<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Food Items</h1>

    <!-- Filters Section -->
    <FilterSection @filter="fetchFoodByArea" @sort="sortFoods" />

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <FoodItem
        v-for="food in sortedFoods"
        :key="food.idMeal"
        :food="food"
        @click="selectFood(food.idMeal)"
      />
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
    const sortOrder = ref("asc");

    const fetchFoodByArea = async (area) => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await res.json();
        foodItems.value = data.meals.map(meal => ({
          ...meal,
          rating: (Math.random() * 5).toFixed(1)
        }));
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

    onMounted(() => fetchFoodByArea("Indian"));

    return { foodItems, selectedFood, selectFood, fetchFoodByArea, sortFoods, sortedFoods };
  },
};
</script>