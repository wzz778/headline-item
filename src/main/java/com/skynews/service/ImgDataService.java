package com.skynews.service;


import com.skynews.pojo.Picture;

import com.skynews.utils.Response;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ImgDataService {
    //上传图片库
    int ImgDates(Picture img);
    //    通过图片id获取图片库id
    Picture getImg(String account);
    //模糊查询图片库
    Response vagueQueryPicture(@Param("thing") String thing);
    //通过分页查询图片库
    Response saveImgPages(@Param("column") int column,@Param("total") int total);
    //对模糊查询的数据进行分页
    Response vagueSaveImgPages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
    //查询未审核的照片，也就是status为0的照片
    Response downPicture();
    //查询所有审核过的照片，也就是status为1的照片
    Response passPicture();
    //对照片进行审核
    Response auditPicture(int UserId);
    //    查询图片库所以图片
   Response allPicture();
}
