#Pagedetection
=============

page detection, will detect how long user put page there, and do not do anything action etc

## Useage

```js
PageDetection.init(config).start();
```

## config配置

1. 'timing': 检测时间长度，单位毫秒，默认为10000。

2. 'once': 当第一次timeout触发后，是否继续做监测，默认true。

3. 'onTimeout': function，时间点到了以后触发回调函数。

4. 'onPause'：暂停时触发回调函数。

## method

### init `PageDetection.init()`

 初始化方法，支持链状调用。

### start `PageDetection.start()`

 开始计时。

### pause `PageDetection.pause()`

 计时暂停，不清空当前的时间。

### continue `PageDetection.continue()`

 从暂停继续，继续计时。

### reset `PageDetection.reset()`

 重置当前的计时，当页面有交互时，会默认调用该方法。

### cancel `PageDetection.cancel()`

 取消当前的计时。

### getTime `PageDetection.getTime()`

 获取开始到当前已经过的时间。
