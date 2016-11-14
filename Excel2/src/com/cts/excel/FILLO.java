package com.cts.excel;
import java.util.List;
import java.sql.PreparedStatement;
import java.util.Iterator;

import com.codoid.products.exception.FilloException;
import com.codoid.products.fillo.Fillo;
import com.codoid.products.fillo.Recordset;

public class FILLO {
	
	 
	
	 
	
	 
	public void pawan() throws FilloException{
	 
	Fillo fillo=new Fillo();
	com.codoid.products.fillo.Connection connection=fillo.getConnection("C:\\Users\\514293\\Desktop\\keyworddoc.xlsx");
	//String strQuery="Select count(Action),Name_of_doc from Sheet1 where Keywords='FDI' and Action='Download' ";
	
	String strQuery="Select count(Action)from Sheet1 where Action in (Select Name_of_doc,Action from Sheet1 where Keywords='FDI') and Action='Download'";
	//String strQuery2="Select Distinct(IP_address),count()Keywords,Name_of_doc from Sheet1 where Action='Search'";
	//String strQuery2="Select Keywords,Action,Name_of_doc from Sheet1 where IP_address='10.155.42.15'";
	Recordset recordset=connection.executeQuery(strQuery);
	
	
	//PreparedStatement ps=connection.executeQuery(strQuery);
	

	//ArrayList<Recordset> list1=new ArrayList<Recordset>();
	//@SuppressWarnings("rawtypes")
	//List l = null;

	
/*	while(recordset.next()){
		n.setAction(recordset.getField("Action"));
	l.add(n);
	}
	New n2=new New();

	for(int i=0;i<l.size();i++)
	{n2=(New) l.get(i);
		System.out.println(n2.getAction());
	}
	
	
	 list1.add(recordset);
	 System.out.println("hello there");
	 Iterator itr=list1.iterator();  
	 System.out.println(list1.get(0));
	 
	 while(itr.hasNext()){  
		    Recordset rs=(Recordset)itr.next();  
		    System.out.println(rs.getField("Keywords"));  
		  }  */
	
	//System.out.println(recordset.getField("Keywords"));
	//System.out.println(recordset.getCount());
	while(recordset.next())
	{
	//System.out.println(recordset.getField("Keywords"));
	//System.out.println(recordset.getCount());
	//System.out.println(recordset.getField("Action"));
	System.out.println(recordset.getField("Name_of_doc"));
	//System.out.println(recordset.getCount());
	
	
	}
	recordset.close();
	connection.close();
	
	}
	}


