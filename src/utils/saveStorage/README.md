#saveStorage

#localStorage/sessionStorage 本地存贮方法

页面引用：
import session from 'utils/saveStorage/sessionStorage'
import local from 'utils/saveStorage/localStorage'

sessionStorage：
session.getSession(key)
session.setSession(key,value)
session.remSession(key)

localStorage：
local.getSession(key)
local.setSession(key,value)
local.remSession(key)

GET方法：
session.getSession(key)  提取存储session
SET方法：
session.setSession(key,value)  向session新建key:value，修改key的value
REMOVE方法：
session.remSession(key)  remove删除session存贮key键值对

简单的存贮方法，session存储数据默认状体，没有存储时间，关闭浏览器，清除session数据。
(暂时未启用)localStorage存储方法，调用和session一致，关闭浏览器不会清除数据，可以留存用户信息。

Update time:2017.10.28   author:'韩爽'   e-mail:hanshuang@sit.com.cn
