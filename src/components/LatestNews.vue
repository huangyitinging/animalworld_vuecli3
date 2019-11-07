<template>
    <div>
        <div class="container my-7">
            <h2 class="text-center text-primary">
                <i class="fas fa-paw"></i>
                    最新商品
                <i class="fas fa-paw"></i>
            </h2>
            <b-card-group>
                <div class="row my-5">
                    <div class="col-md-3">
                        <a href="#">
                            <b-card-group deck class="d-inline-block h-100 pic">
                                <b-card img-src="https://i.imgur.com/cVG4WLV.png" img-alt="Card image" class="h-100">
                                </b-card>
                            </b-card-group>
                            <div class="quot">NO.3</div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="#">
                            <b-card-group deck class="d-inline-block h-100 pic">
                                <b-card img-src="https://i.imgur.com/l3OVjL5.png" img-alt="Card image">
                                </b-card>
                            </b-card-group>
                            <div class="quot">NO.3</div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="#">
                            <b-card-group deck class="d-inline-block h-100 pic">
                                <b-card img-src="https://i.imgur.com/qmJrYSN.png" img-alt="Card image">
                                </b-card>
                            </b-card-group>
                            <div class="quot">NO.3</div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="#">
                            <b-card-group deck class="d-inline-block h-100 pic">
                                <b-card img-src="https://i.imgur.com/6TXKq5K.png" img-alt="Card image">
                                </b-card>
                            </b-card-group>
                            <div class="quot">NO.3</div>
                        </a>
                    </div>
                </div>
            </b-card-group>
        </div>
    </div>
</template>

<style lang="scss">
.pic{
    position:relative;
}
.pic:hover:after{
    opacity:1;
}
.pic:after{
    content: '';
    position: absolute;
    bottom: 50%;
    left: 50%;
    color: #fff;
    width: 60px;
    height: 60px;
    padding-top: 30px;
    margin-left: -30px;
    background: url(https://i.imgur.com/mwL65p0.png) no-repeat center;
    background-size:60px;
    border-radius: 100%;
    display: block;
    z-index: 9;
    transition: all .5s ease;
    -o-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -webkit-transition: all .5s ease;
    opacity: 0;
    font-size: 0.8rem;
}
.hover-ontop{
    position: absolute;
    opacity: 0;
    transition: all 200ms ease-in-out;
    top: 0px;
    left:0px;
}
.hover-ontop:hover{
    opacity: 1;
}
.quot{
    background-color: #ffcccc;
    color: #fff;
    position: absolute;
    top:0;
    left: 5px;
    letter-spacing: 5px;
    padding:5px;
    opacity:0;
}
.quot:hover{
    opacity:1;
}
</style>
