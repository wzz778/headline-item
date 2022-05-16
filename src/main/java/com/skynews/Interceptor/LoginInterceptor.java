package com.skynews.Interceptor;//package com.skynews.Interceptor;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//public class LoginInterceptor implements HandlerInterceptor {
//    @Override
//    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
//        // 获取请求的URL
//        String url = request.getRequestURI();
//        if(url.indexOf("login.html")>=0){
//            return true;
//        }
//        // 获取Session
//        HttpSession session = request.getSession();
//        String userName = (String) session.getAttribute("user1");
//        // 判断Session中是否有用户数据，如果有，则返回true,继续向下执行
//        if(userName != null){
//            return true;
//        }
//        // 不符合条件的给出提示信息，并转发到登录页面
//        request.setAttribute("msg", "您还没有登录，请先登录！");
//        request.getRequestDispatcher("/login.html").forward(request, response);
//        return false;
//    }
//    @Override
//    public void postHandle(HttpServletRequest request,
//                           HttpServletResponse response, Object handler,
//                           ModelAndView modelAndView) throws Exception {
//    }
//    @Override
//    public void afterCompletion(HttpServletRequest request,
//                                HttpServletResponse response, Object handler, Exception ex)
//            throws Exception {
//    }
//}
