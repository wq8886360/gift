var vm = new Vue({
	data:function (){
		return {				
			page:1,//当前页
			count:20,//每页条数
			msg:{},
		}
	},
	methods: {
	    api_bagli:function(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=giftList&pin=11009'
	    	axios.get(url,{params:{page:this.page,count:20}}).then(res=>{
	    		this.msg = res.data.msg
	    		this.page = this.msg.page
	    		this.count = this.msg.count
	    		if(res.data.status == 2){ 
	    			window.location.href = '../html/mtshop.html'
	    		}
	    		// console.log(this.msg) 
	    	})
	    },
	    baglist:function(id){
	    	window.location.href = '../html/bagdet.html?' + '&id=' + id 
	    }
	  },
	  created(){
	  	this.api_bagli()
	  }
})
vm.$mount('#baglist')