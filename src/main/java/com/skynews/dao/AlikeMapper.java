package com.skynews.dao;

import com.skynews.pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
@Mapper
public interface AlikeMapper {
    //用户点赞
    int setAlike(int postsID);

    //用户点赞（前端输入用户id，帖子id）
    int setAlikeTable(Alike alike);

    //用户取消赞
    int deleteAlike(int postsID);

    //用户取消赞(删除表中的点赞记录)
    int deleteAlikeTable(Alike alike);

    //判断该用户是否已经点赞过此帖子
    Alike queryAlike(Alike alike);

    //用户点赞（前端输入用户id，帖子id）之后在messages中增加一条数据表示此用户点赞的记录
    int setMessages(Messages messages);

    //当用户查看此信息之后此信息状态改变
    int updateMessagesStatus(int messagesID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<Messages> queryAllMessages(int authorID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<User> queryAllMessagesUser(int userID);

    //删除某条信息
    int deleteMessages(int messagesID);

    //reside=alike userID postsID
    Messages queryMessagesID(@Param("reside") String reside,@Param("userID") int userID,@Param("postsID") int postsID);
}
