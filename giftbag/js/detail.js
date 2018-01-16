var vm = new Vue({
	data:function(){
		return {


		}


	},
	methods:{
		detail:function(){
			// let url = 'https://api-test.shunliandongli.com/v1/Discover/discoverList.json?pin=11009'
			let url = 'https://api-test.shunliandongli.com/v1/Discover/discoverList.json'
			axios.get(url).then(res =>{
				console.log(res) 


			})

		}


	},
	created:function(){
		this.detail()
	}

})
vm.$mount("#detail")