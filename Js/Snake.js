//定义蛇类
function Snake(img, col, row) {
	this.col = col;
	this.row = row;
	//存储身体坐标
	this.arr = [
		{ x: 7, y: 4},
		{ x: 6, y: 4},
		{ x: 5, y: 4},
		{ x: 4, y: 4},
		{ x: 3, y: 4},
	];
	//存储蛇图片
	this.img = img;
	/*存储移动方向
		左37 上38 右39 下40
		**根据方向确定蛇头部的方向图片
			(direction - 37).jpeg
			就是数组中的顺序图片
	*/
	this.direction = 37;
	//存储各蛇部位图片
	this.headImage = this.img.head[this.direction - 37];
	this.tailImage = this.img.tail[this.direction - 37];
	this.bodyImage = this.img.body;
}
//蛇移动
Snake.prototype.move = function() {
	//原理:往蛇头插入一个位置,蛇尾注释掉
	//创建一个新的头部对象
		//判断按键方向
	var item = null;
	var len = this.arr.length - 1;
	var last1,last2;
	switch (this.direction) {
		//向左 (x-1)
		case 37:
			item = {x: this.arr[len].x - 1, y: this.arr[len].y};
			break;
		//向上 (y-1)
		case 38:
			item = {x: this.arr[len].x, y: this.arr[len].y - 1};
			break;
		//向右 (x+1)
		case 39:
			item = {x: this.arr[len].x + 1, y: this.arr[len].y};
			break;
		//向下 (y+1)
		case 40:
			item = {x: this.arr[len].x, y: this.arr[len].y + 1}
			break;
		default:
			break;
	}
	//插入
	this.arr.push(item);
	this.arr.shift();
	//确定尾部图片的方向
		//对最后两个图片的位置进行比较
	last2 = this.arr[1];
	last1 = this.arr[0];
	this.judege(last1,last2);
	return ;
}

//改变尾部图片
Snake.prototype.judege = function(l1, l2) {
	//如果x方向一样
	if (l1.x === l2.x) {
		if (l1.y > l2.y) {
			this.tailImage = this.img.tail[1];
		}
		else {
			this.tailImage = this.img.tail[3];
		}
		return;
	}
	//如果y方向相同
	else if(l1.y === l2.y) {
		if (l1.x > l2.x) {
			this.tailImage = this.img.tail[0];
		}
		else {
			this.tailImage = this.img.tail[2];
		}
		return;
	}
	return;
	
}
//蛇移动改变方向
Snake.prototype.change = function(code) {
	//注意不能直接左右改变 或者 上下 或者 同一方向改变
	//键盘之间的差值用来控制
	//左37 上38 右39 下40
		//Math.abs 表示取绝对值
	var num = Math.abs(code - this.direction); 
	if (num === 0 || num === 2) {
		return;
	}
	this.direction = code;
	//更换头部方向
	this.headImage = this.img.head[this.direction - 37];
}
//蛇吃食物成长
Snake.prototype.growUp = function() {
	//给尾部添加一个之前的尾部
	var tail = this.arr[0];
	this.arr.unshift(tail);
}