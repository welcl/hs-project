<template>
  <div class="loginPage">
      <el-card class="loginPanel">
          <div class="loginPanelInner">
              <div class="logo">
                  <!-- <img src="../../assets/images/logo.png"> -->
              </div>
              <el-divider direction="vertical" border-style="dashed" class="split" />
              <div class="loginForm">
                  <div class="systemName"> User Login </div>
                  <el-form ref="formRef" size="large" :model="loginForm" status-icon :rules="rules"
                      label-width="120px" class="form">
                      <el-form-item label="account：" prop="account">
                          <el-input v-model="loginForm.account"  autocomplete="off"
                              suffix-icon="UserFilled" />
                      </el-form-item>
                      <el-form-item label="password：" prop="password">
                          <el-input v-model="loginForm.password"  type="password"
                              autocomplete="off" suffix-icon="Lock" />
                      </el-form-item>
                      <!-- <el-form-item label="captcha：" prop="captcha">
                          <div style="display: flex;width: 100%;">
                              <div style="flex:1">
                                  <el-input v-model.number="loginForm.captcha" />
                              </div>
                              <div class="captchaSrc">
                                  <img :src="captchaSrc" @click="changecaptchaSrc">
                              </div>
                          </div>
                      </el-form-item> -->
                      <!-- <div class="registerBtn">
                          <el-link type="primary" href="/register" :underline="false">
                              去账户？点击注册 </el-link>
                      </div> -->
                      <el-form-item>
                          <el-button type="primary" @click="submitForm(formRef)" class="loginBtn">
                              Login </el-button>
                      </el-form-item>
                  </el-form>
              </div>
          </div>
      </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
} from 'vue';

import type {
  AxiosError,
  AxiosResponse,
} from 'axios';
import type {
  FormInstance,
  FormRules,
} from 'element-plus';
import {
  ElLoading,
  ElMessage,
} from 'element-plus';
import { useRouter } from 'vue-router';
import { authInfo, LoginValid } from '@/utils/auth';

// import { useLoginStore } from '@/stores/login';
// import api from '@/utils/api';

//登陆状态存储
// const loginStore = useLoginStore();
//路由状态
const router = useRouter();

/**
 * 1.写登陆的界面组件实现
 * 
 * 2.界面逻辑实现
 * 
 * 3.登陆状态检测
 * 
 */
//登陆表单数据
const loginForm = reactive({
    account: '',
    password: '',
    captcha: ''
})
//校验规则
const rules = reactive<FormRules<typeof loginForm>>({
    account: [{ required: true, message: 'Please Enter Account', trigger: 'blur' }],
    password: [{
        required: true,
        validator: (rule: any, value: any, callback: any) => {
            if (value === '') {
                callback(new Error('Password Not Empty'))
            } else if (loginForm.password.length < 6) {
                callback(new Error("Please Enter Password"))
            } else {
                callback()
            }
        }, trigger: 'blur'
    }],
    // captcha: [{ required: true, message: 'Please Enter The Verification Code', trigger: 'blur' }],
})
//form表单的实例
const formRef = ref<FormInstance>()
/**
 * 提交
 */
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((isValid: boolean) => {
        if (!isValid) {
            return;
        }
        //显示加载动画
        const loading = ElLoading.service({
            lock: true,
            text: 'Loging...',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        setTimeout(()=>{
            if( authInfo.account.includes(loginForm.account) &&  authInfo.password.includes(loginForm.password)){
                localStorage.setItem('hs-account', JSON.stringify(loginForm.account));
                localStorage.setItem('hs-password', JSON.stringify(loginForm.password));
                router.push('/report/assumptions-updates-scenarios');
            }else{
                ElMessage.error('Incorrect Account Or Password')
            }
            loading.close();
        },2000)
       
    })
}
// 验证码路径
const captchaSrc = ref('/api/login/captcha');
/**
 * 刷新验证码
 */
const changecaptchaSrc = () => {
    captchaSrc.value = '/api/login/captcha?t_=' + new Date().getTime();
}
</script>

<style scoped>
.loginPage {
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    background: linear-gradient(133deg, #1994bb, #19acbb, #19b4bb, #2a89db);
}

.loginPage .loginPanel {
    width: 60%;
    height: 60%;
    min-width: 600px;
    max-width: 1000px;
    min-height: 400px;
    max-height: 500px;
    margin: 0 auto;
}

.loginPage .loginPanel>>>.el-card__body {
    width: 100%;
    height: 100%;
}

.loginPage .loginPanel .loginPanelInner {
    width: 100%;
    height: 100%;
    display: flex;
}

.loginPage .loginPanel .loginPanelInner .logo {
    width: 40%;
    text-align: center;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    background-image: url(@/assets/login_picture.svg);
    background-repeat: no-repeat;
    background-position: center 60px;
    background-size:contain;
   
  
}

.loginPage .loginPanel .loginPanelInner .logo img {
    width: 50%;
}

.loginPage .loginPanel .loginPanelInner .split {
    height: calc(100% - 40px);
}

.loginPage .loginPanel .loginPanelInner .loginForm {
    flex: 1;
}

.loginPage .loginPanel .loginPanelInner .loginForm .systemName {
    text-align: center;
    font-size: 30px;
    line-height: 60px;
    letter-spacing: 3px;
    margin-bottom: 20px;
}

.loginPage .loginPanel .loginPanelInner .loginForm .form {
    width: 80%
}

.loginPage .loginPanel .loginPanelInner .loginForm .form .loginBtn {
    width: 100%;
}

.loginPage .loginPanel .loginPanelInner .loginForm .form .captchaSrc {
    width: 100px;
    height: 100%;
    padding-left: 10px;
}

.loginPage .loginPanel .loginPanelInner .loginForm .form .captchaSrc img {
    width: 100px;
    height: 100%;
    cursor: pointer;
}

.loginPage .loginPanel .loginPanelInner .loginForm .form .registerBtn {
    text-align: right;
    line-height: 40px;
    margin-bottom: 5px;
}

.footer {
    position: fixed;
    bottom: 0px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
}
</style>