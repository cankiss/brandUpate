# vue-project

> A Vue.js & Vux UI project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Explain
```bash
# Already expose global variable for Ajax(The catalog in /src/config/api.js)
  BASEURL:基本URL地址
  IMAGEURL:验证码图片URL
  ACTIVITYURL:活动地址URL
  lxyurlone:By longYaoyan about 360
  lxyurltwo:By longYaoyan about 360
```
```bash
# About webpack alias,you can use '@','~' translate  non-root URLs to relative paths.
  example:
  import mm @/store => import mm src/store
  import mm ~/store => import mm src/components/store
  img src="~assets/logo.png" => img src="assets/login"(wherever you are)

```
```bash
# About global `this` use ajax
 this.$post is using for send data as the x-www-form-urlencoded
 this.$http.post send application/json by default
 this.$mine the same as it's name using in mine module
```


# Usage

```bash
# store.js is using for replace window.localStoarge or sessionStorage
  You can use this.storage in vue instance

  // Store current user
  store.set('user', { name:'Marcus' })

  // Get current user
  store.get('user')

  // Remove current user
  store.remove('user')

  // Clear all keys
  store.clearAll()

  // Loop over all stored values
  store.each(function(value, key) {
    console.log(key, '==', value)
  })
```

```bash
# vue-meta is using for custom the document title,and already injected global
example:
  export default{
    metaInfo: {
      title: '我的账户'
    }
  }
  or sometime maybe variable:
  export default{
    metaInfo(){
      return{
        title:this.variable...
      }
    }
  }




```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
