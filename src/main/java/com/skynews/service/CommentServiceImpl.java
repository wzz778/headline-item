package com.skynews.service;

import com.skynews.dao.CommentMapper;
import com.skynews.dao.ManagerMapper;
import com.skynews.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    //service层调dao层：组合dao
    @Autowired
    private CommentMapper commentMapper ;
    public void setCommentMapper(CommentMapper commentMapper){
        this.commentMapper=commentMapper;
    }

    @Override
    public int addComment(Comment comment) {
        return commentMapper.addComment(comment);
    }

    @Override
    public List<Comment> queryCommentByPosts(int postsID) {
        return commentMapper.queryCommentByPosts(postsID);
    }

    @Override
    public int deleteCommentById(int commentID) {
        return commentMapper.deleteCommentById(commentID);
    }

    @Override
    public int queryCommentCount(int postsID) {
        return commentMapper.queryCommentCount(postsID);
    }
}