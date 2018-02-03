var vm = new Vue({
	data:function (){
		return {				
			input1:'',
			input2:'',
			input31:'',
			input32:'',
			input33:'',
			popupVisible: false,
			input4:'',
			region: null,
			shen: '',
			shi: '',
			qu: '',
			shenId: '',
			shiId: '',
			quId: '',
			slots: [ 
				{
				  flex: 1,
				  values: [],
				  className: 'slot1',
				  textAlign: 'center',
				  defaultIndex: 1,
				}, {
				  divider: true,
				  content: '-',
				  className: 'slot2'
				}, {
				  flex: 1,
				  values: [],
				  className: 'slot3',
				  textAlign: 'center',
				  defaultIndex: 1,
				}, {
				  divider: true,
				  content: '-',
				  className: 'slot4'
				}, {
				  flex: 1,
				  values: [],
				  className: 'slot5',
				  textAlign: 'center',
				  defaultIndex: 1,
				}
			]
		}
	},
	methods: {
	    submit:function(){
	    	this.name = this.input1
	    	this.number = this.input2
	    	this.city1 = this.input31
	    	this.city2 = this.input32
	    	this.city3 = this.input33
	    	this.adress = this.input4
	    	// console.log(this.name,this.number,this.city,this.adress)
	    	localStorage.setItem('name',this.name)
	    	localStorage.setItem('number',this.number)
	    	localStorage.setItem('city1',this.shen)
	    	localStorage.setItem('city2',this.shi)
	    	localStorage.setItem('city3',this.qu)
	    	localStorage.setItem('city1id',this.shenId)
	    	localStorage.setItem('city2id',this.shiId)
	    	localStorage.setItem('city3id',this.quId)
	    	localStorage.setItem('adress',this.adress)
	    	localStorage.setItem('panduan',6)
	    	let id = this.getQueryString("id")
	    	window.location.href = '../html/affirm.html?'+'&id='+id
	    },
	    getQueryString:function (name) { 
	       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	       var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	       var context = ""; 
	       if (r != null) 
	          context = r[2]; 
	       reg = null; 
	       r = null; 
	       return context == null || context == "" || context == "undefined" ? "" : context; 
	    },
	    onValuesChange(picker, values){
	     	this.shen = values[0];
	     	this.shi = values[1];
	     	this.qu = values[2];
	    },
	},
	watch: {
		'shen': {
			handler:function(value){
				region.map((item) => {
					if(item.name == value){
						this.slots[2].values = [];
						this.shenId = item.id
						item['_child'].map((_item)=>{
							this.slots[2].values.push(_item.name);
						})
						return;
					}
				})
			},
			deep: true,
		},
		'shi': {
			handler:function(value){
				region.map((item) => {
					if(item.name == this.shen){
						item['_child'].map((_item)=>{
							if(_item.hasOwnProperty('_child')){
								if(_item.name == value){
									this.shiId = _item.id
									this.slots[4].values = [];
									_item['_child'].map((_item)=>{
										this.slots[4].values.push(_item.name);
									})
									return;
								}
							}
						})
					}
				})
			},
			deep: true
		},
		'qu': {
			handler:function(value){
				region.map((item) => {
					if(item.name == this.shen){
						item['_child'].map((_item) => {
							if(_item.name == this.shi){
								_item['_child'].map((__item)=>{
									if(__item.name == value){
										this.quId = __item.id
										return;
									}
								})
							}
						})
					}
				})
			},
			deep: true
		}
	},
	mounted(){
		this.$nextTick(() => {
			setTimeout(() => {//这个是一个初始化默认值的一个技巧
	 			this.slots[0].defaultIndex = 0;
	 			this.slots[4].defaultIndex = 0;
	 			this.slots[2].defaultIndex = 0;
			}, 100);
		});
	},
	created(){
		//转换地址数据格式
		var _this = this;
		region.map((item) => {
			_this.slots[0].values.push(item.name);
			item['_child'].map((_item) => {
				_this.slots[2].values.push(_item.name)
				if(_item.hasOwnProperty('_child')){
					if(_item['_child'].length != 0){
						_item['_child'].map((__item) => {
							_this.slots[4].values.push(__item.name)
						})
					}
				} 
			})
			 
		})
	}
})
vm.$mount('#goodssite')