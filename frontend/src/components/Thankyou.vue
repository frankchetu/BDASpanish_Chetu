<template>
    <div>
        <h1 align="center">{{message}}</h1>
        <!-- <router-link to="/" >Register</router-link> -->
        <a href="http://localhost:8080/">Back To Home</a>
    </div>
</template>
<script>
export default {
    name: 'Thankyou',
    data () {
        return {
            message: 'Gracias por contactar con nosotras.'
        }
    },
}
</script>