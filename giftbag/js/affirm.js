var vm = new Vue({
	data:function (){
		return {				
			msg:{},
			index:0,//是否添加地址
			panduan:0,//判断是否添加地址
			adress:'',//收货地址

		}
	},
	methods: {
	     api_affirm:function(){
	     	let url = 'http://www.pluss.com/mobile.php?act=plus&op=giftDetail&pin=11009'
	     	axios.get(url,{params:{gift_id:this.baglist_id}}).then(res=>{
	     		this.msg = res.data.msg
	     		if(res.data.status == 2){ 
	     			window.location.href = '../html/mtshop.html'
	     		}
	     		// console.log(this.msg)
	     	})
	     },
	    getQueryString:function (name) { 
	       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	       var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	       var context = ""; 
	       if (r != null) 
	          context = r[2]; 
	       reg = null; 
	       r = null; 
	       return context == null || context == "" || context == "undefined" ? "" : context; 
	     },
	     dizhi:function(){
	     	window.location.href = '../html/goodssite.html?'+'&id=' + this.baglist_id
	     },
	     localSt:function(){
	     	this.nameo = localStorage.getItem('name')
	     	this.number = localStorage.getItem('number')
	     	this.city1 = localStorage.getItem('city1')
	     	this.city2 = localStorage.getItem('city2')
	     	this.city3 = localStorage.getItem('city3')
	     	this.city1id = localStorage.getItem('city1id')
	     	this.city2id = localStorage.getItem('city2id')
	     	this.city3id = localStorage.getItem('city3id')
	     	this.adress = localStorage.getItem('adress')
	     	this.panduan = parseInt(localStorage.getItem('panduan'))
	     	console.log(this.nameo,this.number,this.city1,
	     				this.city2,this.city3,this.city1id,
	     				this.city2id,this.city3id,this.adress
	     		)
	     	console.log(this.panduan)
	     },  	
	     canren:function(){
	     	if(this.panduan == 6){
	     		let url = 'http://www.pluss.com/mobile.php?act=plus&op=giftOrder&pin=11009'
	     		axios.get(url,{params:{name:this.nameo,mobile:this.number,province:this.city1id,city:this.city2id,area:this.city3id,province_name:this.city1,city_name:this.city2,area_name:this.city3,dateil_area:this.adress,gift_id:this.baglist_id}}).then(res=>{
	     			console.log(res)
	     			this.status = res.data.status
	     			this.dzlj = res.data.msg	     			
	     		})
	     	}
	     },
	     queren:function(){
	     	if(this.panduan == 6){
	     		if(this.status == 1){
	     			window.location.href = this.dzlj
	     		}else{
	     			// alert(this.dzlj)
					this.$toast({
	    				message:this.dzlj,
	    				duration:3000,
	    			})
	     		}
	     	}else{
	     		// alert('请添加收货地址')
					this.$toast({
	    				message:'请添加收货地址',
	    				duration:3000,
	    			})
	     	}
	     },
	  },
	  created:function(){
	  	this.baglist_id = this.getQueryString("id")
	  	this.api_affirm()
	  	this.localSt()
	  	this.canren()
	  }
})
vm.$mount('#affirm')