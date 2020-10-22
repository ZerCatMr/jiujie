package com.hyd.health.system.handle;

import com.hyd.health.system.domain.JsonResult;
import com.hyd.health.system.excpetion.*;
import com.hyd.health.system.factory.ResultFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * Created by xieshuai on 2019/8/16 11:24
 * 全局异常处理器(所以来自controller层的异常都会被拦截，再通过异常种类进行分发)
 */
@ControllerAdvice
public class ExceptionHandle {
    private static final Logger logger = LogManager.getLogger(ExceptionHandle.class);

    private static final org.slf4j.Logger exceptionlog = LoggerFactory.getLogger("exception");
    private static final org.slf4j.Logger bussinesslog = LoggerFactory.getLogger("bussiness");

//    @ResponseBody
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public JsonResult exceptionHandler(MethodArgumentNotValidException e) {
//        JsonResult resultVO = new JsonResult();
//        resultVO.setCode(-1);
//        resultVO.setMessage(e.getBindingResult().getFieldError().getDefaultMessage());
//        return resultVO;
//    }


    /**
     * //     * 系统异常 预期以外异常
     * //     *
     * //     * @param ex
     * //     * @return
     * //
     */
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public JsonResult handleUnexpectedServer(Exception ex) {
//        logger.error("系统异常：", ex);
//        return new JsonResult("500", "系统发生异常，请联系管理员");
//    }
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public JsonResult handle(Exception e) {
        if (e instanceof MethodArgumentNotValidException) {
            MethodArgumentNotValidException methodArgumentNotValidException = (MethodArgumentNotValidException) e;
            JsonResult jsonResult = new JsonResult();
            jsonResult.setCode("-1");
            List<FieldError> fieldErrors = methodArgumentNotValidException.getBindingResult().getFieldErrors();
            StringBuffer buffer = new StringBuffer();
            fieldErrors.forEach(item -> {
                buffer.append(item.getDefaultMessage()).append(",");
            });
            jsonResult.setMsg(buffer.toString().substring(0, buffer.length() - 1));
            return jsonResult;
        }
        if (e instanceof BusineException) {
            BusineException busineException = (BusineException) e;
            bussinesslog.warn(busineException.getMsg() + (busineException.getData() == null ? "" : busineException.getData().toString()));
            return ResultFactory.error(busineException.getMsg());
        }
        if (e instanceof ErrorException) {
            ErrorException errorException = (ErrorException) e;
            exceptionlog.error(errorException.getMsg() + (errorException.getData() == null ? "" : errorException.getData().toString()));
            return ResultFactory.error(errorException.getMsg());
        }
        if (e instanceof SqlException) {
            SqlException sqlException = (SqlException) e;
            logger.error(StactException.getStackTrace(e));
            logger.error(sqlException.getMsg());

            exceptionlog.error(sqlException.getMsg() + (sqlException.getData() == null ? "" : sqlException.getData().toString()));
            return ResultFactory.error(sqlException.getMsg());
        }
        if (e instanceof ParameException) {
            ParameException parameException = (ParameException) e;
            return ResultFactory.error(parameException.getMsg());
        }
        if (e instanceof ResultException) {
            ResultException resultException = (ResultException) e;
            return ResultFactory.error(resultException.getMsg());
        }
        if (e instanceof AccessException) {
            AccessException exception = (AccessException) e;
            logger.error(StactException.getStackTrace(e));
            logger.error(exception.getMsg());
            return ResultFactory.error(exception.getMsg());
        }
        if (e instanceof SystemException) {
            SystemException systemException = (SystemException) e;
            logger.error(StactException.getStackTrace(e));
            logger.error(e.getMessage());
            return ResultFactory.error(systemException.getMsg());
        }
        if (e instanceof ClassCastException) {
            logger.error(StactException.getStackTrace(e));
            logger.error(e.getMessage());
            return ResultFactory.error(e.getMessage());
        }
        if (e instanceof ResultExceptions) {
            ResultExceptions exception = (ResultExceptions) e;
            return ResultFactory.error(exception.getMsg(), exception.getCode());
        }
        if (e instanceof BusineExceptions) {
            BusineExceptions exception = (BusineExceptions) e;
            return ResultFactory.errors(exception.getCode(), exception.getMsg());
        }
        if (e instanceof BusinessErrorException) {
            BusinessErrorException ex = (BusinessErrorException) e;
            String code = ex.getCode();
            String message = ex.getMessage();
            return new JsonResult(code, message);
        }
        if (e instanceof NullPointerException) {
            MissingServletRequestParameterException ex = (MissingServletRequestParameterException) e;
            logger.error("缺少请求参数，{}", ex.getMessage());
            return new JsonResult("400", "缺少必要的请求参数");
        } else {
            logger.error(StactException.getStackTrace(e));
            logger.error(e.getMessage());
            return ResultFactory.error(e.getMessage());
        }
    }

}
