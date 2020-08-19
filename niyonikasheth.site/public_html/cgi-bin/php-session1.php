<!DOCTYPE html>
    <head>
        <title>PHP Session 1</title>
    </head> 
    <body>
        <h1> PHP Session 1 </h1>
        <?php
        session_start();
        $input = $_REQUEST['username'];
        // check session
        $username = $_SESSION['username'];
        // if not stored
        if ($username == NULL){
            // check userinput
            if($input != NULL){
                $username = $input;
                $_SESSION['username'] = $input;
            }
            // both userinput and session empty
            else{
                $username = "You do not have a name set!";
            }
        }
        echo "<strong>Name:</strong> $username";
        ?>
        <br>
        <p><a href="../php-start-demo.html">CGI Form</a></p>
        <p><a href="php-session2.php">Session Page 2</a></p>
        <form action='php-destroy-session.php' method='GET'>
            <input type='submit' value="Destroy Session"/>
        </form>
    </body>
</html>