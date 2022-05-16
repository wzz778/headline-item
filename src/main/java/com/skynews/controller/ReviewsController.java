package com.skynews.controller;

import com.skynews.exception.CustomException;
import com.skynews.pojo.Comment;
import com.skynews.pojo.Reviews;
import com.skynews.service.CommentService;
import com.skynews.service.ReviewsService;
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

@Api(tags="子评论类")

@RequestMapping("/reviews")
@RestController
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @ApiOperation(value = "查看某一条父评论下的所有子评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllReviews")
    @ResponseBody
    @ApiImplicitParam(name="commentID",value = "父评论id")
    public List<Reviews> queryReviewsIs(Integer commentID) throws CustomException {
        if(commentID==null){
            throw new CustomException("类型为空！");
        }
        List<Reviews>list=reviewsService.queryAllReviews(commentID);
        return list;
    }

    @ApiOperation(value = "添加子评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addReviews")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="commentID",value = "父评论id"),
            @ApiImplicitParam(name="userID",value = "评论人ID"),
            @ApiImplicitParam(name="contain",value = "评论内容"),
    })
    public Response addReviews(Integer commentID, Integer userID,String contain) throws CustomException {
        if (StringUtils.isEmpty(contain)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(contain," ")){
            throw new CustomException("类型不能有空位");
        }
        if(commentID==null||userID==null){
            throw new CustomException("类型为空！");
        }
        Reviews reviews=new Reviews(commentID,userID,contain);
        reviewsService.addReviews(reviews);
        return Response.ok("评论成功！");
    }

    @ApiOperation(value = "删除子评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteReviews")
    @ResponseBody
    @ApiImplicitParam(name="reviewsID",value = "子评论ID")
    public Response deleteReviews(Integer reviewsID) throws CustomException {
        if(reviewsID==null){
            throw new CustomException("类型为空！");
        }
        reviewsService.deleteReviews(reviewsID);
        return Response.ok("删除成功！");
    }

}
