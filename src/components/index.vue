<template >

        <div>
          <div>这个是index  modele</div>
          <section class="aui-content">
        <form id="user_form" name="user_form">
        <ul class="aui-list aui-form-list">
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        用户名
                    </div>
                    <div class="aui-list-item-input">
                        <input name="username" id="username" type="text" placeholder="请输入用户名">
                    </div>
                </div>
            </li>
			<li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
                        密 码
                    </div>
                    <div class="aui-list-item-input">
                        <input name="password" id="password" type="password" placeholder="请输入密码">
                    </div>
                </div>
            </li>
			<li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">
						记住密码
                    </div>
                    <div class="aui-list-item-input">
                        <input name="remember" type="checkbox" class="aui-switch" value="1">
                    </div>
                </div>
            </li>
           
            <li class="aui-list-item">
                <div class="aui-list-item-inner aui-list-item-center aui-list-item-btn">
                    <div id="submitbtn" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">登 录</div>
                </div>
            </li>
        </ul>
		</form>
    </section>
        </div>
</template>
<script>

import axios from 'axios'
export default {
       data() {
               return {
                       
               }
       }, 
       mounted() {
           axios('')    
       },

}
</script>
<style >
        
</style>