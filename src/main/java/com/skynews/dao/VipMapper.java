package com.skynews.dao;

import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface VipMapper {
    //成为vip
    int addVip(Vip vip);

    //展示所有的vip
    List<Vip> queryAllVip();

    //删除vip用户
    int deleteVip(int userID);

    //全局搜索帖子+模糊查询+分页
    List<Posts> overAllPosts(@Param("thing") String thing, @Param("num") int num);

    //全局搜索用户+模糊查询+分页
    List<User> overAllUser(@Param("thing") String thing, @Param("num") int num);

    //全局搜索图片库+模糊查询+分页
    List<Picture> overAllPicture(@Param("thing") String thing, @Param("num") int num);

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    Vip judgeVip(int userID);
}
