<template>
    <div class="container my-6">
        <div class="row">
            <div class="col-4 text-center pet-ad">
                <router-link class="text-dark" to="/petproduct">
                    <img src="https://i.imgur.com/Qtyxjhj.png" width="90%">
                </router-link>
            </div>
            <div class="col-4 text-center pet-ad">
                <router-link class="text-dark" to="/petproduct">
                    <img src="https://i.imgur.com/OThXDgC.png" width="90%">
                </router-link>
            </div>
            <div class="col-4 text-center pet-ad">
                <router-link class="text-dark" to="/petproduct">
                    <img src="https://i.imgur.com/WdjweEs.png" width="90%">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}

</script>

<style lang="scss">
.pet-ad{
    overflow:hidden;
    transform:scale(1,1);
    transition: all 1s ease-out;
}
.pet-ad :hover{
    transform:scale(1.1,1.1);
    opacity:0.9;
}
a:hover{
    text-decoration:none;
}
</style>
