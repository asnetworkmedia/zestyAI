<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script>
import Tiff from 'tiff.js';

export default {
    name: 'Tiff',
    props: {
        src: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        }
    },
    mounted() {
        fetch(this.src)
        .then(r => r.arrayBuffer())
        .then(buffer => {
            const tiff = new Tiff({ buffer });
            const canvas = tiff.toCanvas();
            this.$refs.canvas.replaceWith(canvas);
        });
    }
};
</script>
