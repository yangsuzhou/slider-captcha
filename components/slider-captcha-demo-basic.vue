<script setup lang="ts">
import { Loading } from "@a-drowned-fish/rox-v";
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
    fetch("https://ex.roxmotor.top/api/mock/captcha")
        .then((response) => response.json())
        .then((response) => (captchaData.value = response?.data));
});

const handleVerify = async (option: SliderCaptchaTrackItem) => {
    captchaVerifying.value = true;
    return fetch("https://ex.roxmotor.top/api/mock/verify-captcha")
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
                <Loading :visible="captchaVerifying" dot-color="red" dot-size="60px" dot-gap="60px" amplitude="80px" />
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
.demo-tip {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;
    min-height: 20px;
}
</style>
