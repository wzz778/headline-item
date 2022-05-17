package com.skynews.service.impl;

import com.skynews.dao.FeedbackMapper;
import com.skynews.pojo.Feedback;
import com.skynews.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    //service层调dao层：组合dao
    @Autowired
    private FeedbackMapper feedbackMapper;
    public void setFeedbackMapper(FeedbackMapper feedbackMapper){
        this.feedbackMapper=feedbackMapper;
    }

    @Override
    public int addFeedback(Feedback feedback) {
        return feedbackMapper.addFeedback(feedback);
    }

    @Override
    public List<Feedback> queryAllFeedback(int column,int total) {
        return feedbackMapper.queryAllFeedback(column,total);
    }

    @Override
    public List<Feedback> queryUserFeedback(int userID) {
        return feedbackMapper.queryUserFeedback(userID);
    }

    @Override
    public int addManagerFeedback(String managerContent,int feedbackID) {
        feedbackMapper.updateManagerToToOne(feedbackID);
        feedbackMapper.updateManagerToOne(feedbackID);
        return feedbackMapper.addManagerFeedback(managerContent,feedbackID);
    }

    @Override
    public int updateUserToOne(int feedbackID) {
        return feedbackMapper.updateUserToOne(feedbackID);
    }

    @Override
    public int queryManagerToUser(int feedbackID) {
        List<Feedback>list=feedbackMapper.queryManagerToUser(feedbackID);
        //userOr为1则是用户已经查看过管理员回复，而sql语句是验证是否为1
        //如果集合为空则证明用户未查看管理员回复
        if(list.isEmpty()){
            return 0;
        }else{
            return 1;
        }
    }

    @Override
    public int queryFeedbackCount() {
        return feedbackMapper.queryFeedbackCount();
    }

    @Override
    public int deleteFeedback(int feedbackID) {
        return feedbackMapper.deleteFeedback(feedbackID);
    }

    @Override
    public List<Feedback> queryManagerOrFeedback() {
        return feedbackMapper.queryManagerOrFeedback();
    }
}
