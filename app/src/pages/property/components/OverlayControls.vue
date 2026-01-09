<template>
  <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-white">Overlay geometries</p>
        <p class="text-xs text-slate-300">Parcel and building polygons rendered over imagery.</p>
      </div>
      <label class="inline-flex items-center gap-2 text-sm">
        <input v-model="localOverlay" type="checkbox" class="accent-amber-400" />
        <span>Enabled</span>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-3 text-sm" :class="{ 'opacity-50 pointer-events-none': !localOverlay }">
      <div class="flex flex-col gap-2">
        <label class="text-xs uppercase tracking-wide text-slate-300">Parcel color</label>
        <select v-model="localParcel" class="select">
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-xs uppercase tracking-wide text-slate-300">Building color</label>
        <select v-model="localBuilding" class="select">
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed } from 'vue';

export default {
    name: 'OverlayControls',
    props: {
        overlay: {
            type: Boolean,
            default: true
        },
        parcelColor: {
            type: String,
            default: 'orange'
        },
        buildingColor: {
            type: String,
            default: 'green'
        }
    },
    emits: ['update:overlay', 'update:parcelColor', 'update:buildingColor'],
    computed: {
        localOverlay: {
            get() {
                return this.overlay;
            },
            set(value) {
                this.$emit('update:overlay', value);
            }
        },
        localParcel: {
            get() {
                return this.parcelColor;
            },
            set(value) {
                this.$emit('update:parcelColor', value);
            }
        },
        localBuilding: {
            get() {
                return this.buildingColor;
            },
            set(value) {
                this.$emit('update:buildingColor', value);
            }
        }
    },
};
</script>

<style scoped>
.select {
  @apply w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-300/70;
}
</style>
