//package com.skynews.config;
//
//import com.skynews.Interceptor.LoginInterceptor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//@Configuration //一定要加上这个注解，成为Springboot的配置类，不然不会生效
//public class WebMvcConfiguration implements WebMvcConfigurer {
//
//    @Override   //拦截器配置
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new LoginInterceptor()) //拦截器注册对象
//                .addPathPatterns("/**") //指定要拦截的请求
//                .excludePathPatterns("/user/login"); //排除请求
//
//    }
//}

