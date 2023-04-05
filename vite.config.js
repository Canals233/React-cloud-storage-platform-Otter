import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import less from "less";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
			symbolId: "icon-[dir]-[name]",
		}),
	],
	base: "./",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				// modifyVars: {
				// 	"primary-color": "#1DA57A",
				// },
				javascriptEnabled: true,
				additionalData: `@import "@/styles/var.less";`,
			},
		},
	},
	server: {
        host:'0.0.0.0',
        port: 5173,
		cors: true,
        open: true,
		proxy: {
			"/api": {
				// target: "https://118.195.240.214:5000", // HTTPS并且用IP直接访问
                // secure: false,//跳过证书检查
                target:'http://hduscda.cn:5000',
				changeOrigin: true,
                
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		}
	},
});
