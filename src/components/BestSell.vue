<template>
    <div>
        <div class="text-center">
            <div class="h2 text-primary">
                <i class="fas fa-paw"></i>
                銷售排行榜
                <i class="fas fa-paw"></i>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <div>
                    <img src="https://i.imgur.com/0r6klYV.png" alt="" width="110em">
                </div>
                <div style="position:relative">
                    <div class="dialog1"></div>
                    <div class="dialog2"></div>
                </div>
                <div class="d-flex align-items-center ml-4">
                    汪喵星球本年度銷售 TOP 3
                    <br>
                    讓你跟你的主子一起跟上流行
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row d-flex justify-content-center mt-4">
                <div class="col-9">
                    <div class="row d-flex justify-content-center my-3">
                        <div class="col-md-6 d-flex justify-content-center align-items-center" style="">
                            <div style="background:#ffcccc;" class="product-circle">
                                <img src="https://i.imgur.com/lY7pM1N.png" alt="" width="400rem" style="position: absolute; top:20%; right:1%">
                            </div>
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center mt-3">
                            <div class="h1">01</div>
                            <div class="h6">喵罐罐<i class="fas fa-crown text-warning ml-2"></i></div>
                            <div class="h4">喵星人專用罐頭</div>
                            <div>
                                <img src="https://i.imgur.com/WLRw3hT.png" alt="" width="30em">
                                    +
                                <img src="https://i.imgur.com/UvMiip0.png" alt="" width="20em">
                            </div>
                            <div class="text-danger">已有 9999 人購買</div>
                            <div>
                                <router-link to="/petproduct" class="btn btn-outline-primary text-primary px-5 mt-2">查看更多</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row flex-row-reverse justify-content-center my-5">
                        <div class="col-md-6 d-flex justify-content-center align-items-center" style="">
                            <div style="background:#f8d56b;" class="product-circle">
                                <img src="https://i.imgur.com/nDQKCnX.png" alt="" width="320rem" style="position: absolute; top:8%; left:8%">
                            </div>
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center mt-3">
                            <div class="h1">02</div>
                            <div class="h6">汪罐罐<i class="fas fa-medal text-lemon ml-2"></i></div>
                            <div class="h4">有零嘴就給讚</div>
                            <div>
                                <img src="https://i.imgur.com/OhA8FIC.png" alt="" width="20em">
                                +
                                <img src="https://i.imgur.com/cIZ7DE1.png" alt="" width="20em">
                            </div>
                            <div class="text-danger">已有 9998 人購買</div>
                            <div>
                                <router-link to="/petproduct" class="btn btn-outline-warning text-warning px-5 mt-2">查看更多</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center my-5">
                        <div class="col-md-6 d-flex justify-content-center align-items-center" style="">
                            <div style="background:#a6d5f5;" class="product-circle">
                                <img src="https://i.imgur.com/uuogtuq.png" alt="" width="330rem" style="position: absolute; top:10%; left:-30px">
                            </div>
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center mt-3">
                            <div class="h1">03</div>
                            <div class="h6">汪罐罐<i class="fas fa-award text-info ml-2"></i></div>
                            <div class="h4">汪汪也要吃菜菜</div>
                            <div>
                                <img src="https://i.imgur.com/EInanMQ.png" alt="" width="20em">
                                +
                                <img src="https://i.imgur.com/8SNfnn9.png" alt="" width="25em">
                                +
                                <img src="https://i.imgur.com/OhA8FIC.png" alt="" width="20em">
                            </div>
                            <div class="text-danger">已有 9997 人購買</div>
                            <div>
                                <router-link to="/petproduct" class="btn btn-outline-info text-info px-5 mt-2">查看更多</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center align-items-center">
                        <img src="https://i.imgur.com/MaTKjdA.png" alt="" width="200em">
                        <div>該買些罐罐給本喵了吧</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.bestselldog{
    background-image: url(https://i.imgur.com/0r6klYV.png);
    padding: 5em;
    background-repeat: no-repeat;
}
.dialog1{
    width: 50px;
    height: 3px;
    background: #e0dbdb;
    transform: rotate(-35deg);
    position: absolute;
    top:30px;
}
.dialog2{
    width: 50px;
    height: 3px;
    background: #e0dbdb;
    transform: rotate(35deg);
    position: absolute;
    bottom:30px;
}
.product-circle{
    border-radius: 50%;
    width: 280px;
    height: 280px;
    position:relative;
}
.borderhr0{
    border-bottom:1px dashed #ffcccc;
    padding: 10px
}
.catcatch{
    background-image: url(https://i.imgur.com/MaTKjdA.png);
    padding: 5em;
}
</style>
