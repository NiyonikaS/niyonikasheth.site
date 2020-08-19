<!DOCTYPE html>
    <head>
        <title>PHP Session Destroyed</title>
    </head> 
    <body>
        <h1> Session Destroyed </h1>
        <?php
        session_start();
        $_SESSION["username"] = "";
        // unset($_SESSION["username"]);
        ?>
        <p><a href="../php-start-demo.html">Back to CGI Form</a></p>
        <p><a href="php-session1.php">Back to Session Page 1</a></p>
        <p><a href="php-session2.php">Back to Session Page 2</a></p>
    </body>
</html>