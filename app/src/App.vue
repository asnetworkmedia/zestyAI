<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-white/10 backdrop-blur bg-white/5 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-xl bg-amber-400/90 text-slate-900 font-black grid place-items-center">
            PF
          </div>
          <div>
            <p class="text-lg font-semibold">Property Finder</p>
            <p class="text-xs text-slate-300">Search, inspect, and overlay parcels.</p>
          </div>
        </div>
        <nav class="flex items-center gap-6 text-sm text-slate-200">
          <RouterLink class="hover:text-amber-300 transition" to="/">Listing</RouterLink>
          <RouterLink class="hover:text-amber-300 transition" to="/property/f853874999424ad2a5b6f37af6b56610">
            Sample Property
          </RouterLink>
          <a class="hover:text-amber-300 transition" href="/docs" target="_blank">API Docs</a>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
      <RouterView />
    </main>

    <footer class="border-t border-white/10 text-xs text-slate-400 px-6 py-4 max-w-6xl mx-auto w-full">
      Built with Vue 3, Tailwind CSS, Express, Sequelize, and PostGIS.
    </footer>
  </div>
</template>

<script setup></script>
