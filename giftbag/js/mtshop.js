var vm = new Vue({
	data:function (){
		return {				
			mobile:null,
			mobile_code:null,
			code:null,
			mobile_model:null,
			img_photo:null,
			time: 60, // 发送验证码倒计时
    		sendMsgDisabled: false,
    		yzm_num:'',
    		dx_yzm:'',
    		btn_state:false,
    		color_bule:false,
    		color_red:false,
    		first_state:false,
    		two_state:false,
    		three_state:false,
    		four_state:false,
		}
	},
	watch:{
		'mobile_model':{
			handler:function(){
				if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile_model)){
					this.mobile_model=this.mobile_model;
					
				}else if(this.mobile_model.length==11){
					this.color_red=true;
					this.$toast({
	    				message:'你输入的手机号码有误，请重新输入',
	    				duration:3000,
	    			})
				}else if(this.mobile_model.length<11){
					this.color_red=false;
				}

				if(this.mobile_model.length>=11 && /^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile_model)){
					this.first_state=true;
				}else{
					this.first_state=false;

				}
			}
		},
		'yzm_num':{
			handler:function(n,o){
				if(this.yzm_num.length==4){
					this.two_state=true;
				}else{
					this.two_state=false;

				}
			}
		},
		'dx_yzm':{
			handler:function(){
				if(this.dx_yzm.length==4){
					this.three_state=true;
				}else{
					this.three_state=false;
				}
			}
		},
		'btn_state':{
				handler:function(){
				if(this.btn_state){
					this.four_state=true;
					console.log(this.btn_state)
				}else{
					this.four_state=false;
				}
			}
		}
	},
	methods: {
		/*登录的api*/
	    mobile_api:function(){
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=plusLogin';
	    	if(this.btn_state && this.dx_yzm && this.yzm_num && this.mobile_model){
	    		axios.get(url,{params:{mobile:this.mobile_model,mobile_code:this.dx_yzm,code:this.yzm_num}}).then(res=>{
	    			// console.log(res)
	    			if(res.data.status==1){
	    				location.href='../html/particulars.html';
	    			}else{
	    				this.$toast({
	    				message:res.data.msg,
	    				duration:3000,
	    				})
	    			}
	    		})
	    	}else if(!this.mobile_model){
	    		this.$toast({
	    			message:'请您输入你的手机号码',
	    			duration:3000,
	    		})
	    	}else if(!this.dx_yzm){
	    		this.$toast({
	    			message:'请您输入你的短信验证码',
	    			duration:3000,
	    		})
	    	}else if(!this.yzm_num){
	    		this.$toast({
	    			message:'请您输入图形验证码',
	    			duration:3000,
	    		})
	    	}else if(!this.btn_state){
	    		this.$toast({
	    			message:'请您勾选用户协议',
	    			duration:3000,
	    		})
	    	}
	    },
	    /*点击图片的时候换图片的事件*/
	    changcode(){
	    	var img = document.getElementById("Img");  
            img.src = "http://www.pluss.com/mobile.php?act=code&timer" + Math.random();
	    },
	    /*短信验证码api*/
	    Verification(){
	    	
	    	if(this.mobile_model==null){
	    		let url = 'http://www.pluss.com/mobile.php?act=get_mobile_code&pin=11009';
	    			axios.get(url,{params:{mobile:this.mobile_model,code:this.yzm_num}}).then(res=>{
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
	    		if(this.mobile_model.length<11){
	    			this.color_red=true;
	    			this.$toast({
	    				message:'请输入正确的手机号码',
	    				duration:3000,
	    			})
	    		}else{
	    			let url = 'http://www.pluss.com/mobile.php?act=get_mobile_code&pin=11009';
	    			axios.get(url,{params:{mobile:this.mobile_model,code:this.yzm_num}}).then(res=>{
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
  		},
  		check(){
  			this.btn_state=!this.btn_state;
  		}
	},
	created:function(){
		this.btn_state=true;
		this.changcode()
	}
})

vm.$mount('#mtshop')