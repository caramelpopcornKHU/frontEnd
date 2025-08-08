<%@page import="java.util.List"%>
<%@page import="addrbook.AddrBookVO"%>
<%@page import="addrbook.AddrBookDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<jsp:useBean id="ab" class="addrbook.AddrBookVO"></jsp:useBean>
<jsp:setProperty property="*" name="ab" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
	// client의 요구(action 참조)에 따라 처리한다.
	// insert, update, delete, list
	String action = request.getParameter("action"); // ?action=머시기
	System.out.println("action=" + action);
	String forwordPage = "addrbook_list.jsp";
	AddrBookDAO dao = new AddrBookDAO();
	if ("insert".equals(action)) {
		// insert - AddrBookDAO.insertDB()
		dao.insertDB(ab);
		response.sendRedirect("addrbook_control.jsp?action=list");
		// 목록이 출력될 수 있도록 한다.
		// forwardPage를 설정한다.
	} else if ("edit".equals(action)) { // ?action=edit 이면 저기로 날아가셈
		// 1. 클라이언트가 전송한 데이터 중에서 방명록id를 추출한다.
		String abIdStr = request.getParameter("ab_id");
	
		// 2. DB에서 해당 방명록 정보를 조회한다.
		AddrBookVO vo = dao.getDB(Integer.parseInt(abIdStr));
		
		// 3. 방명록 정보를 request에 넣는다.
		forwordPage = "addrbook_edit_form.jsp";
		request.setAttribute("ab", vo);
		pageContext.forward(forwordPage);
	} else if ("list".equals(action)) { // ?action=list 이면 저기로 날아가셈
		// scope request data라는 이름으로 리스트를 넣어두어야 한다.
		List<AddrBookVO> list = dao.getDBList();
		request.setAttribute("data", list);
		pageContext.forward(forwordPage);
	} else if("update".equals(action)){
		
		String abIdStr = request.getParameter("ab_id");
		int abId = Integer.parseInt(abIdStr);
		AddrBookVO vo = new AddrBookVO(
				abId,
				request.getParameter("ab_name"),
				request.getParameter("ab_email"),
				request.getParameter("ab_comdept"),
				request.getParameter("ab_birth"),
				request.getParameter("ab_tel"),
				request.getParameter("ab_memo")
				);
		dao.updateDB(vo);
		response.sendRedirect("addrbook_control.jsp?action=list");
	} else if("delete".equals(action)) {
		String abIdStr = request.getParameter("ab_id");
		int abId = Integer.parseInt(abIdStr);
		dao.deleteDB(abId);
		response.sendRedirect("addrbook_control.jsp?action=list");
		
	} else{
		response.sendRedirect("addrbook_control.jsp?action=list");
	}
%>
<%-- <jsp:forward page="<%=forwordPage%>"></jsp:forward>--%>
</body>
</html>