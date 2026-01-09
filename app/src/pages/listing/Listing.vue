<template>
  <section class="space-y-8">
    <div class="grid lg:grid-cols-2 gap-6 items-center">
      <div class="space-y-4">
        <p class="text-amber-300 text-sm font-semibold">Live PostGIS-backed search</p>
        <h1 class="text-3xl md:text-4xl font-bold leading-tight">
          Discover parcels, buildings, and imagery with a few keystrokes.
        </h1>
        <p class="text-slate-300 leading-relaxed">
          Query the database by coordinates, explore parcel and building footprints, and open detailed overlays for each
          property. Everything is powered by PostgreSQL/PostGIS and exposed via the Express API.
        </p>
        <div class="flex gap-3 text-sm text-slate-200">
          <span class="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30">GET /properties</span>
          <span class="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40">POST /find</span>
          <span class="px-3 py-1 rounded-full bg-blue-400/20 border border-blue-300/40">GET /display/:id</span>
        </div>
      </div>
      <div class="relative">
        <div class="absolute inset-0 blur-3xl bg-emerald-400/20 rounded-full"></div>
        <div class="relative bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/40">
          <p class="text-xs text-slate-300 uppercase tracking-wide">Live metrics</p>
          <div class="grid grid-cols-3 gap-4 mt-3">
            <div class="metric">
              <p class="label">Properties</p>
              <p class="value">{{ properties.length }}</p>
            </div>
            <div class="metric">
              <p class="label">Geometries</p>
              <p class="value">{{ polygonCount }}</p>
            </div>
            <div class="metric">
              <p class="label">Images</p>
              <p class="value">{{ properties.length }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SearchForm @search="handleSearch" />

    <div class="flex items-center justify-between text-sm text-slate-300">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span v-if="highlightedIds" class="font-semibold text-emerald-200">
          Showing {{ highlightedIds.size }} matches within the requested radius.
        </span>
        <span v-else>Showing all properties.</span>
      </div>
      <button v-if="highlightedIds" class="text-amber-300 hover:underline" @click="clearSearch">Clear filter</button>
    </div>

    <PropertyTable :items="visibleProperties" :highlight-ids="highlightedIds" />
  </section>
</template>

<script>
import { ref } from 'vue';
import { fetchProperties, searchByCoordinates, buildImageUrl } from '../../api/client';
import PropertyTable from './components/PropertyTable.vue';
import SearchForm from './components/SearchForm.vue';

const properties = ref([]);
const highlightedIds = ref(null);

export default {
    name: 'ListingPage',
    components: { PropertyTable, SearchForm },
    data() {
        return {
            properties: properties.value,
            highlightedIds: highlightedIds.value
        };
    }, 
    computed:{
        visibleProperties(){
            if(!this.highlightedIds) return this.properties;
            return this.properties.filter((p) => this.highlightedIds.has(p.id));
        },
        polygonCount(){
            return this.properties.reduce((count, p) => {
                const parcelRings = p.parcel_geo?.coordinates?.length || 0;
                const buildingRings = p.building_geo?.coordinates?.length || 0;
                return count + parcelRings + buildingRings;
            }, 0);
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        async load() {
            const data = await fetchProperties();
            this.properties = await Promise.all(data.map(async (item) => ({ ...item, src: buildImageUrl(item.id) })));
        },
        async handleSearch(payload) {
            const ids = await searchByCoordinates(payload);
            this.highlightedIds = new Set(ids);
        },
        clearSearch() {
            this.highlightedIds = null;
        }
    }
};
</script>

<style scoped>
.metric {
  @apply bg-white/5 border border-white/10 rounded-2xl p-4 shadow-inner shadow-black/30;
}
.label {
  @apply uppercase tracking-wide text-slate-300 text-[11px];
}
.value {
  @apply text-2xl font-bold text-white;
}
</style>
