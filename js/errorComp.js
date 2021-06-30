Vue.component('error', {
    data(){
        return {
            isVisible: false,
            text: '',
        }
    },
    computed: {
        error(){
            this.isVisible = this.$parent.error;
            return this.text = 'Cервер не доступен';
        },
    },
    template: `
    <div class="error-block" v-if="isVisible">
        <p class="error-msg">{{ text }}</p>
    </div>
    `
})