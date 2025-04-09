<template>
    <q-card class=" bg-gray-100 rounded-md" flat>
        <q-card-section>
            <slot name="header">
                <div class="flex items-center gap-3">
                    <div v-show="icon" class="rounded-sm bg-primary text-white p-3 h-fit">
                        <MdiIcon :icon="icon" />
                    </div>
                    <div v-show="title || subtitle" >
                        <div v-show="title" class="font-medium text-xl">{{ title }}</div>
                        <p v-show="subtitle" class="text-gray-500">{{ subtitle }}</p>
                    </div>
                </div>
            </slot>
        </q-card-section>
        <q-card-section>
            <slot name="content">
                <div>
                    <p>{{ content }}</p>
                </div>
            </slot>
        </q-card-section>
    </q-card>
</template>
<script setup>

const props = defineProps({
    title: String,
    icon: String,
    subtitle: String,
    content: String
})
</script>