var vm = new Vue({
	data:function (){
		return {				
			msg:[],
			active:'',//样式
		}
	},
	methods: {
	    api_ddlist:function(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderList&pin=11009'
	    	axios.get(url).then(res=>{
	    		this.msg = res.data.msg
	    		console.log(res) 
	    	}) 
	    },
	    titlezt:function(index){
	    	this.active = index
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderList&pin=11009'
	    	axios.get(url,{params:{status:index}}).then(respon=>{
	    		this.msg = respon.data.msg
	    		console.log(respon) 
	    		// console.log(index)
	    	}) 
	    },
	    tkth:function(ordersn){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderReturn&pin=11009'
	    	axios.get(url,{params:{ordersn:ordersn}}).then(res=>{
	    		console.log(res)
	    		// console.log(ordersn)
	    	})
	    	
	    },
	    qrsh:function(ordersn){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderFinish&pin=11009'
	    	axios.get(url,{params:{ordersn:ordersn}}).then(res=>{
	    		console.log(res)
	    		// console.log(ordersn)
	    	})	
	    },
	    wuliu:function(){
	    	window.location.href = '../html/logmessage.html'
	    }	
	   
	  },
	  created:function(){
	  	this.api_ddlist() 
	  }
})
vm.$mount('#ddlist')