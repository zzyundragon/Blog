import pic from './images/Arguments.jpg'
import('./style/index.css')
import('./style/login.css')
import('./style/less/index.less')
var img = new Image()
img.src = pic

console.log(img)
var root = document.getElementById('root')
root.appendChild(img)