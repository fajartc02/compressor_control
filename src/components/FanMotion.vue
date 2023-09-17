<template>
    <div>
        <v-img v-if="!is_run" src="@/assets/fanmotion.gif"></v-img>
        <v-img v-else src="@/assets/fanStop.png"></v-img>
    </div>
</template>

<script>
export default {
    name: 'FanAnimation',
    props: {
        is_run: Boolean
    }
}
</script>

<style>

</style>