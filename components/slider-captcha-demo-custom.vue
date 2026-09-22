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
