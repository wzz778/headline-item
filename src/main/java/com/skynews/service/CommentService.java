package com.skynews.service;

import com.skynews.pojo.Comment;

import java.util.List;

public interface CommentService {
    //发布评论
    int addComment(Comment comment);

    //展示某个帖子下所有评论
    List<Comment> queryCommentByPosts(int postsID);

    //根据评论id删除评论
    int deleteCommentById(int commentID);

    //返回某帖子评论个数
    int queryCommentCount(int postsID);
}
