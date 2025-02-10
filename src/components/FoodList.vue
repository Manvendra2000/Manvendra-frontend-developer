<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Indian Food Items</h1>
  
      <!-- Filters -->
      <div class="flex gap-4 mb-4">
        <input
          v-model="searchQuery"
          placeholder="Search food..."
          class="border p-2 rounded-md w-full"
        />
        <select v-model="sortOrder" class="border p-2 rounded-md">
          <option value="asc">Sort by Rating (Low to High)</option>
          <option value="desc">Sort by Rating (High to Low)</option>
        </select>
      </div>
  
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FoodItem
          v-for="food in filteredFoods"
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
  import FoodItem from "./FoodItem.vue";
  import FoodModal from "./FoodModal.vue";
  
  export default {
    components: { FoodItem, FoodModal },
    setup() {
      const foodItems = ref([]);
      const selectedFood = ref(null);
      const searchQuery = ref("");
      const sortOrder = ref("asc");
  
      const fetchIndianFood = async () => {
        try {
          const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
          );
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
  
      const filteredFoods = computed(() => {
        let foods = foodItems.value.filter((food) =>
          food.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        return foods.sort((a, b) =>
          sortOrder.value === "asc" ? a.rating - b.rating : b.rating - a.rating
        );
      });
  
      onMounted(fetchIndianFood);
  
      return { foodItems, selectedFood, selectFood, searchQuery, sortOrder, filteredFoods };
    },
  };
  </script>