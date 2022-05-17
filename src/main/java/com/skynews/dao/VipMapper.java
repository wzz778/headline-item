package com.skynews.dao;

import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VipMapper {
    //成为vip
    int addVip(Vip vip);

    //展示所有的vip
    List<Vip> queryAllVip();

    //删除vip用户
    int deleteVip(int userID);

    //全局搜索帖子+模糊查询
    List<Posts> overAllPosts(String thing);

    //全局搜索用户+模糊查询
    List<User> overAllUser(String thing);

    //全局搜索图片库+模糊查询
    List<Picture> overAllPicture(String thing);

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    Vip judgeVip(int userID);

    //test
    Vip test(@Param("userID")int userID,@Param("times")String times);
}
