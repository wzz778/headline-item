package com.skynews.service;

import com.skynews.dao.UserMapper;
import com.skynews.pojo.*;
import com.skynews.utils.PageUtils;
import com.skynews.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
@Service
public class UserServiceImpl implements UserService {
    //service调dao层：组合Dao
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PostsService postsService;

    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void mail(String mail, String code) {
        userMapper.mail(mail, code);
    }

    @Override
    public int register(User user) {
        String account = user.getAccount();
        //根据账号查询用户
        User user1 = userMapper.getUser(account);
        if(user1!=null){
            return 0;
        }else{
            account= String.valueOf(new Random().nextInt(899999) + 1000000);
            user.setAccount(account);
            userMapper.register(user);
            return 1;
        }
    }
    @Override
    public User login(String account, String password) {
        User user = null;
        User temp = userMapper.getUser(account);
        if (temp != null) {
            if (temp.getPassword().equals(password)) {
                user = temp;
            }
        }
        return user;
    }
    @Override
    public User getPassword(String username) {
        return userMapper.getPassword(username);
    }
    @Override
    public User getUser(String account) {
        return userMapper.getUser(account);
    }
    @Override
    public int changePassword(User user) {
        return userMapper.changePassword(user);
    }

    @Override
    public int addUser(User user) {
        return userMapper.addUser(user);
    }

    @Override
    public int deleteUserById(int userID) {
        List<Posts> posts1 = userMapper.queryPostsID(userID);
        for(int i=0;i<posts1.size();i++){
            Posts posts=posts1.get(i);
            userMapper.deleteCollectionByPostsID(posts.getPostsID());
        }
        userMapper.deleteCollectionByUser(userID);
        userMapper.deletePostsByUser(userID);
        userMapper.deleteFans(userID);
        userMapper.deleteFocus(userID);

        return userMapper.deleteUserById(userID);
    }

    @Override
    public int updateUser(User user) {
//         return userMapper.updateUser(user);
        String account=user.getAccount();
//        根据账号查询用户
        User user1 = userMapper.getUser(account);
        if(user1!=null){
            userMapper.updateUser(user);
            return 1;
        }else{
            return 0;
        }
    }
    @Override
    public User queryUserById(int userID) {
        return userMapper.queryUserById(userID);
    }
    @Override
    public List<User> queryAllUser() {
        return userMapper.queryAllUser();
    }
    @Override
    public int saveUserProfile(User user) {
        return userMapper.saveUserProfile(user);
    }

    @Override
    public List<User> vagueQueryUsername(String thing) {
        return userMapper.vagueQueryUsername(thing);
    }

    @Override
    public List<User> savePages(int column, int total) {
        return userMapper.savePages(column,total);
    }

    @Override
    public List<User> vagueSavePages(String thing, int column, int total) {
        return userMapper.vagueSavePages(thing,column,total);
    }

    @Override
    public String upload(MultipartFile file) {
        return null;
    }

    @Override
    public User queryUserById() {

        return null;
    }

    @Override
    public List<Posts> allAuditing(int reside) {
        return userMapper.allAuditing(reside);
    }

    @Override
    public List<Posts> allPass(int reside) {
        return userMapper.allPass(reside);
    }

    @Override
    public Response allAuditingPicture(String account) {
        List<Picture> pictures = userMapper.allAuditingPicture(account);
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures); 
    }

    @Override
    public Response allPassPicture(String account) {
        List<Picture> pictures = userMapper.allPassPicture(account);
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response disDrafts(int reside,int status,int start) {
        List<Posts> postsList = userMapper.disDrafts(reside, status, start);
        if(postsList==null){
            return Response.error("不存在");
        }
        return Response.ok(postsList);
    }

    @Override
    public int allCountPosts(int reside) {
        return userMapper.allCountPosts(reside);
    }

    @Override
    public List<Collections> saveCollections(int userID, int column) {
        return userMapper.saveCollections(userID,column);
    }

    @Override
    public List<Posts> trends(int reside, int status,int start,int count) {
        return userMapper.trends(reside,status,start,count);
    }

    @Override
    public List<Posts> drafts(int reside) {
        return userMapper.drafts(reside);
    }

    @Override
    public int upDrafts(int reside) {
        return userMapper.upDrafts(reside);
    }

    @Override
    public Posts queryPostsById(int postsID) {
        return userMapper.queryPostsById(postsID);
    }

    @Override
    public Response savePosts(int reside, int column) {
        List<Posts> postsList = userMapper.savePosts(reside, column);
        if(postsList==null){
            return Response.error("不存在");
        }
        return Response.ok(postsList);
    }
}

