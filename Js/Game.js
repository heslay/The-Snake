function Game(snake, map, food, block) {
	//存储属性
	this.snake = snake;
	this.map = map;
	this.food = food;
	this.block = block;
	//定义定时器句柄
	this.timerbar = null;
	//实现初始化方法
	this.init();
}
Game.prototype.init = function() {
	//地图初始化
	this.map.init();
	//渲染食物
	this.renderFood();
	//绘制障碍物
	this.readerBlock();
	//绘制蛇
	this.readerSnake();
	//启动游戏
	this.start();
	//绑定事件-控制蛇的移动
	this.bindEvent();
}
Game.prototype.renderFood = function() {
	// console.log(this.map,this.food);
	//根据食物横纵坐标,在地图中找到对应的元素,设置其背景属性
	this.map.arr[this.food.y][this.food.x].style.backgroundImage = 'url(' + this.food.img + ')';
	this.map.arr[this.food.y][this.food.x].style.backgroundSize = "36px 36px";
	this.map.arr[this.food.y][this.food.x].style.backgroundPosition ="-2px -5px";
}
Game.prototype.readerBlock = function() {
	//绘制障碍物
	var len = this.block.arr.length;
	var item = null;
	for (var i = 0; i < len; i++) {
		item = this.block.arr[i];
		this.map.arr[item.y][item.x].style.backgroundImage = 'url(' + this.block.img +')';
		this.map.arr[item.y][item.x].style.backgroundSize = "34px 38px";
		this.map.arr[item.y][item.x].style.backgroundPosition ="-5px -5px";
	}
}
Game.prototype.readerSnake = function() {
	//特殊绘制头和尾
	var tail = this.snake.arr[0];
	var head = this.snake.arr[this.snake.arr.length - 1];
	//绘制头
	this.map.arr[head.y][head.x].style.backgroundImage = 'url(' + this.snake.headImage +')';
	this.map.arr[head.y][head.x].style.backgroundSize = "40px 40px";
	this.map.arr[head.y][head.x].style.backgroundPosition ="-5px -9px";
	//绘制身体:从第二张到倒数第二张 1~length-2
	var body = null;
	for (var i = 1, len = this.snake.arr.length - 1; i < len; i++) {
		//缓存身体
		body = this.snake.arr[i];
		this.map.arr[body.y][body.x].style.backgroundImage = 'url(' + this.snake.bodyImage +')';
		this.map.arr[body.y][body.x].style.backgroundSize = "cover";
	}
	//绘制尾部
	this.map.arr[tail.y][tail.x].style.backgroundImage = 'url(' + this.snake.tailImage +')';
	this.map.arr[tail.y][tail.x].style.backgroundSize = "cover";
}

//启动游戏
Game.prototype.start = function() {
	var that = this;
	this.timerbar = setInterval(function() {
		//移动蛇
		that.snake.move();
		//检测障碍物
		if (!that.boundJudge()) {
			return;
		}
		//检测是否吃到食物
		that.checkFood();
		//重置背景
		that.map.delete();
		//渲染食物
		that.renderFood();
		//绘制障碍物
		that.readerBlock();
		//绘制蛇
		that.readerSnake();
	}, 500);
}

//绑定蛇移动事件
Game.prototype.bindEvent = function() {
	//监听键盘事件
	var that = this;
	var arr = [37, 38, 39, 40];
	document.onkeydown = function(e) {
		if (arr.includes(e.keyCode)) {
			that.snake.change(e.keyCode);
			// console.log(e.keyCode);
		}
	}
}
//游戏结束
Game.prototype.stop = function() {
	clearInterval(this.timerbar);
	console.log("Game.over");
}
//检测碰撞
Game.prototype.boundJudge = function() {

//地图边界检测
	//利用头部检测
	var item = this.snake.arr[this.snake.arr.length - 1];
	if (item.x < 0 || item.x >= this.map.col || item.y < 0 || item.y >= this.map.row) {
		this.stop();
		return 0;
	}
	// console.log('头部',item);
//障碍物进行检测
	for (var i = 0, len = this.block.arr.length; i < len; i++) {
		if (item.x === this.block.arr[i].x && item.y === this.block.arr[i].y) {
			this.stop();
			return 0;
		}
	}
//蛇最自身身体检测
	for (i = 0, len = this.snake.arr.length - 1; i < len; i++) {
		if (item.x === this.snake.arr[i].x && item.y === this.snake.arr[i].y) {
			this.stop();
			return 0;
		}
	}
	return 1;
}

//检测蛇是否吃到食物
Game.prototype.checkFood = function() {
	//蛇的头部与食物重合
	var item = this.snake.arr[this.snake.arr.length - 1];
	if (item.x === this.food.x && item.y === this.food.y) {
		//吃到食物,蛇要成长
		this.snake.growUp();
		//清除吃过的食物
		this.map.arr[this.food.y][this.food.x].style.backgroundImage = "";
		this.map.arr[this.food.y][this.food.x].style.backgroundSize = "";
		this.map.arr[this.food.y][this.food.x].style.backgroundPosition = "";
		//重置一个食物
		while(!this.restFood());

	}
}
Game.prototype.restFood = function() {
	//随机一个食物
	var x = parseInt(Math.random() * this.map.col);
	var y = parseInt(Math.random() * this.map.row);
	//不能出现在障碍物上
	for (var i = 0, len = this.block.arr.length; i < len; i++) {
		if (x === this.block.arr[i].x && y === this.block.arr[i].y) {
			return 0;
		}
	}
	this.food.x = x;
	this.food.y = y;
	return 1;
}