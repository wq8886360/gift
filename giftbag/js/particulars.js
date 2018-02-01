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
			wskey:'',


			msg:{}
		}
	},
	methods: {
	    formatTooltip:function(val) {
	      return val / 100;
	    },
	    interface:function() {
	    	// let url = "http://www.plus.com/index.php?m=Api&c=Plus&a=plusDetail&pin=" + this.pin + '&wskey='  +this.wskey;
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=plusList&pin=11009'
	    	axios.get(url).then(response => {
	    		this.msg = response.data.msg
	    		// this.widx.style.width = this.msg.plus_gift.length*2.98 + 'rem'
	    		console.log(this.msg);
	    		// console.log(this.msg.plus_gift.length)

	    	});
	    },
	    giftlist:function(){

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

	    // this.widx = this.$refs.widx

		this.interface()
	}
})
vm.$mount('#particulars')