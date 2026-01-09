<template>
	<section v-if="property" class="space-y-8">
		<div class="flex items-center justify-between gap-4 flex-wrap">
			<div>
				<p class="text-amber-300 text-sm font-semibold">Property detail</p>
				<h1 class="text-3xl font-bold">{{ property.id }}</h1>
				<p class="text-slate-300 text-sm mt-1">Geocode, parcel, and building overlays sourced directly from
					PostGIS.</p>
			</div>
			<RouterLink to="/"
				class="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm hover:bg-white/20">
				Back to listing
			</RouterLink>
		</div>

		<div class="grid lg:grid-cols-[2fr_1fr] gap-6">
			<div class="space-y-4">
				<div class="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-lg shadow-black/40">
					<div class="flex items-center justify-between px-5 py-3 border-b border-white/10">
						<div>
							<p class="text-sm font-semibold text-white">Imagery</p>
							<p class="text-xs text-slate-300">Fetched from the API /display endpoint.</p>
						</div>
						<span
							class="text-xs bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/40">
							{{ overlay ? 'Overlay enabled' : 'Raw tile' }}
						</span>
					</div>
					<div class="relative bg-slate-900">
						{{ imageUrl() }}
						<img :src="imageUrl()" class="w-full object-contain max-h-[70vh]"
							alt="Property imagery" />
					</div>
				</div>
			</div>

			<div class="space-y-4">
				<OverlayControls v-model:overlay="overlay" v-model:parcel-color="parcelColor"
					v-model:building-color="buildingColor" />
				<MetaTable :property="property" />
			</div>
		</div>
	</section>
	<section v-else class="text-center py-20 space-y-3">
		<p class="text-2xl font-semibold">Property not found</p>
		<RouterLink class="text-amber-300 hover:underline" to="/">Go back to listing</RouterLink>
	</section>
</template>

<script>
import { ref } from 'vue';
import { buildImageUrl, fetchPropertyById } from '../../api/client';
import OverlayControls from './components/OverlayControls.vue';
import MetaTable from './components/MetaTable.vue';

const property = ref(null);
const overlay = ref(true);
const parcelColor = ref('orange');
const buildingColor = ref('green');

export default {
	name: 'PropertyPage',
	components: {
		OverlayControls,
		MetaTable
	},
	watch: {
		'$route.params.id': 'load'
	},
	data() {
		return {
			property: null,
			overlay: true,
			parcelColor: 'orange',
			buildingColor: 'green'
		};
	},
	mounted() {
		this.load();
	},
	methods: {
		imageUrl() {
			if (!this.property) return '';
			return buildImageUrl(this.property.id, {
				overlay: this.overlay,
				parcel: this.parcelColor,
				building: this.buildingColor
			});
		},
		async load() {
			const data = await fetchPropertyById(this.$route.params.id);
			this.property = data;
		}
	}
};

</script>
