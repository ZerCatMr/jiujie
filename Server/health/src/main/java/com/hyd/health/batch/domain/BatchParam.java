package com.hyd.health.batch.domain;

/**
 * <p>这是一个工具配置类，里面定义了每张表新增数据时id时的前缀，数据类型和填充长
 * 度，需要修改或者添加在这里统一配置即可</p>
 *
 * @author liuwenwen
 * @date 2020/10/15
 */
public class BatchParam {

    /**
     * 体检项目分类
     * */
    public static final String EXAM_CATE_PREFIX = "EXCATE";
    public static final String EXAM_CATE_DATATYPE = "5";
    public static final int EXAM_CATE_FLOWLEN = 4;

    /**
     * 体检项目
     * */
    public static final String EXAM_PROJ_PREFIX = "EXITEM";
    public static final String EXAM_PROJ_DATATYPE = "5";
    public static final int EXAM_PROJ_FLOWLEN = 5;

    /**
     * 体检疾病分类
     */
    public static final String DISEASE_CATE_PREFIX = "DISCA";
    public static final String DISEASE_CATE_DATATYPE = "5";
    public static final int DISEASE_CATE_FLOWLEN = 8;

    /**
     * 体检疾病
     */
    public static final String DISEASE_PREFIX = "DIS";
    public static final String DISEASE_DATATYPE = "5";
    public static final int DISEASE_FLOWLEN = 9;

    /**
     * 参检机构
     * */
    public static final String EXAM_ORGAN_PREFIX = "EXORG";
    public static final String EXAM_ORGAN_DATATYPE = "5";
    public static final int EXAM_ORGAN_FLOWLEN = 9;

    /**
     * 管理人员
     * */
    public static final String MANAGE_USER_PREFIX = "LUSER";
    public static final String MANAGE_USER_DATATYPE = "5";
    public static final int MANAGE_USER_FLOWLEN = 7;

}
