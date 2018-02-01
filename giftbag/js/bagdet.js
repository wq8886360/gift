var vm = new Vue({
	data:function (){
		return {				
			msg:{},
		}
	},
	methods: {
	    api_bagdet:function(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=giftDetail&pin=11009'
	    	axios.get(url,{params:{gift_id:this.baglist_id}}).then(res=>{
	    		this.msg = res.data.msg
	    		console.log(this.msg)
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
	    buy:function(){
	    	window.location.href = '../html/affirm.html?' + '&pin=' + this.baglist_id
	    }
	  },
	  created:function(){
	  	this.baglist_id = this.getQueryString("pin")
	  	this.api_bagdet()
	  	
	  	
	  	// console.log(this.baglist_id)
	  }
})
vm.$mount('#bagdet')