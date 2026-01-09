<template>
	<div class="overflow-hidden border border-white/10 rounded-2xl bg-white/5 shadow-lg shadow-black/30">
		<table class="min-w-full text-left text-sm">
			<thead class="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
				<tr>
					<th class="px-4 py-3">ID</th>
					<th class="px-4 py-3">Longitude</th>
					<th class="px-4 py-3">Latitude</th>
					<th class="px-4 py-3">Image</th>
					<th class="px-4 py-3 text-right">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="property in items" :key="property.id"
					class="border-t border-white/5 hover:bg-white/5 transition"
					:class="{ 'bg-emerald-500/10': highlightIds?.has(property.id) }">
					<td class="px-4 py-3 font-mono text-xs">{{ property.id }}</td>
					<td class="px-4 py-3">{{ formatCoord(property.geocode_geo?.coordinates?.[0]) }}</td>
					<td class="px-4 py-3">{{ formatCoord(property.geocode_geo?.coordinates?.[1]) }}</td>
					<td class="px-4 py-3">
						<div v-if="property.image_url" class="w-32 h-20 bg-black/10 rounded-lg overflow-hidden">
							<img :src="property.src" alt="Property image" class="w-full h-full object-cover" />
						</div>
						<span v-else class="text-slate-500 text-xs">No image</span>
					</td>
					<td class="px-4 py-3 text-right">
						<RouterLink :to="`/property/${property.id}`"
							class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-slate-900 font-semibold text-xs hover:translate-y-[-1px] transition">
							Details
						</RouterLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>

export default {
	name: 'PropertyTable',
	components: {},
	props: {
		items: {
			type: Array,
			required: true
		},
		highlightIds: {
			type: Set,
			default: null
		}
	},
	methods: {
		formatCoord(value) {
			if (typeof value !== 'number') return '—';
			return value.toFixed(6);
		},
		image_url(property) {
			return property.image_url || '—';
		}
	},
};
</script>
