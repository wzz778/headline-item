package com.skynews.controller;


import com.skynews.exception.CustomException;
import com.skynews.pojo.Posts;
import com.skynews.service.PostsService;
import com.skynews.service.UserService;
import com.skynews.utils.PageUtils;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api(tags="帖子类")
@Controller
@CrossOrigin
@RequestMapping("/posts")
public class postsController {
    //controller调service层
    @Autowired
    private PostsService postsService;
    @Autowired
    private UserService userService;

    //查询所有的帖子，并且返回一个帖子展示页面
    @ApiOperation(value = "展示所有帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/allPosts")
    @ResponseBody
    public List<Posts>list(){
        List <Posts> list=postsService.queryAllPosts();
        return list;
    }

    //删除帖子
    @ApiOperation(value = "删除帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deletePosts")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response deletePosts(Integer postsID) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        postsService.deletePostsById(postsID);
        return Response.ok("删除成功！");
    }

    //对帖子进行审核
    @ApiOperation(value = "审核帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/auditingPosts")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response auditing(Integer postsID) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        postsService.auditing(postsID);
        return Response.ok("审核通过！");
    }
    //审核未通过的帖子
    @ApiOperation(value = "审核未通过的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/disAuditing")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response disAuditing(Integer postsID) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        postsService.disAuditing(postsID);
        return Response.ok("审核未通过！");
    }

    //根据用户id查询相对应的帖子
    @ApiOperation(value = "根据用户id查询相对应的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPostsByUserID")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户ID")
    public List<Posts>list (Integer userID) throws CustomException {
        if(userID==null){
            throw new CustomException("类型为空！");
        }
        List <Posts> list= postsService.queryPostsByUserID(userID);
        return list;
    }

    //管理员查询待审核的帖子
    @ApiOperation(value = "管理员查询待审核的帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryPendingPosts")
    @ResponseBody
    public List<Posts>list1 (){
        List <Posts> list= postsService.pendingPosts();
        return list;
    }

    //模糊查询
    @ApiOperation(value = "根据帖子名字进行的模糊查询", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueQueryAll")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="thing",value = "模糊查询的片段"),
//            @ApiImplicitParam(name="column",value = "从第几条数据开始查询"),
//            @ApiImplicitParam(name="total",value = "查询数量"),
//    })
    public List<Posts>list2 (@RequestParam("thing") String thing,@RequestParam("column")int column, @RequestParam("total")int total) throws CustomException {
        if (StringUtils.isEmpty(thing)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("类型不能有空位");
        }
        if (StringUtils.isEmpty(thing)){
            throw new CustomException("模糊查询片段不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("模糊查询片段不能有空位");
        }
        List <Posts> list= postsService.vagueQuery(thing,column,total);
        return list;
    }

    //根据上面的模糊查询(根据帖子名字进行的模糊查询)实现查询到多少条数据
    @ApiOperation(value = "根据上面的模糊查询(根据帖子名字进行的模糊查询)实现查询到多少条数据", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueQueryCountAll")
    @ResponseBody
//    @ApiImplicitParam(name="thing",value = "模糊查询的片段")
    public int queryVagueAllCount (String thing) throws CustomException {
        if (StringUtils.isEmpty(thing)){
            throw new CustomException("模糊查询片段不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("模糊查询片段不能有空位");
        }
       return postsService.queryVagueCountAll(thing);
    }


    //根据帖子标签查询所有相同标签的帖子
    @ApiOperation(value = "根据帖子标签查询所有相同标签且审核通过的帖子（模糊查询）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/querySameLabel")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="label",value = "标签"),
//            @ApiImplicitParam(name="thing",value = "查询模糊片段"),
//            @ApiImplicitParam(name="column",value = "开始查询索引"),
//            @ApiImplicitParam(name="total",value = "查询数量"),
//    })
    public List<Posts>list3 (String thing,String label,Integer column, Integer total) throws CustomException {
        if(column==null||total==null){
            throw new CustomException("类型为空！");
        }
        if (StringUtils.isEmpty(thing) || StringUtils.isEmpty(label)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(thing," ") || StringUtils.startsWith(label," ")){
            throw new CustomException("类型不能有空位");
        }
        List <Posts> list= postsService.querySameLabel(thing,label,column,total);
        return list;
    }

    /*************************/
    @ApiOperation(value = "根据帖子标签查询所有相同标签且审核通过的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/querySameLabelBy")
    @ResponseBody
    public List<Posts>list4 (String label,Integer column, Integer total) throws CustomException {
        if(column==null||total==null){
            throw new CustomException("类型为空！");
        }
        if (StringUtils.isEmpty(label)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(label," ")){
            throw new CustomException("类型不能有空位");
        }
        List <Posts> list= postsService.querySameLabelBy(label,column,total);
        return list;
    }

    //返回数量（根据帖子标签查询所有相同标签的帖子）
    @ApiOperation(value = "返回数量（根据帖子标签查询所有相同标签的帖子）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/querySameLabelCount")
    @ResponseBody
//    @ApiImplicitParam(name="label",value = "标签")
    public int queryCount (@RequestParam("label")String label) throws CustomException {
        if (StringUtils.isEmpty(label)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(label," ")){
            throw new CustomException("类型不能有空位");
        }
        return postsService.querySameLabelCount(label);
    }

    //返回数量（根据帖子标签查询所有相同标签的帖子）(模糊查询)
    @ApiOperation(value = "返回数量（根据帖子标签查询所有相同标签的帖子）(模糊查询)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryVagueSameLabelCount")
    @ResponseBody
    public int queryVagueCount (@RequestParam("label")String label,@RequestParam("thing")String thing) throws CustomException {
        if (StringUtils.isEmpty(label)||StringUtils.isEmpty(thing)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(label," ")||StringUtils.startsWith(thing," ")){
            throw new CustomException("类型不能有空位");
        }
        return postsService.queryVagueSameLabelCount(label,thing);
    }


    //查询所有审核过的帖子，也就是status为1的帖子
    @ApiOperation(value = "管理员查询审核通过的帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryPassPosts")
    @ResponseBody
    public List<Posts>list2 (){
        List <Posts> list= postsService.passPosts();
        return list;
    }

    //用户修改帖子信息
    @ApiOperation(value = "用户修改帖子信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/userUpdatePosts")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="postsID",value = "帖子id"),
            @ApiImplicitParam(name="postsName",value = "帖子标题"),
            @ApiImplicitParam(name="label",value = "标签"),
            @ApiImplicitParam(name="content",value = "帖子内容(有格式)"),
            @ApiImplicitParam(name="contentA",value = "帖子内容(纯文本)"),
            @ApiImplicitParam(name="picture",value = "发布帖子时间")
    })
    public Response userUpdatePosts (Integer postsID,String postsName,String label,String content,String contentA,String picture) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        if (StringUtils.isEmpty(postsName) || StringUtils.isEmpty(label)|| StringUtils.isEmpty(content)|| StringUtils.isEmpty(contentA)|| StringUtils.isEmpty(picture)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(postsName," ") || StringUtils.startsWith(label," ")|| StringUtils.startsWith(content," ")|| StringUtils.startsWith(contentA," ")|| StringUtils.startsWith(picture," ")){
            throw new CustomException("类型不能有空位");
        }
        Posts posts=new Posts(postsID,postsName,label,content,contentA,picture);
        postsService.updatePosts(posts);
        return Response.ok("修改成功！");
    }


    @ApiOperation(value = "模糊查询用户个人作品", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueQueryPerson")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="userID",value = "用户ID"),
            @ApiImplicitParam(name="thing",value = "模糊查询的片段")
    })
    public List<Posts>list4 (Integer userID,String thing) throws CustomException {
        if(userID==null){
            throw new CustomException("类型为空！");
        }
        if (StringUtils.isEmpty(thing)){
            throw new CustomException("模糊查询的片段不能为空");
        }
        if (StringUtils.startsWith(thing," ")){
            throw new CustomException("模糊查询的片段不能有空位");
        }
        List <Posts> list= postsService.vagueQueryPerson(userID,thing);
        return list;
    }

    /***************************/
    @ApiOperation(value = "发布帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addPosts")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="postsName",value = "帖子名称/标题"),
            @ApiImplicitParam(name="label",value = "标签"),
            @ApiImplicitParam(name="userID",value = "发布帖子的用户的id"),
            @ApiImplicitParam(name="content",value = "帖子内容(有格式)"),
            @ApiImplicitParam(name="contentA",value = "帖子内容(纯文本)"),
            @ApiImplicitParam(name="picture",value = "发布帖子时间")
    })
    public Response addUser(String postsName,String label,Integer reside,String content,String contentA,String picture,int status) throws CustomException {
        if(reside==null){
            throw new CustomException("类型为空！");
        }
        if (StringUtils.isEmpty(postsName) || StringUtils.isEmpty(label)|| StringUtils.isEmpty(content)|| StringUtils.isEmpty(contentA)|| StringUtils.isEmpty(picture)){
            throw new CustomException("类型不能为空");
        }
        if (StringUtils.startsWith(postsName," ") || StringUtils.startsWith(label," ")|| StringUtils.startsWith(content," ")|| StringUtils.startsWith(contentA," ")|| StringUtils.startsWith(picture," ")){
            throw new CustomException("类型不能有空位");
        }
        Posts posts=new Posts(postsName,label,reside,content,contentA,picture,status);
        postsService.addPosts(posts);
        return Response.ok("success");
    }


    //根据帖子id查询相对应的帖子
    @ApiOperation(value = "根据帖子id查询相对应的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPostsByID")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Posts queryPostsByID (Integer postsID) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        Posts posts= postsService.queryPostsById(postsID);
        return posts;
    }

    //用户收藏帖子（即将用户id存collectionID中）
//    @ApiOperation(value = "用户收藏帖子（即将用户id存collectionID中）（不可用）", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/collectionPosts")
//    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="userID",value = "想要收藏的用户的id"),
//            @ApiImplicitParam(name="postsID",value = "被收藏的帖子的id"),
//    })
//    public Response collectionPosts(int userID,int postsID){
//        postsService.collectionPosts(userID,postsID);
//        return Response.ok("收藏成功！");
//    }

//    @ApiOperation(value = "展示某一个用户的所有收藏（不可用）", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/showCollectionByUser")
//    @ResponseBody
//    @ApiImplicitParam(name="userID",value = "用户id")
//    public List<Posts>list5 (int userID){
//        List <Posts> list= postsService.showAllCollection(userID);
//        return list;
//    }

    @ApiOperation(value = "通过分页查询帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPagingPosts")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "开始查询索引"),
            @ApiImplicitParam(name="total",value = "查询数量"),
    })
    public List<Posts>list4(Integer column,Integer total) throws CustomException {
        if(column==null||total==null){
            throw new CustomException("类型为空！");
        }
        List <Posts> list=postsService.queryPagingPosts(column,total);
        return list;
    }

    @ApiOperation(value = "帖子浏览量", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/setBrowse")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response setBrowse(Integer postsID) throws CustomException {
        if(postsID==null){
            throw new CustomException("类型为空！");
        }
        int post=postsService.setBrowse(postsID);
        if(post==1){
            return Response.ok("浏览成功！");
        }else{
            return Response.ok("浏览失败！");
        }
    }

    @ApiOperation(value = "点赞数降序查询返回点赞数前三十", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAlikeDesc")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "从第几条数据开始查询"),
            @ApiImplicitParam(name="total",value = "查询数量"),
    })
    public List<Posts>list6(Integer column,Integer total) throws CustomException {
        if(column==null||total==null){
            throw new CustomException("类型为空！");
        }
        List <Posts> list=postsService.queryAlikeDesc(column,total);
        return list;
    }

    @ApiOperation(value = "根据用户id获取用户的所有点赞数", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllSumAlike")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "该用户的所有点赞数(如果该用户不存在则返回0)")
    public int queryAllSumFocus(Integer userID) throws CustomException {
        if(userID==null){
            throw new CustomException("类型为空！");
        }
        return postsService.querySumAlike(userID);
    }


//    @ApiOperation(value = "通过分页查询帖子", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/queryPostsPaging")
//    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="column",value = "从第几条数据开始查询"),
//            @ApiImplicitParam(name="total",value = "查询数量"),
//    })
//    public List<Posts>list5(int column,int total){
//        List<Posts> list=postsService.queryPagingPosts(column,total);
//        return list;
//    }

    @ApiOperation(value = "返回posts表里面的帖子个数", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryPostsCounts")
    @ResponseBody
    public int queryPostsCount(){
        return postsService.queryPostsCount();
    }
    @ApiOperation(value = "通过分页查询返回页数等信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/getList")
    @ResponseBody
    public Response getList(@RequestParam(defaultValue = "1")int start, @RequestParam(defaultValue = "10") int count) {
        PageUtils pageUtils = new PageUtils(start, count);
        pageUtils.setCount(count);
        pageUtils.setStart(start);
        List<Posts> usersList = postsService.getlist(pageUtils.getStart(), pageUtils.getCount());
        int total = postsService.getTotal();
        pageUtils.setTotal(total);
        Map<String, Object> map = new HashMap();
        map.put("pageUtils", pageUtils);
        map.put("userlist",usersList);
        return Response.ok(map);
    }
    //用户对草稿箱帖子进行发布
    @ApiOperation(value = "用户对草稿箱帖子进行发布", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/upDrafts")
    @ResponseBody
    @ApiImplicitParam(name="reside",value = "用户ID")
    public Response upDrafts(Integer reside) throws CustomException {
        if(reside==null){
            throw new CustomException("类型为空！");
        }
        userService.upDrafts(reside);
        return Response.ok("发布成功！");
    }
}
