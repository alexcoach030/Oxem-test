Vue.component('mytable', {
    data(){
        return {
            loading: false,
            type: 32,
            change: this.$parent.change,
            start: 0,
            size: 10,
            step: 10,
            pages: Math.ceil(1000/10),
            pagesCounter: 1,
            filtered: [],
            position: 0,
            choosenElem: {},
            showChoosenElem: false,
            showAddLine: false,
            addId: '',
            addFirstName: '',
            addLastName: '',
            addEmail: '',
            addPhone: '',
            addButton: false,
            validationMessage:'',
            phone:'',
            target:'',
            sortUp: true,
        }
    },

    created() {
        this.loading = true;
        this.$parent.getJson(`${API}/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
            .then(data => {
                this.$parent.table = data;
                this.filtered = data;
                this.loading = false;
            })
    },

    computed: {
        render: function (){
            if (this.$parent.change){
                this.loading = true;
                this.filtered = [];
                this.$parent.getJson(`${API}/?rows=${this.type}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
                    .then(data => {
                        this.loading = true;
                        this.filtered = data;
                        this.$parent.table = data;
                        this.$parent.change = !this.$parent.change;
                        this.loading = false;
                        if (this.type === 1000) {
                            this.type = 32
                        }else this.type = 1000;
                    })
            }
            return this.filtered;
        },
    },

    methods: {
        rows: function(){
            this.$parent.change = !this.$parent.change;
            this.pages = Math.ceil(this.type/this.step);
            this.start = 0;
            this.size = this.step;
            this.pagesCounter = 1;
        },
        nextPage: function (){
            if (this.size < this.filtered.length){
                this.size = this.size + this.step;
                this.start = this.start + this.step;
                this.pagesCounter++;
            }else return;
        },
        prevPage: function (){
            if (this.start > 0){
                this.start = this.start - this.step;
                this.size = this.size - this.step;
                this.pagesCounter--;
            } else return;
        },
        filter(userSearch){
            if (userSearch === '') {
                this.pages = Math.ceil(this.$parent.table.length/this.step);
                return this.filtered = this.$parent.table;
            }
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.$parent.table.filter(el => {
                for (key in el) {
                    if (regexp.test(el[key])) return true;
                }
            })
            this.pages = Math.ceil(this.filtered.length/this.step);
            this.start = 0;
            this.size = this.step;
            this.pagesCounter = 1;
        },
        getInfo: function (event){
            let id = event.target.getAttribute('data-id');
            let oldId = this.choosenElem.id;
            console.log(id);
            this.choosenElem = this.filtered.find(item => item.id==id);
            if (oldId == this.choosenElem.id || this.showChoosenElem === false) {
                this.showChoosenElem = !this.showChoosenElem;
            }else this.choosenElem = this.filtered.find(item => item.id==id);
        },
        addLine:function (){
            return this.showAddLine = !this.showAddLine;
        },
        add: function(event){
            if (event.target.id === 'tel'){
                let x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                this.addPhone = `(${x[1]})${x[2]}-${x[3]}`;
            }
            if (this.addId ==0 || this.addFirstName ==0 || this.addLastName ==0 || this.addEmail ==0 || this.addPhone.length < 13){
                return this.addButton = false;
            }else return this.addButton = true;
        },
        addToTable: function (){
            let obj = {};
            let message = [];
            this.validationMessage = '';
            let nameReg = /^[a-zA-Z_ ]*$/;
            let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let validation = true;
            if (nameReg.test(this.addFirstName) === false || nameReg.test(this.addLastName) === false){
                message.push('Пожалуйста, введите только латинские буквы в поля firstName и lastName');
                validation = false;
            }
            if (emailReg.test(this.addEmail) === false){
                message.push('Введенный email не корректен');
                validation = false;
            }
            if (validation){
                obj.id = this.addId;
                obj.lastName = this.addLastName;
                obj.firstName = this.addFirstName;
                obj.email = this.addEmail;
                obj.phone = this.addPhone;
                this.$parent.table.unshift(obj);
                this.pages = Math.ceil(this.filtered.length/this.step);
            } else return this.validationMessage = message.join(', ');
        },
        sort: function (event){
            let name = event.target.getAttribute('data-name');
            let wrap = document.querySelector('.table__tags');
            let method;
            let getActive = function (){
                for (let i = 0;i<wrap.children.length;i++){
                    wrap.children[i].classList.remove('active');
                }
                if (method) event.target.classList.add('active');
            }
            if (name === this.target){
                this.sortUp = !this.sortUp;
                method = this.sortUp;
            }else{
                this.sortUp = true;
                method = true;
            }
            this.target = name;
            getActive();
            console.log(name);
            switch (name){
                case 'id':
                    if (method){
                        return this.filtered.sort((a,b) => a[name] - b[name]);
                    }else return this.filtered.sort((a,b) => b[name] - a[name]);
                case 'phone':
                    if (method){
                        return this.filtered.sort((a,b) => a.phone.replace(/[()-]/g, '') - b.phone.replace(/[()-]/g, ''));
                    }else return this.filtered.sort((a,b) => b.phone.replace(/[()-]/g, '') - a.phone.replace(/[()-]/g, ''));
                case 'firstName':
                    if (method){
                        return this.filtered.sort((a,b) => a.firstName.localeCompare(b.firstName));
                    } else return this.filtered.sort((a,b) => b.firstName.localeCompare(a.firstName));
                case 'lastName':
                    if (method){
                        return this.filtered.sort((a,b) => a.lastName.localeCompare(b.lastName));
                    } else return this.filtered.sort((a,b) => b.lastName.localeCompare(a.lastName));
                case 'email':
                    if (method){
                        return this.filtered.sort((a,b) => a.email.localeCompare(b.email));
                    } else return this.filtered.sort((a,b) => b.email.localeCompare(a.email));
            }
        },
    },
    template:`<div>
                <div class="table__settings">
                   <div><button v-on:click="rows()">Изменить размер данных</button></div>
                   <div><button v-on:click="addLine()">Добавить данные в таблицу</button></div>
                </div>
                <template v-if="showAddLine">
                    <table class="table table-sm table-bordered">
                        <thead class="thead-light">
                           <tr>
                                <th class="table__column">id</th>
                                <th class="table__column">firstName</th>
                                <th class="table__column">lastName</th>
                                <th class="table__column">email</th>
                                <th class="table__column">phone</th>
                            </tr> 
                        </thead>
                          <tbody>
                            <tr>
                                <th><input type="number" placeholder="for example, 111" v-model="addId" v-on:input="add($event)"></th>
                                <th><input type="text" v-model="addFirstName" v-on:input="add($event)"></th>
                                <th><input type="text" v-model="addLastName" v-on:input="add($event)"></th>
                                <th><input type="email" placeholder="alex@alex.com" v-model="addEmail" v-on:input="add($event)"></th>
                                <th><input type="text" id="tel" placeholder="(000)000-0000" value="this.addPhone" v-model="addPhone" v-on:input="add($event)"></th>
                            </tr>
                            <tr class="table__adding" v-if="addButton">
                                    <input type="button" value="Добавить в таблицу" v-on:click="addToTable()">
                                    <p v-if="this.validationMessage.length>0">{{validationMessage}}</p>    
                            </tr>
                        </tbody>
                    </table>
                </template>
                <table class="table table-sm table-bordered">
                    <thead class="thead-light">
                        <tr class="table__tags">
                            <th class="table__tag" data-name="id" v-on:click="sort($event)">id</th>
                            <th class="table__tag" data-name="firstName" v-on:click="sort($event)">firstName</th>
                            <th class="table__tag" data-name="lastName" v-on:click="sort($event)">lastName</th>
                            <th class="table__tag" data-name="email" v-on:click="sort($event)">email</th>
                            <th class="table__tag" data-name="phone" v-on:click="sort($event)">phone</th>
                        </tr>
                    </thead>
                    <div class="loading" v-if="loading"><img class="loading__logo" width="50" height="50" src="img/loading.svg"></div>
                    <template v-for="item in render.slice(this.start,this.size)">
                        <tbody>
                            <tr class="table__line" :data-id="item.id"  v-on:click="getInfo($event)">
                                <th :data-id="item.id">{{item.id}}</th>
                                <th :data-id="item.id">{{item.firstName}}</th>
                                <th :data-id="item.id">{{item.lastName}}</th>
                                <th :data-id="item.id">{{item.email}}</th>
                                <th :data-id="item.id">{{item.phone}}</th>
                            </tr>
                        </tbody>
                    </template>
                </table>
                <div class="pagination">
                    <div><button v-on:click="prevPage()">Предыдущая страница</button></div>
                    <p>Страница {{pagesCounter}} из {{pages}}</p>
                    <div><button v-on:click="nextPage()">Следующая страница</button></div>
                </div>
                <div class="description" v-if="showChoosenElem">
                    <p>Выбран пользователь <b>{{choosenElem.firstName}} {{choosenElem.lastName}}</b></p>
                    <p>Описание:</p>
                    <textarea>{{choosenElem.description}}</textarea>
                    <p>Адрес проживания: <b>{{choosenElem.address.streetAddress}}</b></p>
                    <p>Город: <b>{{choosenElem.address.city}}</b></p>
                    <p>Провинция/штат: <b>{{choosenElem.address.state}}</b></p>
                    <p>Индекс: <b>{{choosenElem.address.zip}}</b></p>
                </div>
             </div>
             `
});
