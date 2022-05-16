package com.skynews.service;

import cn.hutool.json.JSONUtil;
import com.skynews.dao.UserMapper;
import com.skynews.dao.VipMapper;
import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VipServiceImpl implements VipService{
    //service调dao层：组合Dao
    @Autowired
    private VipMapper vipMapper;
    public void setVipMapper(VipMapper vipMapper) {
        this.vipMapper = vipMapper;
    }


    @Override
    public int addVip(Vip vip) {
        System.out.println(vip);
        return vipMapper.addVip(vip);
    }

    @Override
    public List<Vip> queryAllVip() {
        return vipMapper.queryAllVip();
    }

    @Override
    public int deleteVip(int userID) {
        return vipMapper.deleteVip(userID);
    }

    @Override
    public List<Posts> overAllPosts(String thing, int num) {
        return vipMapper.overAllPosts(thing,num);
    }

    @Override
    public List<User> overAllUser(String thing, int num) {
        return vipMapper.overAllUser(thing,num);
    }

    @Override
    public List<Picture> overAllPicture(String thing, int num) {
        return vipMapper.overAllPicture(thing,num);
    }

    @Override
    public int judgeVip(int userID) {
        Vip vip=vipMapper.judgeVip(userID);
 //       System.out.println("1111111"+vip);
        if(vip!=null){
            return 1;
        }else{
            return 0;
        }
    }
}
