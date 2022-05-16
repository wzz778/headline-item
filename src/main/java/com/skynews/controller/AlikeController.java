package com.skynews.controller;

import com.skynews.exception.CustomException;
import com.skynews.pojo.Alike;
import com.skynews.pojo.Collections;
import com.skynews.pojo.Messages;
import com.skynews.pojo.User;
import com.skynews.service.AlikeService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.List;

@Api(tags="点赞类")

@RequestMapping("/alike")
@RestController
public class AlikeController {
    @Autowired
    private AlikeService alikeService;

    @ApiOperation(value = "用户点赞", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/setAlike")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "被点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response setAlike(Integer postsID, Integer userID) throws CustomException {
        if (postsID == null || userID == null) {
            throw new CustomException("类型为空！");
        }
        Alike alike = new Alike(postsID, userID);
        alikeService.setAlikeTable(alike);
        return Response.ok("点赞成功！");
    }

    @ApiOperation(value = "用户取消点赞", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteAlike")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "被点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response deleteAlike(Integer postsID, Integer userID) throws CustomException {
        if (postsID == null || userID == null) {
            throw new CustomException("类型为空！");
        }
        Alike alike = new Alike(postsID, userID);
        int a = alikeService.deleteAlikeTable(alike);
        if (a == 1) {
            return Response.ok("取消点赞成功！");
        } else {
            return Response.error("取消点赞失败！该用户未给此帖点过赞！");
        }
    }

    @ApiOperation(value = "判断该用户是否已经点赞过此帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAlikeBoolean")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "所点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response queryAlikeBoolean(Integer postsID, Integer userID) throws CustomException {
        if (postsID == null || userID == null) {
            throw new CustomException("类型为空！");
        }
        Alike alike = new Alike(postsID, userID);
        int a = alikeService.queryAlike(alike);
        if (a == 1) {
            return Response.error("该帖已被此用户点赞过！");
        } else {
            return Response.ok("该帖未被此用户点赞过！");
        }
    }

    @ApiOperation(value = "当用户查看此信息之后此信息状态改变", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateMessagesStatus")
    @ResponseBody
    @ApiImplicitParam(name = "messagesID", value = "信息id")
    public Response update1(Integer messagesID) throws CustomException {
        if (messagesID == null) {
            throw new CustomException("类型为空！");
        }
        alikeService.updateMessagesStatus(messagesID);
        return Response.ok("用户已查看此信息！");
    }

    @ApiOperation(value = "查询某个用户下的所有信息（被收藏或点赞）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllMessages")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorID", value = "所要查询的某个用户的id"),
    })
    public List<Messages> update5(Integer authorID) throws CustomException {
        if (authorID == null) {
            throw new CustomException("类型为空！");
        }
        return alikeService.queryAllMessages(authorID);
    }

    @ApiOperation(value = "查询某个用户下的所有信息（收藏或点赞自己的用户信息）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllMessagesUser")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userID", value = "所要查询的某个用户的id"),
    })
    public List<User> update2(Integer userID) throws CustomException {
        if (userID == null) {
            throw new CustomException("类型为空！");
        }
        return alikeService.queryAllMessagesUser(userID);
    }

    @ApiOperation(value = "删除某条信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteMessages")
    @ResponseBody
    @ApiImplicitParam(name = "messagesID", value = "信息id")
    public Response update3(Integer messagesID) throws CustomException {
        if (messagesID == null) {
            throw new CustomException("类型为空！");
        }
        alikeService.deleteMessages(messagesID);
        return Response.ok("删除成功！");
    }


    /*************************/

//    @ApiOperation(value = "huoqu信息", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/queryIDMessages")
//    @ResponseBody
//    public Messages query(String reside, int userID, int postsID) throws CustomException {
//        return alikeService.queryMessagesID(reside, userID, postsID);
//    }
}
