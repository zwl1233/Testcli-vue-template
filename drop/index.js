 import "./style.css";
 import _ from 'lodash';
 import img from './asset/WechatIMG328.png'
 import printMe from './print.js';
 import { cube } from './math.js';


 function component() {
   var element = document.createElement('div');
   var btn = document.createElement('button');
   btn.innerHTML = 'Click me and check the console!'+cube(5);
   btn.onclick = printMe;

   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');
   var myIcon = new Image();
   myIcon.src = img;
   element.appendChild(btn);
   element.appendChild(myIcon);
   return element;
 }
 document.body.appendChild(component());


 //更新在控制台显示出来
  if (module.hot) {
     module.hot.accept('./print.js', function() {
       console.log('Accepting the updated printMe module!');
       printMe();
     })
   }