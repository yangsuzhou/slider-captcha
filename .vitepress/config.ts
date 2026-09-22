import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";

const base = process.env.VITEPRESS_BASE || "/slider-captcha/";

export default defineConfig({
    title: "SliderCaptcha 滑块验证码",
    description: "@punish/slider-captcha 组件文档",
    lang: "zh-CN",
    base,
    head: [["link", { rel: "icon", href: `${base}favicon.ico` }]],
    themeConfig: {
        nav: [{ text: "首页", link: "/" }],
        socialLinks: [{ icon: "npm", link: "https://www.npmjs.com/package/@punish/slider-captcha" }],
        footer: {
            message: "基于 MIT 协议开源",
            copyright: "Copyright © 2024-present Monster UI",
        },
    },
    vite: {
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./", import.meta.url)),
            },
        },
        ssr: {
            noExternal: ["@punish/slider-captcha"],
        },
    },
});
