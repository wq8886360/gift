var vm = new Vue({
	data:function (){
		return {				
			msg_data:null,
			shou_state:false,
			sure_state:false,
			mask_state:false,
			status:null,
			ordersn_new:null,
			ordersn:null,
		}
	},
	methods: {
		/*订单详情api*/
	    orderDetail(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=orderDetail&pin=11009';
	    	axios.get(url,{params:{ordersn:this.ordersn}}).then(res =>{
	    		console.log(res)
				if(res.data.status==1){
					this.msg_data=res.data.msg;
					this.status=res.data.msg.status;
					this.ordersn_new=res.data.msg.ordersn;
				}
				if(res.data.status == 2){ 
					window.location.href = '../html/mtshop.html'
				}
			})
	    },
	    /*退货退款api*/
	    sure_sure(){
	    	let url ='http://www.pluss.com/mobile.php?act=plus&op=orderReturn&pin=11009';
	    	axios.get(url,{params:{ordersn:this.ordersn}}).then(res =>{
				if(res.data.status==1){
					this.sure_state=false;
					this.mask_state=false;

					this.orderDetail();
					this.$toast({
	    				message:'退换,退款成功',
	    				duration:3000,
	    			})
				}else{
					this.sure_state=false;
					this.mask_state=false;
					this.$toast({
	    				message:'您已经申请退还，退款过了',
	    				duration:3000,
	    			})
				}
			})
	    },
	    /*确认收货api*/
	    sure_que(){
	    	let url ='http://www.pluss.com/mobile.php?act=plus&op=orderFinish&pin=11009';
	    	axios.get(url,{params:{ordersn:this.ordersn}}).then(res =>{
	    		console.log(res)
				if(res.data.status==1){
					this.shou_state=false;
					this.mask_state=false;

					this.orderDetail();
					this.$toast({
	    				message:'确认收货成功',
	    				duration:3000,
	    			})
				}else{
					this.shou_state=false;
					this.mask_state=false;

					this.$toast({
	    				message:'您已经确认收货过了',
	    				duration:3000,
	    			})
				}
			})
	    },
	    /*跳转到物流信息*/
	    loglist(){
	    	location.href='../html/logmessage.html?ordersn='+this.ordersn_new;
	    }
	  },
	  created(){
	  	this.orderDetail();
	  	function GetQueryString(name){
	    	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    	var r = window.location.search.substr(1).match(reg);
	    	if(r!=null)return  unescape(r[2]); return null; 
	    	
	    }
	    this.ordersn=GetQueryString('ordersn');
	  }
	})
vm.$mount('#listxq')