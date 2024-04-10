(()=>{"use strict";var t={250:(t,i,n)=>{n.d(i,{A:()=>o});const o=function(){function t(t,i,n){this.canvasElement=t,this.width=i,this.height=n,this.canvasElement.width=i,this.canvasElement.height=n,this.context=t.getContext("2d")}return t.prototype.clear=function(){this.context.clearRect(0,0,this.canvasElement.width,this.canvasElement.height)},t.prototype.insertText=function(t,i){void 0===i&&(i={}),void 0===i.color&&(i.color="white"),void 0===i.size&&(i.size=20),this.context.font=i.size+"px Arial";var n=this.context.measureText(t),o=this.canvasElement.width/2-n.width/2,e=this.canvasElement.height/2-n.actualBoundingBoxAscent/2;return void 0===i.x&&(i.x=o-n.actualBoundingBoxAscent),void 0===i.y&&(i.y=e-n.actualBoundingBoxAscent),this.context.fillStyle=i.color,this.context.fillText(t,i.x+n.actualBoundingBoxAscent,i.y+n.actualBoundingBoxAscent,n.width),n},t}()},873:(t,i,n)=>{n.d(i,{A:()=>o});const o=function(){function t(t,i,n){this.model=t,this.context=i,this.image=n}return t.prototype.draw=function(){this.model.isCollected||this.context.drawImage(this.image,this.model.positionX,this.model.positionY,this.model.height,this.model.height)},t}()},516:(t,i,n)=>{n.d(i,{A:()=>e});var o=n(871);const e=function(){function t(t,i,n){this.model=t,this.context=i,this.image=n}return t.prototype.draw=function(){this.context.drawImage(this.image,this.model.positionColumnIndex*(this.model.positionX-this.model.width/(o.A.COLUMN-1)),this.model.positionY,this.model.width,this.model.height/2)},t}()},871:(t,i,n)=>{n.d(i,{A:()=>o});const o=function(){function t(){}return t.COLUMN=3,t.FRUIT_SPAWN_TIME=500,t.MAX_FRUIT_SPAWN=20,t.FRUIT_DROP_SPEED=5,t.START_LIVES_DEFAULT=3,t.START_SCORE_DEFAULT=0,t.CANVAS_HEIGHT=window.innerHeight,t.CANVAS_WIDTH=300,t.SCORE_INCREMENT=10,t}()},484:(t,i,n)=>{n.d(i,{A:()=>o});const o=function(t){window.onkeydown=function(i){var n;return null===(n={ArrowLeft:t.moveLeft,ArrowRight:t.moveRight}[i.key])||void 0===n?void 0:n.call(t)}}},236:(t,i,n)=>{n.d(i,{A:()=>e});var o=n(871);const e=function(){function t(t,i){this.fruits=t,this.canvas=i}return t.prototype.isWin=function(){return this.fruits.length===o.A.MAX_FRUIT_SPAWN&&(this.fruits[this.fruits.length-1].positionY>this.canvas.height||this.fruits[this.fruits.length-1].isCollected)},t.prototype.isPerfectWin=function(){return this.isWin()&&this.fruits.every((function(t){return t.isCollected}))},t}()},468:(t,i,n)=>{n.d(i,{A:()=>e});var o=n(871);const e=function(){function t(t,i,n,e,s,r){this.state=t,this.canvas=i,this.fruitDrawers=n,this.playerDrawer=e,this.player=s,this.fruits=r,this.lives=o.A.START_LIVES_DEFAULT,this.score=o.A.START_SCORE_DEFAULT}return t.prototype.play=function(){var t=this;this.canvas.clear(),this.canvas.insertText("Scores : "+this.score,{y:0});var i=this.lives<=0,n=this.state.isWin(),o=this.state.isPerfectWin();if(i||n){var e="Game Over!";return n&&(e=o?"Amazing Win!":"You Win!"),this.canvas.insertText(e),window.clearInterval(this.state.spawner),window.cancelAnimationFrame(this.state.startId)}this.canvas.insertText("Lives : "+this.lives),this.fruits.forEach((function(i){return i.move(t,t.player)})),this.fruitDrawers.forEach((function(t){return t.draw()})),this.playerDrawer.draw(),this.state.startId=window.requestAnimationFrame((function(){return t.play()}))},t}()},156:(t,i,n)=>{n(927).A.main()},927:(t,i,n)=>{n.d(i,{A:()=>l});var o=n(250),e=n(516),s=n(468),r=n(871),h=n(484),a=n(236),c=n(965),u=n(830),d=document.querySelector("canvas");if(!d.getContext("2d"))throw new Error("Your browser does not support this action!");const l=function(){function t(){}return t.main=function(){var t=new Image,i=new Image;t.src="public/images/cart.png",i.src="public/images/fruit.png";var n=new o.A(d,r.A.CANVAS_WIDTH,r.A.CANVAS_HEIGHT),l=new u.A(n.width/(r.A.COLUMN-1),n.height-n.height/10,n.width/r.A.COLUMN,60,Math.floor(r.A.COLUMN/2)),p=[],A=[],f=new e.A(l,n.context,t),v=new a.A(p,n.canvasElement),w=new s.A(v,n,A,f,l,p);new h.A(l);var m,g=(m=0,function(){2==++m&&(w.state.spawner=window.setInterval((function(){return c.A.spawn(p,w,A,i)}),r.A.FRUIT_SPAWN_TIME),w.state.startId=window.requestAnimationFrame((function(){return w.play()})))});t.onload=g,i.onload=g},t}()},965:(t,i,n)=>{n.d(i,{A:()=>r});var o=n(873),e=n(871),s=n(864);const r=function(){function t(t,i,n,o,e){void 0===i&&(i=0),void 0===n&&(n=60),void 0===o&&(o=!1),void 0===e&&(e=!1),this.positionX=t,this.positionY=i,this.height=n,this.isCollected=o,this.hasCountAsLoose=e}return t.prototype.move=function(t,i){var n=this.positionX+i.width/2-this.height/2,o=n>i.positionColumnIndex*(i.positionX-i.width/(e.A.COLUMN-1))&&n<i.positionColumnIndex*(i.positionX-i.width/(e.A.COLUMN-1))+i.width,s=this.positionY+this.height/2>=i.positionY&&this.positionY<i.positionY+this.height/2,r=o&&s,h=this.positionY>=t.canvas.height;r&&!this.isCollected&&(this.isCollected=!0,t.score+=e.A.SCORE_INCREMENT),!h||this.hasCountAsLoose||this.isCollected||(this.hasCountAsLoose=!0,t.lives--),this.positionY+=e.A.FRUIT_DROP_SPEED},t.spawn=function(i,n,r,h){if(i.length>=e.A.MAX_FRUIT_SPAWN)return window.clearInterval(n.state.spawner);var a=new t(s.A.getIntegerRandomNumber(0,e.A.COLUMN)*(n.player.positionX-n.player.width/(e.A.COLUMN-1)));a.positionX=a.positionX+n.player.width/2-a.height/2;var c=new o.A(a,n.canvas.context,h);i.push(a),r.push(c)},t}()},830:(t,i,n)=>{n.d(i,{A:()=>e});var o=n(871);const e=function(){function t(t,i,n,o,e){this.positionX=t,this.positionY=i,this.width=n,this.height=o,this.positionColumnIndex=e}return t.prototype.moveLeft=function(){var t=Math.max(this.positionColumnIndex-1,0);this.positionColumnIndex=t},t.prototype.moveRight=function(){var t=Math.min(this.positionColumnIndex+1,o.A.COLUMN-1);this.positionColumnIndex=t},t}()},613:()=>{},864:(t,i,n)=>{n.d(i,{A:()=>o});const o=function(){function t(){}return t.getIntegerRandomNumber=function(t,i){return Math.floor(Math.random()*(i-t)+t)},t}()}},i={};function n(o){var e=i[o];if(void 0!==e)return e.exports;var s=i[o]={exports:{}};return t[o](s,s.exports,n),s.exports}n.d=(t,i)=>{for(var o in i)n.o(i,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})},n.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),n(250),n(873),n(516),n(871),n(484),n(236),n(468),n(156),n(927),n(965),n(830),n(613),n(864)})();