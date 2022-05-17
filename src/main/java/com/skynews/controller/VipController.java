package com.skynews.controller;

import com.skynews.exception.CustomException;
//import com.skynews.exception.CustomExceptionResolver;
import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import com.skynews.service.VipService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Objects;

@Api(tags="VIP类")

@RequestMapping("/vip")
@RestController
public class VipController {
    @Autowired
    private VipService vipService;

    @ApiOperation(value = "成为VIP", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addVIP")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="userID",value = "用户id"),
            @ApiImplicitParam(name="times",value = "用户成为VIP时间")
    })
    public Response addVIP(Integer userID, String times) throws CustomException {
        if (StringUtils.isEmpty(times)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(times," ")){
            throw new CustomException("类型不能有空位");
        }
        if (userID == null){
            throw new CustomException("类型为空！");
        }
        System.out.println(userID+"     "+times);
        Vip vip=new Vip(userID,times);
        vipService.addVip(vip);
        return Response.ok("恭喜您成为VIP！");
    }

    @ApiOperation(value = "查询所有的VIP用户", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryAllVip")
    @ResponseBody
    public List<Vip> list(){
        return vipService.queryAllVip();
    }

    @ApiOperation(value = "注销Vip账户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteVip")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户ID")
    public Response deleteVip(Integer userID) throws CustomException {
        if(userID==null){
            throw new CustomException("类型为空！");
        }
        vipService.deleteVip(userID);
        return Response.ok("删除成功！");
    }

//    @ApiOperation(value = "全局搜索图片库+用户+帖子+模糊查询+分页", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/overAllPage")
//    @ResponseBody
//    public ModelAndView overAll(String thing, int num){
//        List<Posts>list=vipService.overAllPosts(thing,num);
//        List<User>list1=vipService.overAllUser(thing,num);
//        List<Picture>list2=vipService.overAllPicture(thing,num);
//        ModelAndView modelAndView=new ModelAndView();
//        modelAndView.addObject(list);
//        modelAndView.addObject(list1);
//        modelAndView.addObject(list2);
//        return modelAndView;
//    }

    @ApiOperation(value = "全局搜索帖子+模糊查询+分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllPosts")
    @ResponseBody
    public List<Posts> list(String thing, Integer num) throws CustomException {
        if (StringUtils.isEmpty(thing) ){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("类型不能有空位");
        }
        if(num==null){
            throw new CustomException("类型为空！");
        }
        return vipService.overAllPosts(thing,num);
    }

    @ApiOperation(value = "全局搜索用户+模糊查询+分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllUser")
    @ResponseBody
    public List<User> list1(String thing, Integer num) throws CustomException {
        if (StringUtils.isEmpty(thing) ){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("类型不能有空位");
        }
        if(num==null){
            throw new CustomException("类型为空！");
        }
        return vipService.overAllUser(thing,num);
    }

    @ApiOperation(value = "全局搜索图片库+模糊查询+分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllPicture")
    @ResponseBody
    public List<Picture> list2(String thing, Integer num) throws CustomException {
        if (StringUtils.isEmpty(thing) ){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("类型不能有空位");
        }
        if(num==null){
            throw new CustomException("类型为空！");
        }
        return vipService.overAllPicture(thing,num);
    }

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    @ApiOperation(value = "判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/judgeVipIs")
    @ResponseBody
    public Response judgeVipI(Integer userID) throws CustomException {
        if(userID==null){
            throw new CustomException("类型为空！");
        }
        int vip=vipService.judgeVip(userID);
//        System.out.println("我是controller层\t"+vip);
        if(vip==1){
            return Response.ok("此用户为vip用户！");
        }
        else{
            return Response.error("此用户不是vip用户！");
        }
    }
}
