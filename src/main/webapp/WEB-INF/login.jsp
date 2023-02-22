
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>

<!DOCTYPE html>
<html>
	<head>
		
		<title>Login Page</title>
		<link rel="stylesheet" href="/css/style.css">
	</head>
<body>
	
	<div class="page">
		<div class="container">
			<form:form action="/register" method="post" modelAttribute="newUser" class="register-login">
			<h3>Register</h3>
			    <p>
			        <form:label path="userName">Username: </form:label>
			        <form:input path="userName"/><br>
			        <form:errors class="error" path="userName"/>
			    </p>
			    <p>
			        <form:label path="email">Email: </form:label>
			        <form:input path="email"/><br>
			        <form:errors class="error" path="email"/>
			    </p>
			    <p>
			        <form:label path="password">Password: </form:label>
			        <form:input path="password" type="password"/><br>
			        <form:errors class="error" path="password"/>
			    </p>
			    <p>
			        <form:label path="confirm">Confirm Password: </form:label>
			        <form:input path="confirm" type="password"/><br>
			        <form:errors class="error" path="confirm"/>
			    </p>    
			    <input type="submit" value="Submit"/>
			</form:form> 
			
			 
			
			<form:form action="/login" method="post" modelAttribute="newLogin" class="register-login">
			<h3>Login</h3>
			    <p>
			        <form:label path="email">Email: </form:label>
			        <form:input path="email"/><br>
			        <form:errors class="error" path="email"/>
			    </p>
			    <p>
			        <form:label path="password">Password: </form:label>
			        <form:input path="password" type="password"/><br>
			        <form:errors class="error" path="password"/>
			    </p>
		  
		    	<input type="submit" value="Submit"/>
			</form:form>     
		</div>	
	</div>
</body>
</html>