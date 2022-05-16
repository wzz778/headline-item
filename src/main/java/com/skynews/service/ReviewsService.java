package com.skynews.service;

import com.skynews.pojo.Reviews;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ReviewsService {

    //查看某一条父评论下的所有子评论
    List<Reviews> queryAllReviews(int commentID);

    //添加子评论
    int addReviews(Reviews reviews);

    //删除子评论
    int deleteReviews(int reviewsID);
}
