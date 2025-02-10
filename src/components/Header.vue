<template>
    <header class="flex items-center justify-between bg-white shadow-md p-4">
      <!-- Left: Logo -->
      <div class="flex items-center space-x-2">
        <img
          src="../assets/Swiggy-logo-768x432.png" 
          alt="Logo"
          class="h-8"
        />
        <span class="text-orange-500 font-bold text-xl">Swiggy</span>
      </div>
  
      <!-- Right: Search Box -->
      <div class="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search for restaurant and food"
          class="w-full border rounded-full px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          🔍
        </button>
      </div>
    </header>
  </template>
  
  <script>
  export default {};
  </script>
