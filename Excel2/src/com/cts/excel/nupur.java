package com.cts.excel;


import com.codoid.products.exception.FilloException;
import com.codoid.products.fillo.Fillo;
import com.codoid.products.fillo.Recordset;
 

public class nupur {

	
	 
	//public static Connection connection;
	 
	public void pawan() throws FilloException{
	 
	Fillo fillo=new Fillo();
	com.codoid.products.fillo.Connection connection=fillo.getConnection("C:\\Users\\514293\\Desktop\\keyworddoc.xlsx");
	String strQuery="Select Action,Date from Sheet1 ";
	Recordset recordset=connection.executeQuery(strQuery);
	 
	while(recordset.next()){
	System.out.println(recordset.getField("Action"));
	}
	 
	recordset.close();
	connection.close();
	 
	}
	
	 
}
