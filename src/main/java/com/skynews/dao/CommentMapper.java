package com.skynews.dao;

import com.skynews.pojo.Collections;
import com.skynews.pojo.Comment;
import com.skynews.pojo.Posts;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface CommentMapper {

    //发布评论
    int addComment(Comment comment);

    //展示某个帖子下所有评论
    List<Comment> queryCommentByPosts(int postsID);

    //根据评论id删除评论
    int deleteCommentById(int commentID);

    //返回某帖子评论个数
    int queryCommentCount(int postsID);
}