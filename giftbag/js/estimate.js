var vm = new Vue({
	data:function(){
		return {			
			list:[],
			loadBottom:true,   //数据
			allLoaded:false,
			page:1,
			count:20,
			allLoaded: false
		}


	},
	methods:{
		detail:function(page){
			let url = 'http://www.pluss.com/mobile.php?act=plus&op=proList&pin=11009'
			axios.get(url,{params:{page:this.page,count:this.count}}).then(res =>{
				this.list = res.data.msg.item   
				this.$refs.loadmore.onTopLoaded();
				if(res.data.status == 2){ 
					window.location.href = '../html/mtshop.html'
				}
			})

		},
		loadTop(){
			this.detail(1)
		},
		loadBottom(){
			this.page++;
			axios.get(url,{params:{page:this.page,count:10}}).then(res =>{
				let list = res.data.data.msg.item;
				var _this = this;
				list.forEach(function(item) {
					_this.list.push(item);
				})
				if(this.list.length>= res.data.data.msg.itemCount){
					this.allLoaded = true;
				}
				this.$refs.loadmore.onBottomLoaded();
			})
		}
		
	},
	created:function(){
		this.detail(1);
		

	}

})
vm.$mount("#estimate")