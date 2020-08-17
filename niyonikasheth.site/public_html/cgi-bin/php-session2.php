<!DOCTYPE html>
    <head>
        <title>PHP Session 2</title>
    </head> 
    <body>
        <h1> PHP Session 2 </h1>
        <?php
        session_start();
        $value = $_SESSION['username'];
        if($_SESSION["username"] == NULL){
            $value = "You do not have a name set!";
        }
        echo "<strong>Name:</strong> $value";
        ?>
        <br>
        <p><a href="../php-start-demo.html">CGI Form</a></p>
        <p><a href="php-session1.php">Session Page 1</a></p>
        <form action='php-destroy-session.php' method='GET'>
            <input type='submit' value="Destroy Session"/>
        </form>
    </body>
</html>