var vm = new Vue({
	data:function (){
		return {
			datadre:{},
			cont:[],
			kefu:{},   //客服图片
			adver:[],  //广告
			buyid:1, //是否购买会员 
			
			wskey:'',
			equ:{},
			shopid:''

		}
	},
	methods: {
	    interface:function(){ 
	    	let url = 'https://api-test.shunliandongli.com/v1/Plus/PlusList.json?pin=11009'
	    	// let url = "'https://api-test.shunliandongli.com/v1/Plus/PlusList.json" 
	    	axios.get(url).then( response => {	    	    
	    		this.datadre = response.data.data
	    		this.cont = this.datadre.plus_equity.content;
	    		this.kefu = this.datadre.kefu
	    		this.adver= this.datadre.ad	
	    		this.pin = this.datadre.pin	    		
	    		this.wskey = this.datadre.wskey
	    		this.equ = this.datadre.plus_equity
	    		this.shopid = this.datadre.shopid
	    		this.buyid = this.datadre.plus_equity.is_buy 
	    		if(response.data.status == 2){ 
	    			window.location.href = '../html/mtshop.html'
	    		}
  				})		 
	    },
	    Toast:function(){	
	    	this.buyid = this.datadre.plus_equity.is_buy 
	    	console.log(this.buyid)
	    	if(this.buyid == 1){
	    		window.location.href = 'slmall://kefu?itemId=' + this.kefu.img_id
	    	}
	    	else{
	    		let _this = this
	    		let timer = setTimeout(() => {  
               	 _this.buyid = 1;
                // clearTimeout(timer)  
            	}, 2000);
	    	}
	      

    		    	
	    },
	    adverimg:function(type,id){
	    	window.location.href = 'slmall://' + type + "?itemId=" + id 
	    }
	  },
	  created:function(){
	  	this.interface(); 
	  		  
	  }
})
vm.$mount('#dredge')