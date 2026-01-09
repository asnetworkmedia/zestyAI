<template>
  <form @submit.prevent="onSubmit" class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
    <div>
      <label class="text-xs uppercase tracking-wide text-slate-300">Longitude</label>
      <input v-model.number="longitude" type="number" step="0.000001" required class="input" />
    </div>
    <div>
      <label class="text-xs uppercase tracking-wide text-slate-300">Latitude</label>
      <input v-model.number="latitude" type="number" step="0.000001" required class="input" />
    </div>
    <div>
      <label class="text-xs uppercase tracking-wide text-slate-300">Radius (m)</label>
      <input v-model.number="radius" type="number" min="1" class="input" />
    </div>
    <div class="flex items-end">
      <button type="submit" class="btn">Search by coordinates</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const longitude = ref(-80.0782213);
const latitude = ref(26.8849731);
const radius = ref(10000);

const onSubmit = () => {
  emit('search', {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude.value, latitude.value]
    },
    'x-distance': Number(radius.value) || 10000
  });
};
</script>

<style scoped>
.input {
  @apply w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-300/70;
}
.btn {
  @apply w-full rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-900 font-semibold px-4 py-2 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition;
}
</style>
