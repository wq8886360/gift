var vm = new Vue({
	data:function (){
		return {				
			msg:{},
		}
	},
	methods: {
	     api_affirm:function(){
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
	  },
	  created:function(){
	  	this.baglist_id = this.getQueryString("pin")
	  	this.api_affirm()
	  }
})
vm.$mount('#affirm')