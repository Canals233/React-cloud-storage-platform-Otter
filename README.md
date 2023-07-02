# 水獭云：对象存储云平台客户端

## 一、介绍

基于 React18、Electron23+、Redux +Redux-Toolkit+RTK Query、Vite4、Ant-Design 、Axios开源的一套对象存储云平台客户端框架。

*(仿tx云)*

本项目基于优秀的开源后台管理平台[Hooks-Admin](https://github.com/HalseySpicy/Hooks-Admin)，进行了大幅度的重构，删改并新增了大量的存储桶对象管理的特化功能。

*2023-07-02 本仓库代码还未进行开源的特化，停留在比赛演示版本，但保证项目在依赖正确的情况下可以进行正常的使用*

## 二 、相关链接

### 项目地址

GitHub：https://github.com/Canals233/React-cloud-storage-platform-Otter

### 相关技术文档

前端如何真正实现上传整个文件夹，而不是简单地展开成多文件？https://juejin.cn/post/7231108358426165303

### 个人主页

Github：https://github.com/Canals233

稀土掘金-Canals：https://juejin.cn/user/1236309682958702

## 三、项目特色

- 先进的技术栈：React18、Electron23+、Redux +Redux-Toolkit+RTK Query、Vite4、Ant-Design 、Axios
- Web+Win多端支持：使用Electron23+和Electron-forge6+封装React18项目为桌面客户端，对Vite4构建的Web项目可以追加Electron构建为桌面客户端
- 先进的构建工具：采用 Vite4 作为项目开发、打包工具，对Vite参数进行了调优，便于开发环境调试
- 完善的状态管理：使用redux-toolkit重构了原有的纯Redux管理，将所有的存储部分规范化
- 对 Axios和RTK  Query 二次封装，增加了拦截器快速统一处理请求和响应
- 灵活使用Context API：对层数较少的临时状态存储（如创建存储桶）灵活使用`Context  API`简化逻辑
- 开发生产环境分明：npm scripts定义了多种不同开发模式，并通过`cross-env`设置不同环境变量区分

## 四、使用步骤

- **Clone：**

```
git clone https://github.com/Canals233/React-cloud-storage-platform-Otter.git
```

- **Install：**

```
npm install
 
# 本项目使用的npm源为阿里源 http://registry.npmmirror.com/
```

- **Run：**

```
#开启React的Web界面
vite
或
npm run dev

#开发环境的Electron命令需要先通过vite启动Web
#开发环境electron启动，electron源为web的URL
npm run start 
#生产环境electron启动，electron源为根目录下的dist文件夹(vite打包后)
npm run prod-start
```

- **Build：**

```
# 生产环境vite打包react
npm run build
# 产生windows桌面文件
npm  run make
```

## 五、项目功能

**总架构图**

![image-20230702221418272](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\image-20230702221418272.png)

- 登录注册模块：通过可表单实现用户输入的实时性校验，输入和警告提示，实现注册登录数据的批处理统一化提交。可调用后端提供的验证码接口进行认证

  登录流程较为经典，输入的账号和密码无误即可

  注册流程为，通过邮箱发送验证码->点击注册，先发送验证码验证请求->验证通过后自动再发送写入数据库请求

- 存储方面可分为存储桶部分和文件管理部分，总体上提供了一个VFS

  - 存储桶部分可实现 创建，删除，清空存储桶；修改存储桶名称，标签，访问权限；根据名称搜索存储桶；存储桶信息表格展示，筛选，排序；存储桶数据与访问监控展示。总体是向用户提供的是类似Windows文件资源管理器的修改最高一级父文件夹的功能。
  - 文件存储方面可实现 ：批量上传，删除，复制，下载文件；文件详细信息浏览；修改文件名称，访问权限；根据标签搜索文件，根据名称搜索文件；文件信息表格展示，筛选，排序；创建，删除文件夹；上传文件夹与其中的全部文件；要向用户提供的是类似Windows文件资源管理器的子文件或子文件夹操作。

- 数据展示模块主要负责向用户提供统计数据，便于用户统计当前存储使用情况和访问量。同时，由于数据的时序性强，数据展示还可根据时间戳进行分类分区分片展示，实现时序数据的智能定制化获取与展示。数据展示主要分为简洁快速的数据概览和以图表为核心的详细使用统计。

  - 数据概览：数据概览部分提供的是能让用户快速浏览当前存储情况和访问轻快的简单总结，界面主打简洁明了，便于用户得到信息。主要展示存储用量，总流量，请求数量，存储桶数量，对象总数与日均存储用量。
  - 使用统计：使用统计部分是用多种多维可选图表，向用户提供高度个性化的数据展示，能根据不同需要展示出数据比例图，折线图等等多种图标数据格式。目的是让用户根据不同需求得到期望的数据展示样式。

- 辅助功能：提供了全屏，色盲模式，黑暗模式等辅助功能。

*业务逻辑的分析和技术文档将尽快更新*

## 六、项目截图

登录表单

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg)

注册表单与注册错误提示

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image004.jpg)

 存储桶列表页面

​    ![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image006.jpg)

权限管理窗口

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image008.jpg)

创建存储桶

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image010.jpg)![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image012.jpg)



排序并进行选择后的文件列表页面

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image014.jpg)

任务队列

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image016.jpg)

 下载结果

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image018.jpg)



 数据概览页面

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image020.jpg)



数据统计页面

![img](file:///C:/Users/DELL/AppData/Local/Temp/msohtmlclip1/01/clip_image022.jpg)‘
