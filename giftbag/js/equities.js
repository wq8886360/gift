var vm = new Vue({
	data: function () {
		return {
			datadre: {},
			items: [],
			// kefuimg: true
			buyid:1
		};
	},
	methods: {
		interface:function() {
			let url = 'https://api-test.shunliandongli.com/v1/Plus/PlusEquity.json?pin=11009';
			// let url = 'https://api-test.shunliandongli.com/v1/Plus/PlusEquity.json';
			axios.get(url).then(response => {
				this.datadre = response.data.data;
				this.items = this.datadre.item;
				this.img = this.items.content
				this.kefuid = this.items[1].content[0].img_id
				// console.log(this.kefuid)
				// console.log(this.items)

				console.log(response);
			});
		},
		touch:function(){
			this.buyid = this.datadre.is_buy;
	    	if(this.buyid == 1){
	    		window.location.href = 'slmall://kefu?itemId=' + this.kefuid
	    	}
	    	else{
	    		let _this = this
	    		let timer = setTimeout(() => {  
               	 _this.buyid = 1;
                // clearTimeout(timer)  
            	}, 2000);
	    	}
		}
	},
	created:function() {
		this.interface();
	}
});
vm.$mount('#equities');