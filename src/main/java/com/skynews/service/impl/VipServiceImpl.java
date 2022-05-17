package com.skynews.service.impl;

import com.skynews.dao.VipMapper;
import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import com.skynews.service.VipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VipServiceImpl implements VipService {
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
    public Map<String, List> overAllPicture(String thing) {
        List<Posts>posts=vipMapper.overAllPosts(thing);
        List<User>users=vipMapper.overAllUser(thing);
        List<Picture>pictures=vipMapper.overAllPicture(thing);
        Map<String,List>map=new HashMap<>();
        map.put("posts",posts);
        map.put("user",users);
        map.put("pictures",pictures);
        return map;
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

    @Override
    public Vip test(int userID, String times) {
        return vipMapper.test(userID,times);
    }
}
