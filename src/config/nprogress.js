import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
    easing: "ease",
    speed: 500,
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.3 // 初始化时的最小百分比
});
export default NProgress;
