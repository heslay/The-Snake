/***
 *地图类
 *@row		行数
 *@col		列数
 *@width	总宽度
 *@height	总高度
***/
function Map(row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	//二位数组创建地图
	this.arr = new Array();
	//定义容器元素
	this.dom = document.createElement('div');;
}
//初始化地图
Map.prototype.init = function() {
	//遍历行列
	// console.log(2);
	for (var i = 0; i < this.row; i++) {
		//设置行元素
		var rowDom = document.createElement('div');
		rowDom.className = 'row';
		rowDom.style.height = this.height / this.row + 'px';
		//定义行数组
		var rowArr = [];
		//设置列元素
		for (var j = 0; j < this.col; j++) {
			var colDom = document.createElement('div');
			colDom.className = 'col';
			//单元格放入行元素
			rowDom.appendChild(colDom);
			//存储对元素的映射
			rowArr.push(colDom);
		}
		//将行元素渲染
		this.dom.appendChild(rowDom);
		//存储对元素的映射
		this.arr.push(rowArr);
	}
	//设置容器元素类
	this.dom.className = 'box';
	this.dom.style.width = this.width + 'px';
	this.dom.style.height = this.height + 'px';
	//上树
	document.body.appendChild(this.dom);
}
//删除地图当前已有属性
Map.prototype.delete = function() {
	//本质就是删除每一个元素的背景信息
	for (var i = 0; i < this.arr.length; i++) {
		for (var j = 0; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundImage = "";
			this.arr[i][j].style.backgroundSize = "";
			this.arr[i][j].style.backgroundPosition = "";
		}
	}
}