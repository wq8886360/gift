var vm = new Vue({
	data:function (){
		return {
			datadre:{},
			cont:[],
			kefu:{},   //客服图片
			adver:[],  //广告
			buyid:1, //是否购买会员 
			pin:'',
			wskey:''
		}
	},
	methods: {
	    interface:function(){ 
	    	// let url = 'https://api-test.shunliandongli.com/v1/Plus/PlusList.json?pin=11009'
	    	let url = 'https://api-test.shunliandongli.com/v1/Plus/PlusList.json'
	    	axios.get(url).then( response => {	    	    
	    		this.datadre = response.data.data
	    		this.cont = this.datadre.plus_equity.content;
	    		this.kefu = this.datadre.kefu
	    		this.adver= this.datadre.ad	
	    		this.pin = this.datadre.pin
	    		this.wskey = this.datadre.wskey
	    		console.log(this.wskey)    		
    			// console.log(response);
  				})		 
	    },
	    Toast:function(){	
	    	this.buyid = this.datadre.plus_equity.is_buy 
	    	if(this.buyid == 1){

	    	}
	    	else{
	    		let _this = this
	    		let timer = setTimeout(() => {  
               	 _this.buyid = 1;
                // clearTimeout(timer)  
            	}, 2000);
	    	}
	      

    		    	
	    },
	    adverimg:function(){
	    	// let itemid= daver[index].itemId
	    	// console.log(itemid)
	    }
	  },
	  created:function(){
	  	this.interface(); 
	  	// console.log(this)	  
	  }
})
vm.$mount('#dredge')