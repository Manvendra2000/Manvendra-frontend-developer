<template>
    <div class="relative">
      <!-- Filter Button -->
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-lg"
        @click="isDropdownOpen = !isDropdownOpen"
      >
        Filter
      </button>
  
      <!-- Dropdown (Shown when isDropdownOpen is true) -->
      <div
        v-if="isDropdownOpen"
        class="absolute left-0 mt-2 w-64 bg-white p-4 shadow-lg rounded-lg z-10"
      >
        <h3 class="text-lg font-semibold mb-2">Filter by Area</h3>
        <div class="max-h-40 overflow-y-auto">
          <label
            v-for="area in areas"
            :key="area.strArea"
            class="flex items-center space-x-2 mb-2"
          >
            <input
              type="radio"
              v-model="selectedArea"
              :value="area.strArea"
              class="form-radio"
            />
            <span>{{ area.strArea }}</span>
          </label>
        </div>
  
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          @click="applyFilter"
        >
          Apply
        </button>
      </div>
  
      <!-- Sort Dropdown -->
      <select v-model="sortOrder" @change="$emit('sort', sortOrder)" class="ml-4 border px-3 py-2 rounded-md">
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    emits: ["filter", "sort"],
    setup(_, { emit }) {
      const areas = ref([]);
      const selectedArea = ref("Indian"); // Default area
      const isDropdownOpen = ref(false);
      const sortOrder = ref("asc");
  
      // Fetch available areas from API
      const fetchAreas = async () => {
        try {
          const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
          const data = await res.json();
          areas.value = data.meals;
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      };
  
      const applyFilter = () => {
        isDropdownOpen.value = false;
        emit("filter", selectedArea.value);
      };
  
      onMounted(fetchAreas);
  
      return { areas, selectedArea, isDropdownOpen, applyFilter, sortOrder };
    },
  };
  </script>