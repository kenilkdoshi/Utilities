package com.cts.excel;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import javax.servlet.http.*;

//import com.codoid.products.fillo.Recordset;

import javax.servlet.*;
import java.sql.*;

public class Fillo2 {
		
		
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        response.setContentType("text/html");
	        PrintWriter out = response.getWriter();
	        String key = request.getParameter("keyword");
	        
	
		
        try {
            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            Connection conn = DriverManager.getConnection(
                    "jdbc:odbc:Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};" + 
                    "Dbq=C:\\Users\\514293\\Desktop\\keyworddoc.xlsx;");

            PreparedStatement s = conn.prepareStatement("Select Name_of_doc, from Sheet1 where Keywords=? and Action='Download'");
            
            s.setString(1, key);    //// IN place of ? this function will take the value entered by the user on  the html page 
            
           // Recordset recordset=conn.executeQuery(s);
           
           
            ResultSet rs = s.executeQuery();
            System.out.println("hello");
            
            if (rs!=null) {
                while (rs.next()) {
                    System.out.println(rs.getInt("Success!"));
                }
            }
            s.close();

            conn.close();
        } catch( Exception e ) {
            e.printStackTrace();
        }

    }

}

	 


