var vm = new Vue({
	data:function (){
		return {				
			coin:null,
			bao_state:null,
			username:null,
			alipay_id:null,
			sendMsgDisabled:false,
			time:60,
			mobel:null,
			isState:false,
			code_tel:null,
		}
	},
	watch:{
		'code_tel':{
			handler:function(){
				if(this.code_tel.length==4){
					console.log(1)
					let url = 'http://www.pluss.com/mobile.php?act=plus&op=withdraw&pin=11009';
					axios.get(url,{params:{is_widthdraw:1,alipay_id:this.alipay_id,amount_apply:1,mobile:this.mobel,mobile_code:this.code_tel}}).then((res)=>{
						if(res.data.status==1){
							this.isState=false;
							this.$toast({
	    						message:'提现成功',
	    						duration:3000,
	    					})
	    					this.withdrawal();
						}
						if(res.data.status == 2){ 
							window.location.href = '../html/mtshop.html'
						}
					})
				}
			}
		}
	},
	methods: {
		withdrawal:function(){
			let url = 'http://www.pluss.com/mobile.php?act=plus&op=withdraw&pin=11009';
			axios.get(url,{params:{is_widthdraw:0}}).then((res)=>{
				console.log(res)
				this.coin=res.data.msg.profit;
				this.bao_state=res.data.msg.is_alipay;
				this.username=res.data.msg.alipayList.username;
				this.alipay_id=res.data.msg.alipayList.id;
				this.mobel=res.data.msg.alipayList.mobile;
			})
		},
		down:function(){
			if(this.alipay_id==null){
				this.$toast({
	    			message:'请输入您的支付宝账号',
	    			duration:3000,
	    		})
			}else{
				this.isState=true;
				this.code_tel='';
			}
		},
		jump(){
			if(this.bao_state==1){
				return false;
			}else{
				location.href='../html/addctwo.html';
			
			}
		},
		/*短信验证码api*/
	    Verification(){
	    	let url = 'http://www.pluss.com/mobile.php?act=get_mobile_code&pin=11009';
	    		axios.get(url,{params:{mobile:this.mobel}}).then(res=>{
	    			console.log(res)
	    			if(res.data.status==1){
	    				this.send();
	    			}
	    			else{
	    				this.$toast({
	    				message:res.data.msg,
	    				duration:3000,
	    				})
	    			}
	    		})
	    
	    },
	     /*验证码倒计时*/
	    send() {
    		let me = this;
  			me.sendMsgDisabled = true;
  		 	let interval = window.setInterval(function() {
  		  	if ((me.time--) <= 0) {
  		   		me.time = 60;
  		   		me.sendMsgDisabled = false;
  		  		 window.clearInterval(interval);
  		  	}
  		 	}, 1000);
  		},
	},
	created(){
		this.withdrawal();
	}
})
vm.$mount('#addcard')