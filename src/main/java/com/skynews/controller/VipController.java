package com.skynews.controller;


import com.skynews.pojo.Posts;
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

import java.util.List;

@Api(tags="VIP类")
@Controller
@CrossOrigin
@RequestMapping("/vip")
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
    public Response addVIP(Integer userID, String times) {
//        if (StringUtils.isEmpty(times)){
//            throw new CustomException("类型不能为空");
//        }
//        if (StringUtils.startsWith(times," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if (userID == null){
//            throw new CustomException("类型为空！");
//        }
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
    public Response deleteVip(Integer userID)  {
//        if(userID==null){
//            throw new CustomException("类型为空！");
//        }
        vipService.deleteVip(userID);
        return Response.ok("删除成功！");
    }

    @ApiOperation(value = "全局搜索图片库+用户+帖子+模糊查询", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllVague")
    @ResponseBody
    public Response list2(String thing) {
//        if (StringUtils.isEmpty(thing) ){
//            throw new CustomException("类型不能为空");
//        }
//        if (StringUtils.startsWith(thing," ")){
//            throw new CustomException("类型不能有空位");
//        }
        return Response.ok(vipService.overAllPicture(thing));
    }

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    @ApiOperation(value = "判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/judgeVipIs")
    @ResponseBody
    public Response judgeVipI(Integer userID) {
//        if(userID==null){
//            throw new CustomException("类型为空！");
//        }
        int vip=vipService.judgeVip(userID);
        if(vip==1){
            return Response.ok("此用户为vip用户！");
        }
        else{
            return Response.error("此用户不是vip用户！");
        }
    }

    /************************************************/
    @ApiOperation(value = "test", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/testSQL")
    @ResponseBody
    public Vip judgeVipI(int userID,String times){
       return vipService.test(userID,times);
    }

//    //返回除了status为-2的文章的个数
//    int queryStatusNoTwo();
//
//    //返回status为1的文章（n条）
//    List<Posts> queryStatusOneN(int count);

    @ApiOperation(value = "返回除了status为-2的文章的个数", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryStatusNoTwo")
    @ResponseBody
    public int queryStatusNoTwo(){
        return vipService.queryStatusNoTwo();
    }

    @ApiOperation(value = "返回status为1的文章（n条）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryStatusOneN")
    @ResponseBody
    public List<Posts> queryStatusOneN(int count) {
        return vipService.queryStatusOneN(count);
    }
}
