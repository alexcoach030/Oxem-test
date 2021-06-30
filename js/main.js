const API = 'http://www.filltext.com';

let app = new Vue({
    el: "#app",
    data: {
        error: false,
        change: false,
        table: [],
    },

    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.error = true)
        },
    },
});
