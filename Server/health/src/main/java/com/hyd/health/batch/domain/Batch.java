package com.hyd.health.batch.domain;

import lombok.Data;

/**
 * <p>批处理实体</p>
 *
 * @author liuwenwen
 * @date 2020/10/14
 */

@Data
public class Batch {

    /**
     * 生成的批处理id
     * */
    private String batchId;

    /**
     * 前缀
     */
    private String prefix;

    /**
     * 数据类型
     */
    private String datetype;

    /**
     * 填充长度
     */
    private int flowlen;
}
