<template>
    <div class="product-details-tab">
        <tabs class="nav-pills justify-content-center" :data="tabsData"></tabs>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tab1">
                <div class="product-desc-content" v-html="descriptions.description">
                    
                </div>
            </div>

            <div class="tab-pane fade" id="tab2">
                <div class="product-desc-content" v-html="descriptions.content">
                </div>
            </div>

            <div class="tab-pane fade" id="tab3">
                <div class="product-desc-content">
                    <h3>Delivery & returns</h3>
                    <p>
                        We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our
                        <a
                            href="#"
                        >Delivery information</a>
                        <br />We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our
                        <a
                            href="#"
                        >Returns information</a>
                    </p>
                </div>
            </div>

            <div class="tab-pane fade" id="tab4">
                <div class="reviews">
                    <h3>Reviews (2)</h3>
                    <div class="review">
                        <div class="row no-gutters">
                            <div class="col-auto">
                                <h4>
                                    <a href="#">Samanta J.</a>
                                </h4>
                                <div class="ratings-container">
                                    <div class="ratings">
                                        <div class="ratings-val" style="width: 80%;"></div>
                                        <span class="tooltip-text">4</span>
                                    </div>
                                </div>

                                <span class="review-date">6 days ago</span>
                            </div>

                            <div class="col">
                                <h4>Good, perfect size</h4>

                                <div class="review-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                </div>

                                <div class="review-action">
                                    <a href="#">
                                        <i class="icon-thumbs-up"></i>Helpful (2)
                                    </a>
                                    <a href="#">
                                        <i class="icon-thumbs-down"></i>Unhelpful (0)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="review border-0">
                        <div class="row no-gutters">
                            <div class="col-auto">
                                <h4>
                                    <a href="#">John Doe</a>
                                </h4>
                                <div class="ratings-container">
                                    <div class="ratings">
                                        <div class="ratings-val" style="width: 100%;"></div>
                                        <span class="tooltip-text">5</span>
                                    </div>
                                </div>

                                <span class="review-date">5 days ago</span>
                            </div>

                            <div class="col">
                                <h4>Very good</h4>

                                <div class="review-content">
                                    <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                </div>

                                <div class="review-action">
                                    <a href="#">
                                        <i class="icon-thumbs-up"></i>Helpful (0)
                                    </a>
                                    <a href="#">
                                        <i class="icon-thumbs-down"></i>Unhelpful (0)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabs from '~/components/elements/Tabs';
export default {
    components: {
        Tabs
    },
    props: {
        descriptions: {
            type: Object,
            default:{}
        }
    },
    data: function() {
        return {
            tabsData: [
                {
                    id: 'tab1',
                    title: 'Description',
                    active: true
                },
                {
                    id: 'tab2',
                    title: 'Additional Information'
                },
                {
                    id: 'tab3',
                    title: 'Shipping & Returns'
                },
                {
                    id: 'tab4',
                    title: 'Reviews(2)'
                }
            ]
        };
    }
};
</script>