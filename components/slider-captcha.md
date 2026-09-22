---
outline: deep
---

<script setup>
import SliderCaptchaDemoBasic from './slider-captcha-demo-basic.vue'
import SliderCaptchaDemoCustom from './slider-captcha-demo-custom.vue'
import SliderCaptchaDemoReset from './slider-captcha-demo-reset.vue'
</script>

# SliderCaptcha 滑块验证码

一个轻量、易用的 Vue 3 滑块验证码组件，支持自定义样式、事件与插槽。

## 安装

该组件已发布为 `@punish/slider-captcha` 包，可直接引入使用：

```bash
pnpm add @punish/slider-captcha
```

## 全局注册

```ts
import { createApp } from "vue";
import SliderCaptcha from "@punish/slider-captcha"; // 无需额外引入 css 文件
// import "@punish/slider-captcha/dist/style.css"; // 如果使用 SSR 或 SSG 且出现样式闪烁，可手动引入

const app = createApp(App);
app.use(SliderCaptcha);
```

## 按需引入

```vue
<script setup lang="ts">
import { SliderCaptcha } from "@punish/slider-captcha";
</script>
```

## 基础示例

最真实的用法：组件挂载后从接口获取验证码图片，拖动滑块后将轨迹提交到后端验证。

### 在线演示

<br/>

<SliderCaptchaDemoBasic />

### 示例代码

::: details 点击展开代码

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SliderCaptcha } from "@punish/slider-captcha";
import type { SliderCaptchaTrackItem } from "@punish/slider-captcha";

interface CaptchaInfo {
    backgroundImage: string;
    captchaId: string;
    sliderImage: string;
}

const captchaData = ref<CaptchaInfo | null>(null);
const captchaVerifying = ref(false);
const verifyResult = ref<string>("");

onMounted(() => {
    fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/captcha")
        .then((response) => response.json())
        .then((response) => (captchaData.value = response?.data));
});

const handleVerify = async (option: SliderCaptchaTrackItem) => {
    captchaVerifying.value = true;
    return fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/verify")
        .then((response) => response.json())
        .then((response) => response?.data?.passed)
        .finally(() => (captchaVerifying.value = false));
};

const onSuccess = () => {
    verifyResult.value = "验证成功 ✅";
};

const onFail = () => {
    verifyResult.value = "验证失败 ❌，请重试";
};

const onChange = () => {
    verifyResult.value = "";
};
</script>

<template>
    <div class="demo-basic">
        <template v-if="captchaData">
            <div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto">
                <SliderCaptcha
                    :background="captchaData.backgroundImage"
                    :block="captchaData.sliderImage"
                    :verify="handleVerify"
                    track-bg="#65CD81"
                    track-thumb-class="track-thumb"
                    track-class="track"
                    @success="onSuccess"
                    @fail="onFail"
                    @change="onChange"
                >
                    <template #default>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </template>
                </SliderCaptcha>
                <div v-if="captchaVerifying" class="loading-mask">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </template>
        <p class="demo-tip">{{ verifyResult || (captchaData ? "请拖动滑块完成验证" : "加载中...") }}</p>
    </div>
</template>

<style scoped>
.demo-basic {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px 16px;
    background: #fafafa;
}
:deep(.track) {
    border: 1px solid #eaeaea;
    height: 48px;
    background-color: #f8f8f8;
}
:deep(.track-thumb) {
    width: 60px !important;
    background-color: white;
}
.loading-mask {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    z-index: 20;
}
.loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #65cd81;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.demo-tip {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;
    min-height: 20px;
}
</style>
```

:::

## 自定义样式与插槽

通过 `track-class`、`track-thumb-class`、`track-bg`、`track-block-bg` 自定义轨道和滑块样式，并使用插槽替换默认内容和验证结果提示。

### 在线演示

<br/>

<SliderCaptchaDemoCustom />

### 示例代码

::: details 点击展开代码

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SliderCaptcha } from "@punish/slider-captcha";
import type { SliderCaptchaTrackItem } from "@punish/slider-captcha";

interface CaptchaInfo {
    backgroundImage: string;
    captchaId: string;
    sliderImage: string;
}

const captchaData = ref<CaptchaInfo | null>(null);
const captchaVerifying = ref(false);
const verifyResult = ref<string>("");

onMounted(() => {
    fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/captcha")
        .then((response) => response.json())
        .then((response) => (captchaData.value = response?.data));
});

const handleVerify = async (option: SliderCaptchaTrackItem) => {
    captchaVerifying.value = true;
    return fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/verify")
        .then((response) => response.json())
        .then((response) => response?.data?.passed)
        .finally(() => (captchaVerifying.value = false));
};

const onSuccess = () => {
    verifyResult.value = "验证成功 ✅";
};

const onFail = () => {
    verifyResult.value = "验证失败 ❌";
};

const onChange = () => {
    verifyResult.value = "";
};
</script>

<template>
    <div class="demo-custom">
        <template v-if="captchaData">
            <div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto">
                <SliderCaptcha
                    :background="captchaData.backgroundImage"
                    :block="captchaData.sliderImage"
                    :verify="handleVerify"
                    track-class="my-track"
                    track-thumb-class="my-thumb"
                    track-bg="rgba(0, 128, 0, 0.2)"
                    track-block-bg="#e8f5e9"
                    @success="onSuccess"
                    @fail="onFail"
                    @change="onChange"
                >
                    <span class="thumb-text">拖动我</span>
                    <template #verify-success>
                        <div class="result success">验证通过</div>
                    </template>
                    <template #verify-fail>
                        <div class="result fail">验证失败，请重试</div>
                    </template>
                </SliderCaptcha>
                <div v-if="captchaVerifying" class="loading-mask">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </template>
        <p class="demo-tip">{{ verifyResult || (captchaData ? "自定义样式与插槽示例" : "加载中...") }}</p>
    </div>
</template>

<style scoped>
.demo-custom {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px 16px;
    background: #fafafa;
}
:deep(.my-track) {
    border-radius: 20px;
    overflow: hidden;
    height: 48px;
}
:deep(.my-thumb) {
    border-radius: 20px;
    background-color: #4caf50 !important;
    color: #fff;
    width: 80px;
}
.thumb-text {
    font-size: 14px;
    font-weight: 600;
}
.result {
    padding: 8px 0;
    text-align: center;
    color: #fff;
    font-size: 14px;
}
.result.success {
    background-color: #4caf50;
}
.result.fail {
    background-color: #f44336;
}
.loading-mask {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    z-index: 20;
}
.loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #4caf50;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.demo-tip {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;
    min-height: 20px;
}
</style>
```

:::

## 重置与轨迹

通过 `ref` 获取组件实例，可调用 `reset()` 方法重置滑块，或读取 `tracks` 获取滑动轨迹数据。

### 在线演示

<br/>

<SliderCaptchaDemoReset />

### 示例代码

::: details 点击展开代码

```vue
<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { SliderCaptcha } from "@punish/slider-captcha";
import type { SliderCaptchaTrackItem } from "@punish/slider-captcha";

interface CaptchaInfo {
    backgroundImage: string;
    captchaId: string;
    sliderImage: string;
}

const captchaData = ref<CaptchaInfo | null>(null);
const captchaVerifying = ref(false);
const captchaRef = useTemplateRef("captchaRef");
const verifyResult = ref<string>("");

onMounted(() => {
    fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/captcha")
        .then((response) => response.json())
        .then((response) => (captchaData.value = response?.data));
});

const handleVerify = async (option: SliderCaptchaTrackItem) => {
    captchaVerifying.value = true;
    return fetch("https://mock.presstime.cn/mock/69d8c8165c2cd2d31df6900c/api/verify")
        .then((response) => response.json())
        .then((response) => response?.data?.passed)
        .finally(() => (captchaVerifying.value = false));
};

const onSuccess = () => {
    verifyResult.value = "验证成功 ✅";
};

const onFail = () => {
    verifyResult.value = "验证失败 ❌";
};

const onChange = () => {
    verifyResult.value = "";
};

const handleReset = () => {
    captchaRef.value?.reset();
    verifyResult.value = "已重置";
};
</script>

<template>
    <div class="demo-reset">
        <template v-if="captchaData">
            <div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto">
                <SliderCaptcha
                    ref="captchaRef"
                    :background="captchaData.backgroundImage"
                    :block="captchaData.sliderImage"
                    :verify="handleVerify"
                    track-bg="#65CD81"
                    track-thumb-class="track-thumb"
                    track-class="track"
                    @success="onSuccess"
                    @fail="onFail"
                    @change="onChange"
                >
                    <template #default>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </template>
                </SliderCaptcha>
                <div v-if="captchaVerifying" class="loading-mask">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </template>
        <div class="demo-actions">
            <button class="reset-btn" @click="handleReset">重置验证</button>
        </div>
        <p class="demo-tip">{{ verifyResult || (captchaData ? "点击按钮可重置滑块状态" : "加载中...") }}</p>
    </div>
</template>

<style scoped>
.demo-reset {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px 16px;
    background: #fafafa;
}
:deep(.track) {
    border: 1px solid #eaeaea;
    height: 48px;
    background-color: #f8f8f8;
}
:deep(.track-thumb) {
    width: 60px !important;
    background-color: white;
}
.loading-mask {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    z-index: 20;
}
.loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #e2e8f0;
    border-top-color: #65cd81;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.demo-actions {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}
.reset-btn {
    padding: 8px 20px;
    border: 1px solid #d0d5dd;
    border-radius: 6px;
    background: #fff;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
}
.reset-btn:hover {
    background: #f5f5f5;
}
.demo-tip {
    text-align: center;
    margin-top: 12px;
    color: #666;
    font-size: 14px;
    min-height: 20px;
}
</style>
```

:::

## Props

| 参数              | 说明                                                               | 类型                                                              | 默认值               |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | -------------------- |
| `background`      | 背景图片地址（必填）                                               | `string`                                                          | —                    |
| `block`           | 滑块图片地址（必填）                                               | `string`                                                          | —                    |
| `width`           | 容器宽度（px）                                                     | `number`                                                          | —                    |
| `blockTop`        | 滑块图距离顶部的距离（像素，基于原始图片尺寸）                     | `number`                                                          | `0`                  |
| `verify`          | 验证函数，接收最后一个轨迹点，返回 `boolean` 或 `Promise<boolean>` | `(option: SliderCaptchaTrackItem) => boolean \| Promise<boolean>` | —                    |
| `trackBlockBg`    | 滑块轨道背景色                                                     | `string`                                                          | `#f5f5f5`            |
| `trackBg`         | 滑块已滑动区域的背景色                                             | `string`                                                          | `rgba(26,23,27,0.1)` |
| `trackClass`      | 滑块轨道自定义类名                                                 | `string`                                                          | `""`                 |
| `trackThumbClass` | 滑块按钮自定义类名                                                 | `string`                                                          | `""`                 |

## Events

| 事件名    | 说明               | 回调参数                   |
| --------- | ------------------ | -------------------------- |
| `success` | 验证成功时触发     | —                          |
| `fail`    | 验证失败时触发     | —                          |
| `change`  | 滑动过程中实时触发 | `SliderCaptchaTrackItem[]` |

## 插槽

| 插槽名           | 说明                                   |
| ---------------- | -------------------------------------- |
| `default`        | 自定义滑块按钮内容（默认显示箭头图标） |
| `verify-success` | 验证成功时的提示内容                   |
| `verify-fail`    | 验证失败时的提示内容                   |

## 方法

通过 `ref` 获取组件实例后，可调用以下方法：

| 方法名   | 说明                           | 类型                       |
| -------- | ------------------------------ | -------------------------- |
| `reset`  | 重置滑块状态                   | `() => void`               |
| `tracks` | 获取当前滑动轨迹数据（响应式） | `SliderCaptchaTrackItem[]` |
