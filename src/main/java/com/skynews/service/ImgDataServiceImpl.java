package com.skynews.service;
import com.skynews.dao.ImgDataMapper;
import com.skynews.pojo.Picture;
import com.skynews.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImgDataServiceImpl implements ImgDataService {
    @Autowired
    private ImgDataMapper imgDataMapper;
    @Override
    public int ImgDates(Picture img) {
        return imgDataMapper.ImgDates(img);
    }

    @Override
    public Picture getImg(String account) {
        return imgDataMapper.getImg(account);
    }

    @Override
    public Response vagueQueryPicture(String thing) {
        List<Picture> pictures = imgDataMapper.vagueQueryPicture(thing);
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response saveImgPages(int column, int total) {
        List<Picture> pictures = imgDataMapper.saveImgPages(column, total);
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response vagueSaveImgPages(String thing, int column, int total) {
        List<Picture> pictures = imgDataMapper.vagueSaveImgPages(thing, column, total);
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response downPicture() {
        List<Picture> pictures = imgDataMapper.downPicture();
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response passPicture() {
        List<Picture> pictures = imgDataMapper.passPicture();
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response auditPicture(int postsID) {
        imgDataMapper.auditPicture(postsID);
         return Response.ok("审核通过");
    }
    @Override
    public Response allPicture() {
        List<Picture> pictures = imgDataMapper.allPicture();
        if(pictures==null){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }
}
