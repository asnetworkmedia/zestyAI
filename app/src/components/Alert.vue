<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-gray-900 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <!-- Header -->
            <div :class="['px-6 py-4 border-b', headerClasses]">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
            </div>
            
            <!-- Content -->
            <div class="px-6 py-4">
                <p class="text-sm text-gray-300">{{ message }}</p>
            </div>
            
            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-700 flex justify-end">
                <button
                    @click="close"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        type: {
            type: String,
            default: 'info' // 'info', 'warning', 'error', 'success'
        },
        message: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: 'Alert'
        }
    },
    data() {
        return {
            isOpen: true
        };
    },
    computed: {
        headerClasses() {
            switch (this.type) {
                case 'warning':
                    return 'bg-yellow-500/10 border-yellow-400/30 text-yellow-300';
                case 'error':
                    return 'bg-red-500/10 border-red-400/30 text-red-300';
                case 'success':
                    return 'bg-green-500/10 border-green-400/30 text-green-300';
                case 'info':
                default:
                    return 'bg-blue-500/10 border-blue-400/30 text-blue-300';
            }
        }
    },
    methods: {
        close() {
            this.isOpen = false;
            this.$emit('close');
        }
    }
};
</script>