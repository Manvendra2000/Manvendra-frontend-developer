<template>
  <header class="bg-white shadow-md p-4 md:px-16">
    <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <!-- Logo Section -->
      <img
        src="../assets/Swiggy-logo-768x432.png"
        alt="Swiggy Logo"
        class="h-8"
      />

      <!-- Search Box -->
      <div class="relative w-full max-w-md md:w-1/2">
        <input
          type="text"
          placeholder="Search for restaurant and food"
          class="w-full border rounded-full px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          🔍
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>