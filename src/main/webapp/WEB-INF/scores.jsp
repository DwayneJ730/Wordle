<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- c:out ; c:forEach etc. --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Formatting (dates) --> 
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- form:form -->
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!-- for rendering errors on PUT routes -->
<%@ page isErrorPage="true" %>

<!DOCTYPE html>
<html lang="en">

<head>
     <meta charset="UTF-8">
    <title>Wordle</title>
    <link rel="stylesheet" href="/css/style.css"> <!-- change to match your file/naming structure -->
    


</head>


<body>
    <div class="nav">
        <ul class="nav-list">
            <li>
                <a href="">More Games</a>
            </li>
            <li>
                <a href="/"><p class="title">Wordle</p></a>   
            </li>
            <li>
                <ul class="sub-nav-list">
                    
                    <li>
                    	<c:if test="${not empty userId}">
							<a href="/logout">Logout</a>
						</c:if>
						<c:if test="${empty userId}">
							<a href="/login">Login</a>
						</c:if>
                        
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    
    <div class="main-container">
    	<div class="score-list">
    		<h3>Your scores</h3>
    		<ul>
	    		<c:forEach var="oneScore" items="${scores}">
	    		
			    	<c:if test="${userId == oneScore.user.id}">
						<c:if test="${oneScore.winOrLoss == true}">
							<li>
								<ul class="score-info">
									<li><c:out value="${oneScore.id}"></c:out></li>
									<li>Time: <c:out value="${oneScore.timeToComplete}"></c:out></li> 
									<li>Attempts: <c:out value="${oneScore.numOfTries}"></c:out></li> 
									<li>Date: <c:out value="${oneScore.createdAt}"></c:out></li> 
								   	<li>Solved!</li> 						
								</ul>
							</li> 
						</c:if>
						
						<c:if test="${oneScore.winOrLoss == false}">
							<li> 
								<ul class="score-info">
									<li><c:out value="${oneScore.id}"></c:out></li>
									<li>Time: <c:out value="${oneScore.timeToComplete}"></c:out></li> 
									<li>Attempts: <c:out value="${oneScore.numOfTries}"></c:out></li> 
									<li>Date: <c:out value="${oneScore.createdAt}"></c:out></li> 
								   	<li>Failed</li> 						
								</ul>						
							</li>
						</c:if>
					</c:if>
					
					
		    	</c:forEach>
    		</ul>
    	</div>
    </div>

</body>
<script type="text/javascript" src="/js/app.js"></script>

</html>