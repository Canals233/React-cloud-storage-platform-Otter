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

### 视频功能演示
https://www.bilibili.com/video/BV1Q14y1d79U

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

![VFS树](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/57b91ec9-2629-47b4-b66d-5d9ad2d5570d)


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
![登录](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/6f754887-f416-46aa-b08f-50cc83e3a18c)


注册表单与注册错误提示

![注册两个表单](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/c62e6470-2657-489a-a8cd-a87a6a0e6d40)


 存储桶列表页面

​![存储桶列表](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/96c76831-16dc-408f-92d7-cdec3bc29908)


权限管理窗口

![权限管理](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/838a3719-338d-405e-92f5-cdc56d8e614c)


创建存储桶

![创建第一步](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/788ff87e-9339-4b29-9236-67abe6e223a7)
![创建2](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/352f8ad5-770d-4c1c-97da-96ee31d861eb)


排序并进行选择后的文件列表页面

![文件列表](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/3151a5af-09ed-46bb-913e-95c9fb860303)

任务队列

![任务队列](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/c96d4ff4-3003-4abd-ad67-c67e8101352d)

 下载结果

![点击下载的结果](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/879efb85-56a7-4428-9c49-d25ebced542b)

 数据概览页面

![概览](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/7b3adfae-c869-4424-b15a-055e25bce2e1)

数据统计页面
![数据统计](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/548e23df-37a5-404a-9854-5a8fa0d108dc)
存储桶内独立数据

![独立存储桶数据](https://github.com/Canals233/React-cloud-storage-platform-Otter/assets/55939284/1f44d59b-a187-4ce2-ad6f-0ae8527c6bd0)
