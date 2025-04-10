<template>
    <h3 class="text-center font-semibold text-primary ">Welcome to the about page</h3>
    <p class="text-xl text-center m-0">This page contains information about our organization and its mission.</p>
    
    <div class="mt-6 px-5 grid grid-cols-1 gap-6 md:grid-cols-4">
        <CustomCard 
        v-for="card in cardsInfo"
        :key="card.title"
        :title="card.title"
        :icon="card.icon"
        :subtitle="card.subtitle"
        :content="card.content"
        />
    </div>
    <div class="mt-10">
        <h3 class="text-center font-semibold text-primary mt-3">Our Team</h3>
        <p class="text-xl text-center m-0">Meet the team that makes it all possible.</p>
        <div class="mt-6 px-5 grid grid-cols-1 gap-6 md:grid-cols-4">
            <CustomCard 
            v-for="user in users"
            :key="user.id"
            :title="user.name"
            :subtitle="user.email"
            >
            <template #content>
                <div>
                    <div class="flex gap-3">
                        <div class="font-medium">Company</div>
                        <div class="text-gray-700">{{ user.company.name }}</div>
                    </div>
                    <div class="flex gap-3">
                        <div class="font-medium">Phone</div>
                        <div class="text-gray-700">{{ user.phone }}</div>
                    </div>
                    <div class="flex gap-3">
                        <div class="font-medium">Website</div>
                        <div class="text-gray-700">{{ user.website }}</div>
                    </div>
                </div>
            </template>
            </CustomCard>
        </div>
    </div>
</template>

<script setup>

const cardsInfo = [
    {
        icon: 'mdiAccount',
        title: 'Our Mission',
        subtitle: 'What we do',
        content: 'Our mission is to provide quality services to our customers and to make a positive impact on the community.'
    },
    {
        icon: 'mdiEye',
        title: 'Our Vision',
        subtitle: 'Where we are going',
        content: 'Our vision is to become the leading organization in our industry and to be recognized for our commitment to excellence.'
    },
    {
        icon: 'mdiHeart',
        title: 'Our Values',
        subtitle: 'What we believe in',
        content: 'Our values are integrity, respect, and teamwork. We believe in treating others with honesty and fairness.'
    },
    {
        icon: 'mdiAccountGroup',
        title: 'Our Team',
        subtitle: 'Who we are',
        content: 'Our team is made up of dedicated professionals who are passionate about their work and who are committed to serving our customers.'
    }
]


const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
    server: true
});

useSeoMeta({
    title: 'About us',
    description: 'Learn more about our organization and its mission.',
})


</script>