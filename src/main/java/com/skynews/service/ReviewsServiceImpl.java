package com.skynews.service;

import com.skynews.dao.CommentMapper;
import com.skynews.dao.ReviewsMapper;
import com.skynews.pojo.Reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewsServiceImpl implements ReviewsService{

    //service层调dao层：组合dao
    @Autowired
    private ReviewsMapper reviewsMapper;
    public void setReviewsMapper(ReviewsMapper reviewsMapper){
        this.reviewsMapper=reviewsMapper;
    }



    @Override
    public List<Reviews> queryAllReviews(int commentID) {
        return reviewsMapper.queryAllReviews(commentID);
    }

    @Override
    public int addReviews(Reviews reviews) {
        return reviewsMapper.addReviews(reviews);
    }

    @Override
    public int deleteReviews(int reviewsID) {
        return reviewsMapper.deleteReviews(reviewsID);
    }
}
