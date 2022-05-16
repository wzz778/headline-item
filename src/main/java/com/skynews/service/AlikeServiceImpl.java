package com.skynews.service;

import com.skynews.dao.AlikeMapper;
import com.skynews.dao.CollectionMapper;
import com.skynews.dao.PostsMapper;
import com.skynews.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class AlikeServiceImpl implements AlikeService{

    //service层调dao层：组合dao
    @Autowired
    private AlikeMapper alikeMapper ;
    public void setAlikeMapper(AlikeMapper alikeMapper){
        this.alikeMapper=alikeMapper;
    }

    @Autowired
    private PostsMapper postsMapper;
    public void setPostsMapper(PostsMapper postsMapper){
        this.postsMapper=postsMapper;
    }

    @Override
    public int setAlikeTable(Alike alike) {
        int postsID=alike.getPostsID();
        alikeMapper.setAlike(postsID);
        /******** messages *********/
        int userID=alike.getUserID();
        String reside="alike";
        Posts posts=postsMapper.queryPostsById(postsID);
        String postsName=posts.getPostsName();
        int authorID=posts.getReside();
        //使用Date创建日期对象
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm");
        System.out.println("格式化后的时间------->"+format.format(date));
        Messages messages=new Messages(reside,postsName,userID,authorID,format.format(date),postsID);
        alikeMapper.setMessages(messages);
        /******** messages *********/
        return alikeMapper.setAlikeTable(alike);
    }

    @Override
    public int deleteAlikeTable(Alike alike) {
        Alike alike1=alikeMapper.queryAlike(alike);
  //      System.out.println("1111111"+alike1);
        if(alike1!=null){
            int postsID=alike.getPostsID();
 //           System.out.println("32222222"+postsID);
            alikeMapper.deleteAlike(postsID);
            alikeMapper.deleteAlikeTable(alike);
            /******** messages *********/
            int userID=alike.getUserID();
//            System.out.println("11111111"+userID);
            String reside="alike";
            Messages messages=alikeMapper.queryMessagesID(reside,userID,postsID);
            int messagesID=messages.getMessagesID();
 //           System.out.println("2222222"+messagesID);
            alikeMapper.deleteMessages(messagesID);
            /******** messages *********/
            return 1;
        }else{
            return 0;
        }
    }



    @Override
    public int queryAlike(Alike alike) {
        Alike alike1=alikeMapper.queryAlike(alike);
        if(alike1!=null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int updateMessagesStatus(int messagesID) {
        return alikeMapper.updateMessagesStatus(messagesID);
    }

    @Override
    public List<Messages> queryAllMessages(int authorID) {
        return alikeMapper.queryAllMessages(authorID);
    }

    @Override
    public List<User> queryAllMessagesUser(int userID) {
        return alikeMapper.queryAllMessagesUser(userID);
    }

    @Override
    public int deleteMessages(int messagesID) {
        return alikeMapper.deleteMessages(messagesID);
    }

    @Override
    public Messages queryMessagesID(String reside, int userID, int postsID) {
        return alikeMapper.queryMessagesID(reside,userID,postsID);
    }
}
