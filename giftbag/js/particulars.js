var vm = new Vue({
	data:function (){
		return {
			datadre:null,
			activeName: 'first',
			value2: 0, //进度条
			name:{},  //用户信息
			sell:[],  //金牌小店数
			pro :{},  
			equity:{}, 
			index: 0,  //tab样式
			// txmoney:false //可提现金额
			setling:'',
			setled:'',
			pin:'',
			wskey:''
		}
	},
	methods: {
	    formatTooltip:function(val) {
	      return val / 100;
	    },
	    interface:function() {
	    	// let url = "http://www.plus.com/index.php?m=Api&c=Plus&a=plusDetail&pin=" + this.pin + '&wskey='  +this.wskey;
	    	let url = 'http://www.plus.com/index.php?m=Api&c=Plus&a=plusDetail?=11009'
	    	axios.get(url).then(response => {
	    		this.datadre = response.data;
	    		this.name = this.datadre.plus_info;
	    		this.sell = this.datadre.plus_grow.sellerdata
	    		this.pro  = this.datadre.plus_grow.progress 	    		
	    		this.value2=this.pro.level
	    		this.setling=this.datadre.plus_equity.settling_money
	    		this.setled=this.datadre.plus_equity.settled_money
	    		// this.equity=this.datadre.plus_equity
	    		console.log(response);
	    		// console.log(this.sell)
	    	});
	    },
	    tishi:function(){
	    		this.equity=this.datadre.plus_equity
	    		let _this = this
	    		let timer = setTimeout(() => {  
               	 _this.equity = 666;
                // clearTimeout(timer)  
            	}, 2000);
	    },
	    changeTab:function(index){
	    	this.index = index;
	    },
	  },
	created:function(){
		function GetQueryString(name){
	    	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    	var r = window.location.search.substr(1).match(reg);
	    	if(r!=null)return  unescape(r[2]); return null; 
	    	
	    }
	    this.pin = GetQueryString("pin")
	    this.wskey = GetQueryString("wskey")

		this.interface()
	}
})
vm.$mount('#particulars')