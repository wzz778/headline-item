package com.skynews.dao;

import com.skynews.pojo.Reviews;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface ReviewsMapper {

    //查看某一条父评论下的所有子评论
    List<Reviews> queryAllReviews(int commentID);

    //添加子评论
    int addReviews(Reviews reviews);

    //删除子评论
    int deleteReviews(int reviewsID);
}
