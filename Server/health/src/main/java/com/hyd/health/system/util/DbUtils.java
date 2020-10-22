package com.hyd.health.system.util;



import com.hyd.health.system.excpetion.BusinessErrorException;
import com.hyd.health.system.excpetion.BusinessMsgEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.*;

@Component
public class DbUtils {

	@Value("${spring.datasource.driver-class-name}")
	private String jdbcName;

	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String dbUser;

	@Value("${spring.datasource.password}")
	private String dbPassword;



	/**
	 * 获取连接
	 * @return
	 * @throws Exception
	 */
	public Connection getCon(){
		Connection conn = null;

		try {
			Class.forName(jdbcName);
			conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
		}catch (Exception e){
			throw new BusinessErrorException(BusinessMsgEnum.SQL_TIME_OUT);
		}
		return conn;
	}

	/**
	 * 关闭连接
	 * @param stmt
	 * @param conn
	 * @throws Exception
	 */
	public  void close(Statement stmt,Connection conn){
		try {
			if(stmt!=null){
				stmt.close();
				if(conn!=null){
					conn.close();
				}
			}
		}catch (Exception e){
			throw new BusinessErrorException(BusinessMsgEnum.SQL_TIME_OUT);
		}
	}

	/**
	 * 关闭连接
	 * @param cstmt
	 * @param conn
	 * @throws Exception
	 */
	public  void close(CallableStatement cstmt, Connection conn){
		try {
			if(cstmt!=null){
				cstmt.close();

				if(conn!=null){
					conn.close();
				}
			}
		}catch (Exception e){
			throw new BusinessErrorException(BusinessMsgEnum.SQL_TIME_OUT);
		}

	}


	/**
	 * 关闭连接
	 * @param pstmt
	 * @param conn
	 * @throws SQLException
	 */
	public  void close(PreparedStatement pstmt, Connection conn){
		try {
			if(pstmt!=null){
				pstmt.close();
				if(conn!=null){
					conn.close();
				}
			}
		}catch (Exception e){
			throw new BusinessErrorException(BusinessMsgEnum.SQL_TIME_OUT);
		}

	}


	/**
	 * 重载关闭方法
	 * @param pstmt
	 * @param conn
	 * @throws Exception
	 */
	public void close(ResultSet rs,PreparedStatement pstmt, Connection conn) {
		try {
			if(rs!=null){
				rs.close();
				if(pstmt!=null){
					pstmt.close();
					if(conn!=null){
						conn.close();
					}
				}
			}
		}catch (Exception e){
			throw new BusinessErrorException(BusinessMsgEnum.SQL_TIME_OUT);
		}

	}
}
