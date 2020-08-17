<!DOCTYPE html>
    <head>
        <title>PHP POST Echo</title>
    </head> 
    <body>
        <h1> POST Request Echo </h1>
        <?php
        $body = $_POST;
        foreach ($body as $key=>$value){
            echo "<li><strong>$key:</strong> $value</li>";
        }
        ?>
    </body>
</html>