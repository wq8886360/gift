// var req_url = 'https://plus.mengtianvip.com/mobile.php?pin=11009'
var vm = new Vue({
	data:function (){
		return {
			value2: 0, //进度条
			index: 0,  //tab样式
			// pin:'',
			// wskey:'',
			msg:{},
			widt:'',//礼包的length
			seet:'',
			gorwinfo:{},
			gorwitem:[], 
			level:'',
		}
	},
	methods: {
	    formatTooltip:function(val) { 
	      return val / 100;
	    },
	    interface:function() { 
	    	// let url = "http://www.plus.com/index.php?m=Api&c=Plus&a=plusDetail&pin=" + this.pin + '&wskey='  +this.wskey;
	    	let url = 'http://www.pluss.com/mobile.php?act=plus&op=plusList&pin=11009'
	    	// let url = req_url+'&act=plus&op=plusList'
	    	axios.get(url).then(response => {
	    		this.msg = response.data.msg
	    		this.widt = this.msg.plus_gift.length
	    		this.seet = this.msg.plus_equity.settling_money
	    		this.gorwinfo = this.msg.plus_grow.grow_info
	    		this.gorwitem = this.msg.plus_grow.grow_item

	    		let level = this.gorwinfo.level
	    		this.value2 = level
	    		console.log(response.data.status); 
	    		if(response.data.status == 2){ 
	    			window.location.href = '../html/mtshop.html'
	    		}

	    	});
	    },
	    baoxq:function(id){
	    	window.location.href = '../html/bagdet.html?' + '&id=' + id
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
		// function GetQueryString(name){
	 //    	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 //    	var r = window.location.search.substr(1).match(reg);
	 //    	if(r!=null)return  unescape(r[2]); return null; 
	    	
	 //    }
	 //    this.pin = GetQueryString("pin")
	 //    this.wskey = GetQueryString("wskey")

	    // this.widx = this.$refs.widx

		this.interface()
	},

})
vm.$mount('#particulars') 