var vm = new Vue({
	data:function (){
		return {				
			username:'',
			account:null,
			mobel:null,
			yzm:null,
			time: 60, // 发送验证码倒计时
    		sendMsgDisabled: false,
    		username_state:false,
    		account_state:false,
    		mobel_state:false,
    		yzm_state:false,
    		color_red:false,
		}
	},
	watch:{
		'username':{
			handler:function(){
				if(this.username.length>0){
					this.username_state=true;
				}else{
					this.username_state=false;
					
				}
			}
		},
		'account':{
			handler:function(){
				if(this.account.length>0){
					this.account_state=true;
					console.log(11111111)
				}
				else{
					this.account_state=false;
					
				}
			}
		},
		'mobel':{
			handler:function(){
				if(this.mobel.length==11 && /^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobel)){
					this.mobel_state=true;
				}else if(this.mobel.length<11){
					this.color_red=false;
				}else{
					this.mobel_state=false;
				}
			}
		},
		'yzm':{
			handler:function(){
				if(this.yzm.length==4){
					this.yzm_state=true;
				}else{
					this.yzm_state=false;	
				}
			}
		}
	},
	methods: {
	    success:function(){
	    	if(this.username && this.account_state && this.mobel_state && this.yzm_state){
	    		let url = 'http://www.pluss.com/mobile.php?act=plus&op=addAlipay&pin=11009';
	    		axios.get(url,{params:{name:this.username,username:this.account,mobile:this.mobel,mobile_code:this.yzm}}).then((res)=>{
	    			if(res.data.status==1){
	    				location.href="../html/addcard.html";
	    			}
	    			if(res.data.status == 2){ 
	    				window.location.href = '../html/mtshop.html'
	    			}
	    		})
	    	}else if(this.username==false){
	    		this.$toast({
	    			message:'请您输入姓名',
	    			duration:3000,
	    		})
	    	}else if(this.account_state==false){
	    		this.$toast({
	    			message:'请您输入支付宝号码',
	    			duration:3000,
	    		})
	    	}else if(this.mobel_state==false){
	    		this.$toast({
	    			message:'请您输入手机号',
	    			duration:3000,
	    		})
	    	}else if(this.yzm_state==false){
	    		this.$toast({
	    			message:'请您输入手机短信验证码',
	    			duration:3000,
	    		})
	    	}
	    },
	    /*短信验证码api*/
	    Verification(){
	    	
	    	if(this.mobel==null){
	    		let url = 'http://www.pluss.com/mobile.php?act=get_mobile_code&pin=11009';
	    			axios.get(url,{params:{mobile:this.mobel}}).then(res=>{
	    				console.log(res)
	    				if(res.data.status==1){
	    					this.send();
	    				}
	    				else{
	    					this.color_red=true;
	    					this.$toast({
	    					message:res.data.msg,
	    					duration:3000,
	    					})
	    				}
	    			})
	    	}else{
	    		if(this.mobel.length<11){
	    			
	    			this.$toast({
	    				message:'请输入正确的手机号码',
	    				duration:3000,
	    			})
	    		}else{
	    			let url = 'http://www.pluss.com/mobile.php?act=get_mobile_code&pin=11009';
	    			axios.get(url,{params:{mobile:this.mobel}}).then(res=>{
	    				console.log(res)
	    				if(res.data.status==1){
	    					this.send();
	    				}
	    				else{
	    					this.color_red=true;
	    					this.$toast({
	    						message:res.data.msg,
	    						duration:3000,
	    					})
	    				}
	    			})
	    		}
	    	}
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
  		}
	}
})
vm.$mount('#addctwo')