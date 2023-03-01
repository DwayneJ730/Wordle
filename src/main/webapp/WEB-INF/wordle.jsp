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
                <p class="title">Wordle</p>
            </li>
            <li>
                <ul class="sub-nav-list">
                    <li>
                    	<c:if test="${not empty userId}">
							<a href="/scores">
                        		<img class="podium" src="/images/podium.png" alt="">
                       		</a>
						</c:if>
                        
                    </li>
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
    
        <div class="wordle-container" id="wordle">
            <div class="row" id="row1">
                <div class="square" contenteditable="true" id="1">

                </div>
                <div class="square" contenteditable="true" id="2">

                </div>
                <div class="square" contenteditable="true" id="3">

                </div>
                <div class="square" contenteditable="true" id="4">

                </div>
                <div class="square" contenteditable="true" id="5">

                </div>
            </div>

            <div class="row" id="row2">
                <div class="square" contenteditable="true" id="6">

                </div>
                <div class="square" contenteditable="true" id="7">

                </div>
                <div class="square" contenteditable="true" id="8">

                </div>
                <div class="square" contenteditable="true" id="9">

                </div>
                <div class="square" contenteditable="true" id="10">

                </div>
            </div>

            <div class="row" id="row3">
                <div class="square" contenteditable="true" id="11">

                </div>
                <div class="square" contenteditable="true" id="12">

                </div>
                <div class="square" contenteditable="true" id="13">

                </div>
                <div class="square" contenteditable="true" id="14">

                </div>
                <div class="square" contenteditable="true" id="15">

                </div>
            </div>

            <div class="row" id="row4">
                <div class="square" contenteditable="true" id="16">

                </div>
                <div class="square" contenteditable="true" id="17">

                </div>
                <div class="square" contenteditable="true" id="18">

                </div>
                <div class="square" contenteditable="true" id="19">

                </div>
                <div class="square" contenteditable="true" id="20">

                </div>
            </div>

            <div class="row" id="row5">
                <div class="square" contenteditable="true" id="21">

                </div>
                <div class="square" contenteditable="true" id="22">

                </div>
                <div class="square" contenteditable="true" id="23">

                </div>
                <div class="square" contenteditable="true" id="24">

                </div>
                <div class="square" contenteditable="true" id="25">

                </div>
            </div>

            <div class="row" id="row6">
                <div class="square" contenteditable="true" id="26">

                </div>
                <div class="square" contenteditable="true" id="27">

                </div>
                <div class="square" contenteditable="true" id="28">

                </div>
                <div class="square" contenteditable="true" id="29">

                </div>
                <div class="square" contenteditable="true" id="30">

                </div>
            </div>
			
			


        </div>
        <div class="results" id="results">
        	<h2>
        	
        	</h2>
        	<h1>
        		
        	</h1>
        	<p>
        		
        	</p>
        	
        	<p>
        		
        	</p>
        	
        	<a href="/">Play Again</a>
	        <c:if test="${userId != null}">
		        <form:form action="/scores/new" method="post" modelAttribute="newScore" >
					<form:hidden path="user" value="${userId }"/>
					<form:hidden path="game" value="Wordle"/>
					<form:hidden path="winOrLoss" id="winOrLoss" value=""/>
					<form:hidden path="TimeToComplete" id="time" value=""/>
					<form:hidden path="numOfTries" id="attempts" value=""/>
				  
				    
				    <input type="submit" value="Submit"/>
				</form:form>
			</c:if>
			
		</div>
        
        
        <div class="wrapper">
			
			<p><span id="seconds">00</span>:<span id="tens">00</span></p>
			
		</div> 

    </div>

</body>
<script type="text/javascript" src="/js/app.js"></script>

</html>