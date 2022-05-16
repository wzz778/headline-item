package com.skynews.service;

import com.skynews.pojo.*;
import com.skynews.utils.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    //邮箱验证
    void mail(String mail,String code);
    //用户注册
    int register(User user);
    //    用户登录
    User login(String account,String password);
    //根据用户名得到该密码
    User getPassword(String username);
    //    根据账户得到用户消息
    User getUser(String account);
    //修改密码
    int changePassword(User user);
    //删除用户
    int deleteUserById(int userID);
    //修改用户
    int updateUser(User user);
    //头像上传
    int saveUserProfile(User user);
    //模糊查询用户个人
    List<User> vagueQueryUsername(String thing);
    //通过分页查询帖子
    List<User> savePages(@Param("column") int column, @Param("total") int total);
    //对模糊查询的数据进行分页
    List<User> vagueSavePages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
    //上传文件
    String upload(MultipartFile file);
    //添加用户
    int addUser(User user);
    //查询用户
    User queryUserById(int userID);
    //查询所有用户
    List<User> queryAllUser();
    User queryUserById();
    //    用户查询自己未审核通过的帖子
    List<Posts> allAuditing(int reside);
    //    用户查询自己审核通过的帖子
    List<Posts> allPass(int reside);
    //用户查询自己审核未通过的图片
   Response allAuditingPicture(String account);
    //用户查询自己审核通过的图片
    Response allPassPicture(String account);
    //    对用户发布的文章进行固定每页数量的分页
   Response disDrafts(int reside,int status,int start);
    //        <!--用户发布帖子总数-->
    int allCountPosts(int reside);
    //    对用户的收藏帖子的分页
    List<Collections> saveCollections(@Param("userID") int userID, @Param("column") int column);
    //    通过id和状态值查询相对应的帖子信息
    List<Posts> trends(int reside,int status,int start,int count);
    //    获取草稿箱的内容
    List<Posts> drafts(int reside);
    //用户对草稿箱内容进行发布
    int upDrafts(int reside);
    //    未通过审核的帖子，已通过审核的帖子，未审核的帖子
    Response savePosts(int reside,int column);
    //通过帖子id查询帖子
    Posts queryPostsById(int postsID);


}

