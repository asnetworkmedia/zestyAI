<template>
	<div class="bg-white/5 border border-white/10 rounded-2xl p-4">
		<p class="text-sm font-semibold mb-3">Property data</p>
		<dl class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">ID</dt>
				<dd class="font-mono text-xs break-all">{{ property.id }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">Longitude</dt>
				<dd>{{ formatCoord(property.geocode_geo?.coordinates?.[0]) }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">Latitude</dt>
				<dd>{{ formatCoord(property.geocode_geo?.coordinates?.[1]) }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">Image URL</dt>
				<dd>
					<a :href="property.image_url" target="_blank" class="text-amber-300 hover:underline">Open source</a>
				</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">Image bounds</dt>
				<dd class="text-[13px]">{{ property.image_bounds?.join(', ') || '—' }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300">Parcel rings</dt>
				<dd>{{ ringCount(property.parcel_geo) }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300 mt-3">Building rings</dt>
				<dd>{{ ringCount(property.building_geo) }}</dd>
			</div>
			<div>
				<dt class="text-xs uppercase tracking-wide text-slate-300 mt-3">Google map📍</dt>
				<dd>
					<a
						:href="`http://www.google.com/maps/place/${formatCoord(property.geocode_geo?.coordinates?.[1])},${formatCoord(property.geocode_geo?.coordinates?.[0])}/@${formatCoord(property.geocode_geo?.coordinates?.[1])},${formatCoord(property.geocode_geo?.coordinates?.[0])},21z/data=!3m1!1e3`"
						target="_blank"
						class="text-amber-300 hover:underline"
					>
						Open in Google Maps
					</a>
				</dd>
			</div>
		</dl>
	</div>
</template>

<script>

export default {
	name: 'MetaTable',
	props: {
		property: {
			type: Object,
			required: true
		}
	},
	methods: {
		formatCoord(value) {
			if (typeof value !== 'number') return '—';
			return value.toFixed(6);
		},
		ringCount(geometry) {
			return geometry?.coordinates?.length || 0;
		}
	}
};
</script>
