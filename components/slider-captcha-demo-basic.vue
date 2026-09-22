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
