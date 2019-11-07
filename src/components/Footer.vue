<template>
    <div>
        <footer class="footer-bg">
            <div class="container py-2">
                <div class="row text-center">
                    <div class="col-md-3 col-6 py-2">
                        <router-link to="/petproduct" class="text-muted">購買商品</router-link>
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <router-link to="/coupon" class="text-muted">領取優惠</router-link>
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <router-link to="/coupon" class="text-muted">購物流程</router-link>
                    </div>
                    <div class="col-md-3 col-6 py-2 d-md-flex">
                        <router-link to="/Index" class="text-muted">聯絡我們</router-link>
                    </div>
                </div>
                <div class="row text-center py-3">
                    <div class="col-12">
                        <p>© Copright 2019  汪喵星球 Animal World</p>
                        <p>僅個人作品練習，無任何商業用途</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style>
.footer-bg{
    background:#fcd2bf;
    padding:5px 0;
    margin-top:20px;
}
</style>
