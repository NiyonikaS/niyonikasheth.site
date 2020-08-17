<!DOCTYPE html>
    <head>
        <title>PHP Session 1</title>
    </head> 
    <body>
        <h1> PHP Session 1 </h1>
        <?php
        session_start();
        $value = $_REQUEST['username'];
        // store username in session
        $_SESSION['username'] = $value;
        // get username from session 
        $value = $_SESSION["username"];
        // if no username or session destroyed
        if($_SESSION["username"] == NULL){
            $value = "You do not have a name set!";
        }
        echo "<strong>Name:</strong> $value";
        ?>
        <br>
        <p><a href="../php-start-demo.html">CGI Form</a></p>
        <p><a href="php-session2.php">Session Page 2</a></p>
        <form action='php-destroy-session.php' method='GET'>
            <input type='submit' value="Destroy Session"/>
        </form>
    </body>
</html>