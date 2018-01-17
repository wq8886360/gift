var vm = new Vue({
	data:function(){
		return {
			data:{},
			list:[],
			loadBottom:true,   //数据
			
		}


	},
	methods:{
		detail:function(){
			let url = 'http://www.plus.com/index.php?m=Api&c=Plus&a=withdrawList'
			// let url = 'https://api-test.shunliandongli.com/v1/Discover/discoverList.json'
			axios.get(url).then(res =>{
				this.data = res.data
				this.list = this.data.item
				console.log(this.list)
  
				console.log(res)   
				
			})

		},
		loadBottom() {
		  //... 加载更多数据 
		  this.list = true;// 若数据已全部获取完毕
		  this.$refs.loadmore.onBottomLoaded();
		}

 
	},
	created:function(){
		this.detail();
		// this.loadMore()
	}

})
vm.$mount("#detail")