var vm = new Vue({
	data:function (){
		return {				
			msg:[],
			active:'',//样式
			hin : 0,//点击退货退款状态
			qrts:0,//确认退货退款
			tkmsg:'',//确认后的提示
			qrshts:'',//确认收货的提示
			qrzhts:0,//点击确认收货的状态
			cnmm:0,
		}
	},
	methods: {
	    api_ddlist:function(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderList&pin=11009'
	    	axios.get(url).then(res=>{
	    		this.msg = res.data.msg
	    		if(res.data.status == 2){ 
	    			window.location.href = '../html/mtshop.html'
	    		}
	    		// console.log(res) 
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
	    skipaff:function(ordersn){
	    	window.location.href = '../html/listxq.html?' + '&ordersn=' + ordersn
	    },
	    tkth:function(){ 
	    	this.hin = 1
	    	
	    },
	    qrsh:function(ordersn){
	    	this.qrzhts = 1

	    },
	    wuliu:function(delivery){	    	
	    	window.location.href = delivery
	    },
	    qesh:function(ordersn){  	
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderReturn&pin=11009'
	    	axios.get(url,{params:{ordersn:ordersn}}).then(res=>{
	    		this.tkmsg = res.data.msg
	    		console.log(res)
	    		console.log(this.tkmsg)
	    	})
	    	this.hin = 0
	    	this.qrts = 1
	    },
	    gbqrsh:function(ordersn){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderFinish&pin=11009'
	    	axios.get(url,{params:{ordersn:ordersn}}).then(res=>{
	    		this.qrshts = res.data.msg
	    		console.log(res)
	    		// console.log(ordersn)
	    	})	
	    	this.qrzhts = 0
	    	this.cnmm = 1
	    }
	   
	  },
	  created:function(){
	  	this.api_ddlist() 
	  }
})
vm.$mount('#ddlist')