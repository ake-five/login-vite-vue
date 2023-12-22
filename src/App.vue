<script setup>
import { ref, reactive } from 'vue'
import logo from './assets/original_147d3d0c741c7b05026954fe8ad946c9.png'
import { ElNotification } from 'element-plus'
const form = ref({
  accout: '',
  pws: '',
  yzm: ''
})
const time = ref(2)
const disabled = ref(false)
const ruleFormRef = ref()
const timer = ref()
function setCookieWithDomain(name, value, daysToExpire, domain) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  var cookieString = name + "=" + value + "; expires=" + expirationDate.toUTCString() + "; path=/; domain=" + domain;
  console.log('====================================');
  console.log(cookieString);
  console.log('====================================');
  document.cookie = cookieString;
}
function SetCookie(name, value, expires, path, domain, secure) {
  document.cookie = name + "=" + encodeURI(value) +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
const searchLoaction = () => {
  const search = window.location.search.replace('?', '').split('&')
  return search.reduce((obj, item) => {

    const cloneObj = obj
    const [key, val] = item.split('=')
    cloneObj[key] = val
    console.info(cloneObj)
    return cloneObj
  }, {})
}

// 使用示例
// setCookieWithDomain("user", "John Doe", 7, ".example.com");
const onSubmit = async () => {
  console.log('submit!')
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      const { accout, pws } = form.value

      const { returnUrl = null, domain = 'ake-five.github.io' } = searchLoaction()
      SetCookie('ther', pws);
      if (returnUrl) window.location.href = returnUrl
    } else {
      console.log('error submit!', fields)
    }
  })
}
const setTime = () => {
  time.value = time.value - 1
  if (time.value === 0) {
    disabled.value = false
    time.value = 120
    clearInterval(timer.value)
  }
}

const clickyzm = () => {
  disabled.value = true
  timer.value = setInterval(setTime, 1000)


}
const rules = reactive({
  accout: [
    { required: true, message: 'Please input Activity accout', trigger: 'blur' },
  ],
  pws: [
    { required: true, message: 'Please input Activity pwd', trigger: 'blur' },
  ],
  yzm: [
    { required: true, message: 'Please input Activity yzm', trigger: 'blur' },
  ],
})
</script>

<template>
  <div class='container'>
    <div class='box'>
      <img :src="logo" alt="" class="img">
      <div class="form">
        <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="账号" prop='accout'>
            <el-input v-model="form.accout" />
          </el-form-item>
          <el-form-item label="密码" prop='pws'>
            <el-input type='password' v-model="form.pws" />
          </el-form-item>

          <el-form-item>
            <!-- <el-button @click="onClick">取消</el-button> -->
            <el-button type="primary" @click="onSubmit">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: rgba(0, 140, 255, 0.527);
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 800px;
  height: 400px;
  display: flex;
  background: #fff;
}
.img {
  height: 400px;
}
.flex {
  display: flex;
}
.form {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
