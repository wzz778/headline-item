package com.skynews.controller;

import com.skynews.pojo.User;
import com.skynews.service.UserService;
import com.skynews.utils.Response;
import com.skynews.utils.SendMail;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@Api(tags = "用户类")
@Controller
@CrossOrigin
@RequestMapping("/user")
// @ComponentScan(basePackages = "com.skynews.controller")
public class userController {
    @Autowired
    private UserService userService;
    @Autowired
    private SendMail sendMail;

    @ApiOperation(value = "邮箱", notes = "邮箱验证", httpMethod = "post")
    @PostMapping("/getCode")
    @ResponseBody()
    @ApiImplicitParams({
            @ApiImplicitParam(name = "email", value = "邮箱", required = true, paramType = "String")
    })
    public Response mail(@RequestParam("targetEmail") String targetEmail) {
        //生成六位数验证码
        String authCode = String.valueOf(new Random().nextInt(899999) + 100000);
        sendMail.sendEmailCode(targetEmail, "你的验证码为" + authCode + "(五分钟内有效)");
        return Response.ok("成功", authCode);
    }

    //        头像
    @ApiOperation(value = "设置用户头像", notes = "设置当前用户头像", httpMethod = "POST")
    @PostMapping("/profiles")
    public Response setUserProfile(@RequestParam(required = true) MultipartFile profile) {
//            return userService.updUserProfile(profile);
        userService.updUserProfile(profile);
        return Response.ok("success");
    }

    //    注册
    @ApiOperation(value = "注册", notes = "获取注册", httpMethod = "POST")
    @PostMapping("/register")
    @ResponseBody
    public Response register(@RequestParam("username") String username,
                             @RequestParam("password") String password, String email, String captcha) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
//        userService.register(username,password);
        userService.register(user);
        return Response.ok("success");
//        if(username==""&&password==""){
//            return Response.ok("success");
//        }else{
//            return Response.error("error");
//        }
    }

    //登录验证
    @ApiOperation(value = "登录验证", notes = "获取登录", httpMethod = "POST")
    @PostMapping("/login")
    @ResponseBody
    public Response login(@RequestParam("username") String username,
                          @RequestParam("password") String password) {
        User user1 = userService.login(username, password);
        if (user1 != null) {
            return Response.ok(user1);
        } else {
            return Response.error("error");
        }
    }

}

    //修改密码
    @ApiOperation(value = "修改密码", notes = "修改密码", httpMethod = "POST")
    @PostMapping("/changePassword")
    @ResponseBody
    public Response changePassword(@RequestParam("username") String username,
                                   @RequestParam("password") String password,
                                   @RequestParam("newpassword") String newpassword, Model model) {
        if (password.equals(userService.getPassword(username))) {
            userService.changePassword(username, newpassword);
            return Response.ok("msg", "修改密码成功");
        } else {
            return Response.error("msg", "密码修改失败");
        }

    }

    //查询所有的页面，并且返回一个用户展示页面
    @ApiOperation(value = "查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("list")
    @ResponseBody
    public List<User> list(Model model) {
        List<User> list = userService.queryAllUser();
        return list;
    }

    //添加用户
    @ApiOperation(value = "添加用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addUser")
    @ResponseBody
    @GetMapping("/addUser")
    public Response addUser(User user) {
        userService.addUser(user);
        System.out.println(user);
        return Response.ok(user, "success");
    }

    //修改信息
    @ApiOperation(value = "修改用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateUser")
    @ResponseBody
    public Response updateUser(Model model, User user) {
        System.out.println(user);
        userService.updateUser(user);
        userService.queryUserById(user.getUserID());
//        model.addAttribute("user",user1);
        return Response.ok(user, "success");
    }

    //        注销用户
    @ApiOperation(value = "注销用户", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/del/{userID}")
    @ResponseBody
    public Response deleteUser(@PathVariable("userID") int userID, Model model) {
        userService.deleteUserById(userID);
        if (equals(userID)) {
            return Response.ok(userID, "删除成功");
//                return model.addAttribute("删除成功",true);
        }
//            return model.addAttribute("用户不存在",false);
        return Response.error("用户不存在");
    }

    //账号退出
    //前端点击账号退出按钮,跳转到controller层进行删除
    @ApiOperation(value = "退出登录", notes = "获取登录", httpMethod = "GET")
    @GetMapping("/loginout/{serID}")
    @RequestMapping(value = "/loginOut")
    public Response loginOut(HttpSession httpSession) {
        User user = (User) httpSession.getAttribute("NowUser");
        if (null != user) {
            httpSession.removeAttribute("NowUser");
        }
        return Response.ok("退出成功");
    }
}
