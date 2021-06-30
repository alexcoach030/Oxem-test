Vue.component('search', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `<div class="search">
                    <form action="#">
                    <input type="text" class="search__field" v-model="userSearch">
                    <button type="submit" class="search__button" v-on:click="$parent.$refs.mytable.filter(userSearch)">
                        Найти
                    </button>
                    </form>
                </div>`
})