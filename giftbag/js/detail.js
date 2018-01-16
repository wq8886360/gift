var vm = new Vue({
	data:function(){
		return {
			data:{},
			item:[]
		}


	},
	methods:{
		detail:function(){
			let url = 'http://www.plus.com/index.php?m=Api&c=Plus&a=withdrawList'
			// let url = 'https://api-test.shunliandongli.com/v1/Discover/discoverList.json'
			axios.get(url).then(res =>{
				this.data = res.data
				this.items = this.data.item
				console.log(res) 
				console.log(this.data)
			})

		}


	},
	created:function(){
		this.detail()
	}

})
vm.$mount("#detail")