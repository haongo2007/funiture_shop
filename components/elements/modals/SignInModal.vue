<template>
    <div class="modal-body m-3">
        <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">
                <i class="icon-close"></i>
            </span>
        </button>
        <form-login/>
    </div>
</template>
<script>
import FormLogin from '~/components/elements/FormLogin';
export default {
    components: {
        FormLogin
    },
    data: function() {
        return {};
    },
    created(){
      this.$root.$on('close', () => {
        this.$emit('close');
      })
    },
    methods:{}
};
</script>
